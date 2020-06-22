import DataLoader from 'dataloader';

// must use require
const { processHooks } = require('@feathersjs/commons').hooks

// This is an experimental idea of merging batch/data loaders and the
// feathers-batch concept. It offers the nice API of batchloader but
// also groups all the loaders up and sends them to the server to be executed.
// I could't think of a better name than GroupLoader....
export default class GroupLoader {
  constructor(context) {
    this.app = context.app;
    this.groupLoader = new DataLoader(async keys => {
      const groupResults  = await this.app.service('api/batch').create(keys);
      return keys.map(key => {
        return groupResults[key] || new Error(`No result for ${key}`)
      });
    });
    this.loaders = {};
  }

  service(serviceName, params = {}) {
    return {
      load: (id) => {
        const loaderName = JSON.stringify({ serviceName, params });
        const loader = this.loaders[loaderName]
          || new DataLoader(async keys => {
            const service = this.app.service(serviceName);
            const beforeHooks = service.__hooks.before.find;
            const afterHooks = service.__hooks.after.find;

            // TODO: Technically this should run through the app.hooks too
            // console.log(this.app.__hooks)

            const group = {
              service: serviceName,
              query: { ...params.query, _id: { $in: keys } }
            }

            if (beforeHooks) {
              const beforeHook = await processHooks.call(service, beforeHooks, {
                app: this.app,
                type: 'before',
                method: 'find',
                service,
                params
              });

              group.query = { ...group.query, ...beforeHook.query };
            }

            const groupKey = JSON.stringify(group);

            const groupResults = await this.groupLoader.load(groupKey);

            if (afterHooks) {
              const afterHook = await processHooks.call(service, afterHooks, {
                app: this.app,
                type: 'after',
                method: 'find',
                service,
                params,
                result: groupResults
              });

              return keys.map(key => {
                const result = afterHook.result.find(result => {
                  return result._id === key;
                });
                return result || new Error(`No result for ${key}`);
              });

            }

            return keys.map(key => {
              const result = groupResults.find(result => {
                return result._id === key;
              });
              return result || new Error(`No result for ${key}`);
            });

          });

        this.loaders[loaderName] = loader;

        return loader.load(id);
      }
    };
  }
}