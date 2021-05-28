const apiPosts = require('./api/posts/posts.service.js');
const apiUsers = require('./api/users/users.service.js');
const apiCategories = require('./api/categories/categories.service.js');
const apiBatch = require('./api/batch/batch.service.js');
const serverProfile = require('./server/profile/profile.service.js');
const apiTags = require('./api/tags/tags.service.js');
const apiBios = require('./api/bios/bios.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiPosts);
  app.configure(apiUsers);
  app.configure(apiCategories);
  app.configure(apiBatch);
  app.configure(serverProfile);
  app.configure(apiTags);
  app.configure(apiBios);
};
