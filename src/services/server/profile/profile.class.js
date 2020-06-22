/* eslint-disable no-unused-vars */
exports.Profile = class Profile {
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
