const { withResult } = require('feathers-fletching');
const { makeParams } = require('./index');

module.exports.withResultsPrimary = withResult({
  user: async (post, context) => {
    const user = await context.app
      .service('api/users')
      .get(post.user_id, makeParams(context));
    delete user.password;
    return user;
  },
  comments: (post, context) => {
    return context.app
      .service('api/comments')
      .find({ query: { post_id: post._id }, ...makeParams(context) });
  }
});

module.exports.withResultsLoad = withResult({
  user: async (post, context) => {
    const { maxBatchSize } = makeParams(context);
    const user = await context.params
      .loader('api/users', { maxBatchSize })
      .load({ _id: post.user_id }, null, makeParams(context));
    delete user.password;
    return user;
  },
  comments: (post, context) => {
    const { maxBatchSize } = makeParams(context);
    return context.params
      .loader('api/comments', { maxBatchSize })
      .loadMany({ post_id: post._id }, null, makeParams(context));
  }
});

module.exports.withResultsCached = withResult({
  user: async (post, context) => {
    const user = await context.params
      .loader('api/users')
      .get(post.user_id, null, makeParams(context));
    delete user.password;
    return user;
  },
  comments: (post, context) => {
    return context.params
      .loader('api/comments')
      .find({ query: { post_id: post._id } }, makeParams(context));
  }
});
