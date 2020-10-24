const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const server = new Hapi.Server({
  port: 3001,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  }
});

// server.app.db = mongojs('hapi-rest-mongo', ['offers']);
mongoose.connect('mongodb://localhost/hapi-rest-mongo', { useNewUrlParser: true });

const OfferModel = mongoose.model('offer', {
  name: String,
  items: Array,
  price: Number,
  expires: Date
});

server.app.db = { model: OfferModel };

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