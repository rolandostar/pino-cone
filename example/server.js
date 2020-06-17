
const app = require('fastify')({
  logger: {
    level: 'trace',
    base: null,
  },
});

app.register(require('fastify-chalk'));

app.get('/logs', async (request, reply) => {
  app.log.trace('This is a TRACE: For tracing every step of a program');
  app.log.debug('Then there is DEBUG: For any debugging outputs and extra info');
  app.log.info('INFO: Standard output messages');
  app.log.warn('Using WARN: For attention-grabbing messages');
  app.log.error('Also ERROR: Information when something goes wrong');
  app.log.fatal('Finally FATAL: Unrecoverable error');
  reply.send();
});

app.post('/echo', async (request, reply) => {
  app.log.info('pino-cone can print objects as such, with and without message:');
  app.log.info(request.body, 'This is a message to the side of an object');
  app.log.debug('Next, without a message:');
  app.log.info(request.body);
  app.log.debug('And in a different level:');
  app.log.warn(request.body);
  reply.send();
});

module.exports = app;
