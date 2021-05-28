const {
  paramsFromClient,
  setupLoader
} = require('../client/src/feathers/hooks');

module.exports = {
  before: {
    all: [paramsFromClient, setupLoader],
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
    all: [
      (context) => {
        console.error(context.error);
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
