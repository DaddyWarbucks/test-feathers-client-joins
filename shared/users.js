const { withResult } = require('feathers-fletching');

module.exports.withResultsPrimary = withResult({
  bio: (user, context) => {
    return context.app.service('api/bios').get(user.bio_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation
    });
  }
});

module.exports.withResultsLoad = withResult({
  bio: (user, context) => {
    return context.params.loader('api/bios').load(
      { _id: user.bio_id },
      {
        method: context.params.method,
        joinLocation: context.params.joinLocation
      }
    );
  }
});

module.exports.withResultsCached = withResult({
  bio: (user, context) => {
    return context.params.loader('api/bios').get(user.bio_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation
    });
  }
});
