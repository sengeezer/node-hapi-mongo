const Hapi = require('hapi');

const server = new Hapi.Server();  

server.connection({  
  host: 'localhost',
  port: 3000
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
