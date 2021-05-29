import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import appHooks from './app.hooks';
import { batchClient } from './batchClient';
import { useState, useCallback } from 'react';

import posts from './posts';
import profile from './profile';
import comments from './comments';
import users from './users';

// Required to run feathers-profilers in the browser
process.hrtime = require('browser-process-hrtime');
const { profiler, getProfile, clearProfile } = require('feathers-profiler');

const API_PATH =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030'
    : window.location.origin;

// Share state across both the restApp and
// the socketApp
let appState = {
  limit: 1,
  useBatch: false,
  maxBatchSize: null,
  method: 'primary',
  joinLocation: 'client',
  provider: 'rest',
  docsOpen: false,
  loading: true,
  error: null,
  serverProfile: null,
  clientProfile: null,
  posts: null,
  duration: null
};

const setState = (newState) => {
  appState = { ...appState, ...newState };
};

const getState = () => {
  return { ...appState };
};

const useAppState = () => {
  const [, render] = useState({});
  const set = useCallback((newState) => {
    setState(newState);
    render({});
  }, []);
  return [appState, set];
};

const setupApp = (app) => {
  app.configure(feathers.authentication());

  app.setState = setState;
  app.getState = getState;
  app.useAppState = useAppState;

  app.configure(posts);
  app.configure(profile);
  app.configure(comments);
  app.configure(users);

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

  app.configure(
    batchClient({
      batchService: 'api/batch',
      timeout: 3,
      exclude: ['server/profile', 'client/profile', 'authentication']
    })
  );

  app.setup(app);

  return app;
};

const restApp = feathers();
restApp.configure(feathers.rest(API_PATH).fetch(fetch));
setupApp(restApp);

const socketApp = feathers();
socketApp.configure(feathers.socketio(io(API_PATH), { timeout: 100000 }));
setupApp(socketApp);

restApp.socketApp = socketApp;

const oldService = restApp.service;
restApp.service = function (path) {
  const { provider } = restApp.getState();
  if (provider === 'rest') {
    return oldService.call(this, path);
  }
  return restApp.socketApp.service(path);
};

export default restApp;
