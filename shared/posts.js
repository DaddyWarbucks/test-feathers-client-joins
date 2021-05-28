const { withResult } = require('feathers-fletching');
const { makeParams } = require('./index');

module.exports.withResultsPrimary = withResult({
  user: (post, context) => {
    return context.app
      .service('api/users')
      .get(post.user_id, makeParams(context));
  },
  comments: (post, context) => {
    return context.app
      .service('api/comments')
      .find({ query: { post_id: post._id } }, makeParams(context));
  }
});

module.exports.withResultsLoad = withResult({
  user: (post, context) => {
    return context.params
      .loader('api/users')
      .load({ _id: post.user_id }, makeParams(context));
  },
  category: (post, context) => {
    return context.params
      .loader('api/comments')
      .loadMany({ post_id: post._id }, makeParams(context));
  }
});

module.exports.withResultsCached = withResult({
  user: (post, context) => {
    return context.params
      .loader('api/users')
      .get(post.user_id, makeParams(context));
  },
  category: (post, context) => {
    return context.params
      .loader('api/comments')
      .find({ query: { post_id: post._id } }, makeParams(context));
  }
});
