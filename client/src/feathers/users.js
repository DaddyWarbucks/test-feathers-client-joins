import { switchHook } from 'shared';

export default (app) => {
  app.service('api/users').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook('users', 'client')]
    }
  });
};
