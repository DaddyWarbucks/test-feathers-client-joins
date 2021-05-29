export default (app) => {
  class Profile {
    constructor(options, app) {
      this.options = options || {};
    }

    setup(app) {
      this.app = app;
      this.profiler = app.get('profiler');
    }

    async find(params) {
      return this.profiler.getProfile();
    }

    async create(data, params) {
      if (this.profiler.getProfile()) {
        this.profiler.clearProfile();
      }
      return {};
    }
  }

  app.use('client/profile', new Profile());

  app.service('client/profile').hooks({
    after: {
      all: [
        (context) => {
          const { useBatch } = app.getState();

          delete context._log;
          delete context.result['client/profile'];
          delete context.result['server/profile'];
          delete context.result['authentication'];

          if (useBatch) {
            delete context.result['api/users'];
            delete context.result['api/comments'];
            delete context.result['api/bios'];
          }

          return context;
        }
      ]
    }
  });

  return app;
};
