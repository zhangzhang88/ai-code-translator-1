import { DeepseekStream } from '@/utils';
import { TranslateBody } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  try {
    const { inputLanguage, outputLanguage, inputCode, model, apiKey } =
      (await req.json()) as TranslateBody;

    const stream = await DeepseekStream(
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
