/* eslint-disable no-unused-vars */
exports.Profile = class Profile {
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
};
