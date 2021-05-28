const { withResult } = require("feathers-fletching");

module.exports.withResultsPrimary = withResult({
  tag: (category, context) => {
    return context.app.service("api/tags").get(category.tag_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
});

module.exports.withResultsLoad = withResult({
  tag: (category, context) => {
    return context.params.loader("api/tags").load({ _id: category.tag_id }, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
});

module.exports.withResultsCached = withResult({
  tag: (category, context) => {
    return context.params.loader("api/tags").get(category.tag_id, {
      method: context.params.method,
      joinLocation: context.params.joinLocation,
    });
  },
});
