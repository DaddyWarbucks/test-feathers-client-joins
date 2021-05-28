# test-feathers-client-joins

![image info](./screenshot.png)

## About

This is a basic example app that compares doing joins/population on the client vs on the server. It is also a test bed and exmaple of a new v2 for [feathers-dataloader](https://github.com/feathersjs-ecosystem/batch-loader/tree/v2) . See also the [v2 RFC](https://github.com/feathersjs-ecosystem/batch-loader/issues/18) and leave some feedback! You can also checkout the [source code](https://github.com/DaddyWarbucks/test-feathers-client-joins) for this project. Specifically, see the `shared` direcotry.

The app makes one request to `app.service('api/posts').find()`. The posts then join a `user` and `comments`. Each user then joins on a `bio`, and each comment subsequently joins on its `user` (and subsequently its bio).

- 10,000 posts, each with random `user_id`
- 50,000 comments, each with random `user_id` and `post_id`
- 5,000 users, each with corresponding `bio_id`
- 5,000 bios

These relationships represent a good example of nested joins where some of those joins are "repeating" resources, such as the post joining its author and comments joinging their user. This is an excellent usecase for `feathers-datalader`.

## Development

The client side uses create-react-app. Note this is not a React specific implementaion or idea. I simply used React and Bootstrap because I know them well and this was just a quick weekend project. There is not a unified start/dev/build script. You will need to open two terminals and run the server in one terminal and run CRA in another terminal.

```js
// from the root dir
yarn install
yarn run dev

// from another terminal
cd client
yarn install
yarn start
```

## Deployment

The app is currently using a very poor-man's deployment solution. Run the create-react-app build command and then those assets are served from the server.

```js
cd client
yarn build
```
