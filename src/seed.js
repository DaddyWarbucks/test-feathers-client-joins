const faker = require('faker');
const app = require('./app');

const userTotal = 5000;
const postsTotal = 10000;
const commentsTotal = 50000;

const randomIndex = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const bios = new Array(userTotal - 1).fill(null).map(() => {
  return {
    _id: faker.random.uuid(),
    content: faker.lorem.words()
  };
});

const users = new Array(userTotal - 1).fill(null).map((_, index) => {
  return {
    _id: faker.random.uuid(),
    name: faker.name.findName(),
    // email: faker.internet.email(),
    email: faker.random.uuid(), // emails must be unique
    password: 'password',
    bio_id: bios[index]._id
  };
});

const bio = {
  _id: faker.random.uuid(),
  content: faker.lorem.words()
};

bios.push(bio);

users.push({
  _id: faker.random.uuid(),
  name: 'Main User',
  email: 'na@example.com',
  password: 'password',
  bio_id: bio._id
});

const posts = new Array(postsTotal).fill(null).map(() => {
  return {
    _id: faker.random.uuid(),
    title: faker.lorem.words(),
    user_id: users[randomIndex(0, userTotal - 1)]._id
  };
});

const comments = new Array(commentsTotal).fill(null).map(() => {
  return {
    _id: faker.random.uuid(),
    comment: faker.lorem.words(),
    user_id: users[randomIndex(0, userTotal - 1)]._id,
    post_id: posts[randomIndex(0, postsTotal - 1)]._id
  };
});

const seed = async () => {
  console.log('Seeding...');
  await Promise.all([
    app.service('api/users').create(users),
    app.service('api/comments').create(comments),
    app.service('api/bios').create(bios),
    app.service('api/posts').create(posts)
  ]).catch(console.error);
  console.log('Done seeding');
};

return seed();
