import { switchHook } from 'shared';

export default (app) => {
  app.service('api/posts').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook('posts', 'client')]
    }
  });
};
