import { OpenAI } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getEmbeddings = async (text: string) => {
    try {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
      });
      return embedding.data[0].embedding;
    } catch (error: any) {
      console.error('Error fetching embeddings:', error.message || 'An unknown error occurred');
      throw new Error(error.message || 'An unknown error occurred');
    }
  };
