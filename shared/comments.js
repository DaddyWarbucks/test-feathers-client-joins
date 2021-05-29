const { withResult } = require('feathers-fletching');
const { makeParams } = require('./index');

module.exports.withResultsPrimary = withResult({
  user: async (comment, context) => {
    const user = await context.app
      .service('api/users')
      .get(comment.user_id, makeParams(context));
    delete user.password;
    return user;
  }
});

module.exports.withResultsLoad = withResult({
  user: async (comment, context) => {
    const { maxBatchSize } = makeParams(context);
    const user = await context.params
      .loader('api/users', { maxBatchSize })
      .load({ _id: comment.user_id }, null, makeParams(context));
    delete user.password;
    return user;
  }
});

module.exports.withResultsCached = withResult({
  user: async (comment, context) => {
    const user = await context.params
      .loader('api/users')
      .get(comment.user_id, null, makeParams(context));
    delete user.password;
    return user;
  }
});
