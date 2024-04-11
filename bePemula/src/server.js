const h = require('@hapi/hapi');
const bookRoute = require('./routes/book');

const init = () => {
  const server = h.server({
    port: 9000,
    host: 'localhost',
  });

  server.route(bookRoute);

  server.start();
};

init();
