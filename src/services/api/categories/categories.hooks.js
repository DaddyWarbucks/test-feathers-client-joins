const { authenticate } = require('@feathersjs/authentication').hooks;
const { withResult } = require('feathers-fletching');

const withResults = withResult({
  tag: async (category, context) => {
    return context.app.service('api/tags')
      .repeatAuth(context)
      .get(category.tag_id, );
  }
});

const withResultsBatchLoader = withResult({
  tag: async (category, context, { tags }) => {
    return tags.load(category.tag_id);
  }
}, context => {
  return {
    tags: context.app.service('api/tags')
      .repeatAuth(context)
      .loaderFactory()
  };
});

const switchHook = context => {
  switch(context.app.get('hookName')) {
  case 'withResultsServer':
    return withResults(context);
  case 'withResultsBatchLoaderServer':
    return withResultsBatchLoader(context);

  default:
    return context;
  }
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [switchHook],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
