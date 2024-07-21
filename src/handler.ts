import { APIGatewayProxyHandler } from 'aws-lambda';
import { getEmbeddings } from './utils/embeddings';
import { cosineSimilarity } from './utils/similarity';
import 'dotenv/config';
import namesList from './names.json';

interface Name {
  english: string;
  chinese: string;
  embedding?: number[];
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const inputName = event.queryStringParameters?.name || '';

  try {
    const inputEmbedding = await getEmbeddings(inputName);

    const nameEmbeddings: (Name & { embedding: number[] })[] = await Promise.all(
      namesList.map(async (name: Name) => ({
        ...name,
        embedding: await getEmbeddings(`${name.english} ${name.chinese}`),
      }))
    );

    let bestMatch: Name | null = null;
    let highestSimilarity = -1;
    nameEmbeddings.forEach((name) => {
      const similarity = cosineSimilarity(inputEmbedding, name.embedding);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = name;
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ match: bestMatch }),
    };
  } catch (error: any) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'An unknown error occurred' }),
    };
  }
};
