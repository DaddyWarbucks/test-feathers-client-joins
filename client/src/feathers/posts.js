import { withResult } from 'feathers-fletching';
import GroupLoader from './groupLoader';

export default app => {
  const withResults = withResult({
    user: (post, context) => {
      return context.app.service('api/users').get(post.user_id);
    },
    category: (post, context) => {
      return context.app.service('api/categories').get(post.category_id);
    }
  });

  const withResultsBatchLoader = withResult({
    user: (post, context, { users }) => {
      return users.load(post.user_id);
    },
    category: (post, context, { categories }) => {
      return categories.load(post.category_id);
    },
    // category1: (post, context, { categories1 }) => {
    //   return categories1.load(post.category_id);
    // },
    // category2: (post, context, { categories2 }) => {
    //   return categories2.load(post.category_id);
    // },
    // category3: (post, context, { categories3 }) => {
    //   return categories3.load(post.category_id);
    // },
    // category4: (post, context, { categories4 }) => {
    //   return categories4.load(post.category_id);
    // },
    // category5: (post, context, { categories5 }) => {
    //   return categories5.load(post.category_id);
    // },
  }, context => {
    return {
      users: context.app.service('api/users').loaderFactory(),
      categories: context.app.service('api/categories').loaderFactory(),
      categories1: context.app.service('api/categories').loaderFactory(),
      categories2: context.app.service('api/categories').loaderFactory(),
      categories3: context.app.service('api/categories').loaderFactory(),
      categories4: context.app.service('api/categories').loaderFactory(),
      categories5: context.app.service('api/categories').loaderFactory(),
    };
  });

  const withResultsGroupLoader = withResult({
    user: (post, context, groupLoader) => {
      return groupLoader.service('api/users').load(post.user_id);
    },
    category: (post, context, groupLoader) => {
      return groupLoader.service('api/categories').load(post.category_id);
    },
    // category1: (post, context, groupLoader) => {
    //   return groupLoader.service('api/categories').load(post.category_id);
    // },
    // category2: (post, context, groupLoader) => {
    //   return groupLoader.service('api/categories').load(post.category_id);
    // },
    // category3: (post, context, groupLoader) => {
    //   return groupLoader.service('api/categories').load(post.category_id);
    // },
    // category4: (post, context, groupLoader) => {
    //   return groupLoader.service('api/categories').load(post.category_id);
    // },
    // category5: (post, context, groupLoader) => {
    //   return groupLoader.service('api/categories').load(post.category_id);
    // }
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

  app.service('api/posts').hooks({
    before: {
      all: []
    },
    after: {
      all: [switchHook]
    }
  });
}