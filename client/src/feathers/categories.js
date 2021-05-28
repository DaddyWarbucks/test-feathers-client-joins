import { switchHook } from './hooks';

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
