import { tool } from 'ai';
import z from 'zod';
import { redis } from '../../redis/client.js';

export const redisTool = tool({
  description: `
    Realiza um comando no Redis para buscar informações sobre o sistema de indicações como número de cliques no link, 
    número de indicações (convites) realizados e ranking de indicações.

    Só pode ser ultilizada para buscar dados do Redis, não é permitida a geração de qualquer operação de modificação (SET, DEL, etc).

    Você pode buscar dados como:
    - Um hash chamado "referral:access-count" que guarda o número de cliques no link de convite/indicação 
    de cada usuario no formato { "SUBSCRIBER_ID": NUMERO_DE_CLIQUES } onde o SUBSCRIBER_ID vem do Postgres.
    - Um zset chamado "referral:ranking" que guarda o total de convites/indicações realizadas por cada usuario 
    onde o score é a quantidade de convites e conteudo é o SUBSCRIBER_ID que vem do Postgres.

  `.trim(),
  inputSchema: z.object({
    comand: z.string().describe('O comando Redis a ser executado como GET, HGET, ZRANGE, etc.'),
    args: z.array(z.string().describe('Argumentos para o comando Redis a ser executado.')),
  }),
  execute: async ({ comand, args }) => {
    console.log('🛠️ Executando comando no Redis:', { comand, args });
    const result = await redis.call(comand, ...args);
    console.log('📊 Dados do banco:', result);
    return JSON.stringify(result);
  },
});
