const { authenticate } = require('@feathersjs/authentication').hooks;
const { withResult } = require('feathers-fletching');

const withResults = withResult({
  user: async (post, context) => {
    const user = await context.app.service('api/users')
      .repeatAuth(context)
      .get(post.user_id);
    delete user.password;
    return user;
  },
  category: (post, context) => {
    return context.app.service('api/categories')
      .repeatAuth(context)
      .get(post.category_id);
  }
});

const withResultsBatchLoader = withResult({
  user: async (post, context, { users }) => {
    const user = await users.load(post.user_id);
    delete user.password;
    return user;
  },
  category: (post, context, { categories }) => {
    return categories.load(post.category_id);
  }
}, context => {
  return {
    users: context.app.service('api/users')
      .repeatAuth(context)
      .loaderFactory(),
    categories: context.app.service('api/categories')
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
