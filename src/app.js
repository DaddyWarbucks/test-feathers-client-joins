const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const { strictRestQuery } = require('feathers-fletching');
const {
  profiler,
  getProfile,
  clearProfile
} = require('feathers-profiler');
const BatchLoader = require('@feathers-plus/batch-loader');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

app.configure(strictRestQuery({
  arrayLimit: 5000,
  depth: 5000,
  parameterLimit: 5000
}));

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Add a nice mixin to services that allow you to easily
// create batchLoaders w/o all the config
app.mixins.push(function (service) {
  service.loaderFactory = function (opts = {}) {
    if (!service.find) {
      throw new Error(
        'Cannot call the loaderFactory() method on this service because it does not have a find() method.'
      );
    }
    const { params = {}, ...rest } = opts;
    const options = {
      id: '_id',
      multi: false,
      ...rest
    };
    const serviceParams = {
      paginate: false,
      ...params
    };
    return new BatchLoader(async keys => {
      const result = await service.find({
        ...serviceParams,
        query: {
          [options.id]: { $in: BatchLoader.getUniqueKeys(keys) },
          ...serviceParams.query
        }
      });
      return BatchLoader.getResultsByKey(
        keys,
        result.data ? result.data : result,
        rec => rec[options.id],
        options.multi ? '[!]' : '!'
      );
    });
  };
});

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Setup profiler
app.configure(
  profiler({
    logger: null,
    stats: 'total'
  })
);
app.set('profiler', {
  getProfile,
  clearProfile
});

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
