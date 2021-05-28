const { withResult } = require("feathers-fletching");

module.exports.withResultsPrimary = withResult({
  user: (post, context) => {
    return context.app.service("api/users").get(post.user_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
  category: (post, context) => {
    return context.app.service("api/categories").get(post.category_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
});

module.exports.withResultsLoad = withResult({
  user: (post, context) => {
    return context.params.loader("api/users").load(
      { _id: post.user_id },
      {
        method: context.params.method,
        joinLocation: context.params.joinLocation,
      }
    );
  },
  category: (post, context) => {
    return context.params.loader("api/categories").load(
      { _id: post.category_id },
      {
        method: context.params.method,
        joinLocation: context.params.joinLocation,
      }
    );
  },
});

module.exports.withResultsCached = withResult({
  user: (post, context) => {
    return context.params.loader("api/users").get(post.user_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
  category: (post, context) => {
    return context.params.loader("api/categories").get(post.category_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
});
