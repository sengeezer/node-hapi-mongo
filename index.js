const Hapi = require('@hapi/hapi');
const mongojs = require('mongojs');

const server = new Hapi.Server({
  port: 3001,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  }
});

server.app.db = mongojs('hapi-rest-mongo', ['offers']);

const init = async () => {
  await server.register(
    {
      plugin: require('./routes/offers'),
      options: {}
    }
  );

  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });
};

process.on('unhandledRejection', err => {
  console.log(err);

  process.exit(1);
});

init();