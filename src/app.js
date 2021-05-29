const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const { strictRestQuery } = require('feathers-fletching');
const { profiler, getProfile, clearProfile } = require('feathers-profiler');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

app.configure(
  strictRestQuery({
    arrayLimit: 5000,
    depth: 5000,
    parameterLimit: 5000
  })
);

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      console.log({ origin });
      if (
        !origin ||
        origin === 'http://localhost:3000' ||
        origin === 'https://test-feathers-client-joins.herokuapp.com/'
      ) {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS'));
    }
  })
);
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Host the public folder
app.use('/', express.static('./client/build'));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

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
