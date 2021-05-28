const apiPosts = require('./api/posts/posts.service.js');
const apiUsers = require('./api/users/users.service.js');
const apiComments = require('./api/comments/comments.service.js');
const apiBatch = require('./api/batch/batch.service.js');
const serverProfile = require('./server/profile/profile.service.js');
const apiBios = require('./api/bios/bios.service.js');

const users = require('./users/users.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiPosts);
  app.configure(apiUsers);
  app.configure(apiComments);
  app.configure(apiBatch);
  app.configure(serverProfile);
  app.configure(apiBios);
  app.configure(users);
};
