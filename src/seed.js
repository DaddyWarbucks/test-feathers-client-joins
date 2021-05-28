const faker = require('faker');
const app = require('./app');

const randomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const bios = new Array(1000).fill(null).map(() => {
  return {
    _id: faker.random.uuid(),
    name: faker.lorem.word()
  };
});

const users = new Array(999).fill(null).map(() => {
  const bioIndex = randomIndex(0, 998);
  const bio = bios[bioIndex];
  return {
    _id: faker.random.uuid(),
    name: faker.name.findName(),
    // email: faker.internet.email(),
    email: faker.random.uuid(), // emails must be unique
    password: 'password',
    bio_id: bio._id
  };
});

const bioIndex = randomIndex(0, 998);
const bio = bios[bioIndex];
users.push({
  _id: faker.random.uuid(),
  name: 'Main User',
  email: 'na@example.com',
  password: 'password',
  bio_id: bio._id
});

const tags = new Array(1000).fill(null).map(() => {
  return {
    _id: faker.random.uuid(),
    name: faker.lorem.word(),
  };
});

const categories = new Array(1000).fill(null).map(() => {
  const tagIndex = randomIndex(0, 999);
  const tag = tags[tagIndex];
  return {
    _id: faker.random.uuid(),
    name: faker.lorem.word(),
    tag_id: tag._id
  };
});

const posts = new Array(5000).fill(null).map(() => {
  const userIndex = randomIndex(0, 999);
  const user = users[userIndex];

  const categoryIndex = randomIndex(0, 999);
  const category = categories[categoryIndex];

  return {
    _id: faker.random.uuid(),
    title: faker.lorem.words(),
    user_id: user._id,
    category_id: category._id,
  };
});

const seed = async () => {
  console.log('Seeding. This may take about a minute');
  await Promise.all([
    app.service('api/users').create(users),
    app.service('api/categories').create(categories),
    app.service('api/tags').create(tags),
    app.service('api/bios').create(bios),
    app.service('api/posts').create(posts)
  ]).catch(console.error);
  console.log('Done seeding');
};

return seed();