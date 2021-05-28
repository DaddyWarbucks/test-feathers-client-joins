import { withResult } from 'feathers-fletching';

export default app => {
  const withResults = withResult({
    bio: (user, context) => {
      return context.app.service('api/bios').get(user.bio_id, {
        hookName: context.params.hookName
      });
    }
  });

  const withResultsBatchLoader = withResult({
    bio: (user, context, { bios }) => {
      return bios.load(user.bio_id, {
        hookName: context.params.hookName
      });
    },
  }, context => {
    return {
      bios: context.app.service('api/bios').loaderFactory()
    };
  });

  const switchHook = context => {
    switch (context.params.hookName) {
      case 'withResultsBatchLoader':
        return withResultsBatchLoader(context);
      case 'withResults':
        return withResults(context);

      default:
        return context;
    }
  }

  app.service('api/users').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook]
    }
  });
}