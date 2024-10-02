import fastify from 'fastify';
import cors from '@fastify/cors';
import { Transport } from './transports/factory';
import apiContact from './api_contact';

async function main() {
  if (!process.env.TRANSPORT) {
    console.log('No transport selected, will use dummy');
  }

  const server = fastify({ ignoreTrailingSlash: true });
  server.register(cors);

  server.get<{ Reply: { message: string } }>('/', async (_, reply) => {
    reply.send({ message: 'Hello, world!' });
  });
  const transport = (process.env.TRANSPORT as Transport) || 'dummy';
  server.register(apiContact, { transport });

  const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

  server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      throw err;
    }
    console.log(`Server listening on ${address}`);
  });
}

export default main();
