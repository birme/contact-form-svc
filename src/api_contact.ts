import { FastifyPluginCallback } from 'fastify';
import formbody from '@fastify/formbody';
import { FormBody, Transport, create } from './transports/factory';

export interface ApiContactOpts {
  transport: Transport;
}

const apiContact: FastifyPluginCallback<ApiContactOpts> = (
  fastify,
  opts,
  next
) => {
  const transporter = create(opts.transport);

  fastify.setErrorHandler((error, request, reply) => {
    reply.code(500).send({ reason: error.message });
  });

  fastify.register(formbody);

  fastify.post<{ Body: FormBody }>('/contact', async (req, reply) => {
    try {
      await transporter.send({ ...req.body });
      reply.send({ message: 'Contact form submitted' });
    } catch (err) {
      console.error(err);
      reply.code(500).send({ message: 'Failed to submit contact form' });
    }
  });

  next();
};

export default apiContact;
