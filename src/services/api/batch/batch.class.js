/* eslint-disable no-unused-vars */
// const data = [
//   { service: 'api/users', query: { id: { $in: [] } } },
//   { service: 'api/categories', query: { id: { $in: [] } } },
// ];

exports.Batch = class Batch {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async create (data, params = {}) {
    const batches = await Promise.all(data.map(async key => {
      const { service, query } = JSON.parse(key);

      const results = await this.app.service(service)
        .repeatAuth({ params, app: this.app })
        .find({
          query,
          paginate: false,
        });

      return { key, results  };
    }));

    return batches.reduce((batch, result) => {
      batch[result.key] = result.results;
      return batch;
    }, {});
  }
};
