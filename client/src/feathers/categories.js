import { withResult } from 'feathers-fletching';
import GroupLoader from './groupLoader';

export default app => {
  const withResults = withResult({
    tag: (category, context) => {
      return context.app.service('api/tags').get(category.tag_id);
    }
  });

  const withResultsBatchLoader = withResult({
    tag: (category, context, { tags }) => {
      return tags.load(category.tag_id);
    }
  }, context => {
    return {
      tags: context.app.service('api/tags').loaderFactory()
    };
  });

  const withResultsGroupLoader = withResult({
    tag: (category, context, groupLoader) => {
      return groupLoader.service('api/tags').load(category.tag_id);
    }
  }, context => {
    return new GroupLoader(context)
  });

  const switchHook = context => {
    switch(context.app.get('hookName')) {
      case 'withResultsBatchLoader':
        return withResultsBatchLoader(context);
      case 'withResultsGroupLoader':
        return withResultsGroupLoader(context);
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