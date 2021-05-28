import { withResult } from 'feathers-fletching';

export default app => {
  const withResults = withResult({
    tag: (category, context) => {
      return context.app.service('api/tags').get(category.tag_id, {
        hookName: context.params.hookName
      });
    }
  });

  const withResultsBatchLoader = withResult({
    tag: (category, context, { tags }) => {
      return tags.load(category.tag_id, {
        hookName: context.params.hookName
      });
    }
  }, context => {
    return {
      tags: context.app.service('api/tags').loaderFactory()
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

  app.service('api/categories').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook]
    }
  });
}