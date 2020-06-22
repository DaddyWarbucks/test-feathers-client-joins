const { authenticate } = require('@feathersjs/authentication').hooks;
const { withResult } = require('feathers-fletching');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const withResults = withResult({
  bio: async (user, context) => {
    return context.app.service('api/bios')
      .repeatAuth(context)
      .get(user.bio_id);
  }
});

const withResultsBatchLoader = withResult({
  bio: async (user, context, { bios }) => {
    return bios.load(user.bio_id);
  }
}, context => {
  return {
    bios: context.app.service('api/bios')
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
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      switchHook,
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
