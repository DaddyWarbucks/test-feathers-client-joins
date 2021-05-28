// Application hooks that run for every service

const pluckParams = context => {
  const {
    method,
    joinLocation,
    ...rest
  } = context.params.query || {};

  context.params = {
    ...context.params,
    query: rest,
    joinLocation,
    method
  };

  return context;
};

module.exports = {
  before: {
    all: [pluckParams],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [context => { console.error(context.error); }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
