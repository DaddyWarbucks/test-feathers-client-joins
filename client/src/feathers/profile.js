export default app => {
  class Profile {
    constructor (options, app) {
      this.options = options || {};
    }

    setup(app) {
      this.app = app;
      this.profiler = app.get('profiler');
    }

    async find (params) {
      return this.profiler.getProfile();
    }

    async create (data, params) {
      const { hookName, repeatAuth } = data;
      this.app.set('hookName', hookName);
      this.app.set('repeatAuth', repeatAuth);

      if (this.profiler.getProfile()) {
        this.profiler.clearProfile();
      }
      return {};
    }

  };

  app.use('client/profile', new Profile())

  app.service('client/profile').hooks({
    after: {
      all: [
        context => {
          delete context._log;
          delete context.result['client/profile'];
          delete context.result['server/profile'];
          return context;
        }
      ]
    }
  });

  return app;
}