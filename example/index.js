
require('dotenv').config();
const fastify = require('./server');

fastify.ready()
  .then(() => {
    fastify.log.info('SERVER\t[%s]', fastify.chalk.green('READY'));
    fastify.listen(process.env.PORT, process.env.HOST).then(() => {
      fastify.log.trace(fastify.printRoutes());
    });
  })
  .catch((err) => {
    fastify.log.fatal('SERVER\t[ERROR]\n%s', err.message);
    process.exit(1);
  });
