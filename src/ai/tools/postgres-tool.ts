import { tool } from "ai";
import z from "zod";
import { pg } from "../../drizzle/client.js";

export const postgresTool = tool({
  description: `
    Realiza uma query no Postgres para buscar informações sobre as tabelas do banco de dados.

    Só pode realizar operações de busca (SELECT), não é permitida a geração de qualquer operação de modificação (INSERT, UPDATE, DELETE, etc).

    Tables:
    """ 
    CREATE TABLE subscriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    """

    Todas operações devem retornar um maximo de 50 itens.
  `.trim(),
  inputSchema: z.object({
    query: z.string().describe('A query SQL do Postgres a ser executada.'),
    params: z.array(z.string().describe('Parâmetros para a query SQL a ser executada.')),
  }),
  execute: async ({ query, params }) => {
    console.log('🛠️ Executando query no Postgres:', { query, params });
    const result = await pg.unsafe(query, params);
    console.log('📊 Dados do banco:', result);
    return JSON.stringify(result);
  },
})