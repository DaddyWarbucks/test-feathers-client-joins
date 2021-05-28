import { withResult } from 'feathers-fletching';

export default app => {
  const withResults = withResult({
    user: (post, context) => {
      return context.app.service('api/users').get(post.user_id, {
        hookName: context.params.hookName
      });
    },
    category: (post, context) => {
      return context.app.service('api/categories').get(post.category_id, {
        hookName: context.params.hookName
      });
    }
  });

  const withResultsBatchLoader = withResult({
    user: (post, context, { users }) => {
      return users.load(post.user_id, {
        hookName: context.params.hookName
      });
    },
    category: (post, context, { categories }) => {
      return categories.load(post.category_id, {
        hookName: context.params.hookName
      });
    },
  }, context => {
    return {
      users: context.app.service('api/users').loaderFactory(),
      categories: context.app.service('api/categories').loaderFactory(),
    };
  });

  const switchHook = context => {
    switch (context.params.hookName) {
      case 'withResultsBatchLoader':
        return withResultsBatchLoader(context);
      case 'withResults':
        return withResults(context);

      default:
        return context;
    }
  }

  app.service('api/posts').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook]
    }
  });
}