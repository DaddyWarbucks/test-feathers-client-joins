const { withResult } = require('feathers-fletching');
const { makeParams } = require('./index');

module.exports.withResultsPrimary = withResult({
  bio: (user, context) => {
    return context.app
      .service('api/bios')
      .get(user.bio_id, makeParams(context));
  }
});

module.exports.withResultsLoad = withResult({
  bio: (user, context) => {
    const { maxBatchSize } = makeParams(context);
    return context.params
      .loader('api/bios', { maxBatchSize })
      .load({ _id: user.bio_id }, null, makeParams(context));
  }
});

module.exports.withResultsCached = withResult({
  bio: (user, context) => {
    return context.params
      .loader('api/bios')
      .get(user.bio_id, null, makeParams(context));
  }
});
