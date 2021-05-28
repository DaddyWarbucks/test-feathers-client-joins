import { switchHook } from 'shared';

export default (app) => {
  app.service('api/categories').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook('categories', 'client')]
    }
  });
};
