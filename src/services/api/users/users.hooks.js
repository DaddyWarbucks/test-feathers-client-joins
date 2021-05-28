const { authenticate } = require('@feathersjs/authentication').hooks;
const { switchHook } = require('shared');
const { hashPassword } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [switchHook('users', 'server')],
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
