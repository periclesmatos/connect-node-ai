import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from './env.js';
import { accessInviteLinkRoute } from './routes/access-invite-link-route.js';
import { getRankingRoute } from './routes/get-ranking-route.js';
import { getSubscriberInvitesClicksRoute } from './routes/get-subscriber-invites-clicks-route.js';
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route.js';
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position.js';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route.js';
import { sendMessageRoute } from './routes/send-message-route.js';
import { getSubscriberRoute } from './routes/get-subscriber-route.js';

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(subscribeToEventRoute);
app.register(getSubscriberRoute);
app.register(accessInviteLinkRoute);
app.register(getRankingRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberInvitesClicksRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(sendMessageRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!');
});
