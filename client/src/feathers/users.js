import { withResult } from 'feathers-fletching';
import GroupLoader from './groupLoader';

export default app => {
  const withResults = withResult({
    bio: (user, context) => {
      return context.app.service('api/bios').get(user.bio_id);
    }
  });

  const withResultsBatchLoader = withResult({
    bio: (user, context, { bios }) => {
      return bios.load(user.bio_id);
    },
  }, context => {
    return {
      bios: context.app.service('api/bios').loaderFactory()
    };
  });

  const withResultsGroupLoader = withResult({
    bio: (user, context, groupLoader) => {
      return groupLoader.service('api/bios').load(user.bio_id);
    }
  }, context => {
    return new GroupLoader(context);
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

  app.service('api/users').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook]
    }
  });
}