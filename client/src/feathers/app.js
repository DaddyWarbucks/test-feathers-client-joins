import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import BatchLoader from '@feathers-plus/batch-loader';
import appHooks from './app.hooks';
// import { batchClient } from 'feathers-batch/client';
import { batchClient } from './batchClient';

import posts from './posts';
import profile from './profile';
import comments from './comments';
import users from './users';

process.hrtime = require('browser-process-hrtime');
const { profiler, getProfile, clearProfile } = require('feathers-profiler');

const app = feathers();

const urlParams = new URLSearchParams(window.location.search);
const provider = urlParams.get('provider') || 'socket';

const API_PATH =
  process.env.ENV === 'production' ? '/' : 'http://localhost:3030';

if (provider === 'rest') {
  app.configure(feathers.rest(API_PATH).fetch(fetch));
} else {
  app.configure(feathers.socketio(io(API_PATH), { timeout: 100000 }));
}

app.configure(feathers.authentication());

// Add a nice mixin to services that allow you to easily
// create batchLoaders w/o all the config
app.mixins.push(function (service) {
  service.loaderFactory = function (opts = {}) {
    if (!service.find) {
      throw new Error(
        `Cannot call the loaderFactory() method on this service because it does not have a find() method.`
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
    return new BatchLoader(async (keys) => {
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
        (rec) => rec[options.id],
        options.multi ? '[!]' : '!'
      );
    });
  };
});

app.configure(posts);
app.configure(profile);
app.configure(comments);
app.configure(users);

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

app.hooks(appHooks);

// Setup feathers-batch
app.configure(
  batchClient({
    batchService: 'api/batch',
    exclude: ['server/profile', 'client/profile', 'authentication']
  })
);

app.setup(app);

export default app;
