// Initializes the `server/profile` service on path `/server/profile`
const { Profile } = require('./profile.class');
const hooks = require('./profile.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/server/profile', new Profile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('server/profile');

  service.hooks(hooks);
};
