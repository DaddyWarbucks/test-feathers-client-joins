const { withResult } = require('feathers-fletching');
const { makeParams } = require('./index');

module.exports.withResultsPrimary = withResult({
  user: (comment, context) => {
    return context.app
      .service('api/users')
      .get(comment.user_id, makeParams(context));
  }
});

module.exports.withResultsLoad = withResult({
  user: (comment, context) => {
    return context.params
      .loader('api/users')
      .load({ _id: comment.user_id }, makeParams(context));
  }
});

module.exports.withResultsCached = withResult({
  user: (comment, context) => {
    return context.params
      .loader('api/users')
      .get(comment.user_id, makeParams(context));
  }
});
