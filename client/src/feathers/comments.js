import { switchHook } from 'shared';

export default (app) => {
  app.service('api/comments').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook('comments', 'client')]
    }
  });
};
