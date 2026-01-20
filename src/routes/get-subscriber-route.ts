import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getSubscriberById } from '../functions/get-subscriber-by-id.js';

export const getSubscriberRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscriptions/:subscriberId',
    {
      schema: {
        summary: 'Get subscriber by ID',
        tags: ['subscriptions'],
        operationId: 'getSubscriber',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            subscriberId: z.string(),
            name: z.string(),
            email: z.string().email(),
            createdAt: z.string(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;

      const { subscriber } = await getSubscriberById({
        subscriberId,
      });

      if (!subscriber) {
        return reply.code(404).send({ message: 'Subscriber not found' });
      }

      return reply.code(200).send({
        subscriberId: subscriber.id,
        name: subscriber.name,
        email: subscriber.email,
        createdAt: subscriber.createdAt.toISOString(),
      });
    },
  );
};
