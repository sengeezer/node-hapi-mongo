const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
  port: 3001,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  }
});

server.route({  
  method: 'GET',
  path:'/offers',
  handler: (request, h) => {
    return h.response('Here the offers will be shown soon...').code(200);
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  
  console.log('Server running at:', server.info.uri);
});

process.on('unhandledRejection', err => {
  console.log(err);

  process.exit(1);
});