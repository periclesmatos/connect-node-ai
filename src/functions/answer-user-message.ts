import { generateText, stepCountIs, tool } from 'ai';
import { gemini } from '../ai/gemini.js';
import { postgresTool } from '../ai/tools/postgres-tool.js';
import { redisTool } from '../ai/tools/redis-tool.js';

interface AnswerUserMessageParams {
  message: string;
}

export async function answerUserMessage({ message }: AnswerUserMessageParams) {
  console.log('📩 Mensagem recebida:', message);

  const answer = await generateText({
    model: gemini,
    tools: {
      postgresTool,
      redisTool,
    },
    prompt: message,
    system: `
      Você é um assistente de IA responsável por responder dúvidas sobre um evento de programação.

      Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.

      O retorno deve ser sempre em markdown (sem incluir \`\`\` no início ou no fim)
    `.trim(),
    stopWhen: stepCountIs(5),
  });

  // console.log('🤖 Resposta completa:', JSON.stringify(answer, null, 2));
  // console.log('📝 Texto da resposta:', answer.text);

  return { text: answer.text };
}
