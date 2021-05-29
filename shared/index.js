const { ContextLoader } = require('@feathers-plus/batch-loader');

module.exports.makeParams = (context) => {
  return {
    method: context.params.method,
    joinLocation: context.params.joinLocation,
    maxBatchSize: context.params.maxBatchSize,
    loader: context.params.loader
  };
};

module.exports.paramsFromClient = (context) => {
  if (context.params.provider) {
    const { method, joinLocation, maxBatchSize, ...rest } =
      context.params.query || {};

    context.params = {
      ...context.params,
      query: rest,
      method,
      joinLocation,
      maxBatchSize
    };
  }

  // console.log(`paramsFromClient:${context.path}: `, { method, joinLocation });

  return context;
};

module.exports.paramsForServer = (context) => {
  const { method, joinLocation, maxBatchSize } = context.params;
  context.params.query = {
    ...context.params.query,
    method,
    joinLocation,
    maxBatchSize
  };
  // console.log('paramsForServer: ', { method, joinLocation });
  return context;
};

module.exports.setupLoader = (context) => {
  if (!context.params.loader) {
    const loader = new ContextLoader(context);
    context.params.loader = loader.loader;
  }
  return context;
};

module.exports.switchHook = (service, location) => (context) => {
  const { joinLocation, method } = context.params;

  if (!joinLocation || !method) {
    // console.log('No joinLocation or method');
    return context;
  }

  // console.log(`Using the ${method} method on the ${joinLocation}`);

  if (joinLocation !== location) {
    return context;
  }

  const {
    withResultsPrimary,
    withResultsCached,
    withResultsLoad
  } = require(`./${service}`);

  switch (method) {
    case 'primary':
      return withResultsPrimary(context);
    case 'cached':
      return withResultsCached(context);
    case 'load':
      return withResultsLoad(context);

    default:
      return context;
  }
};
