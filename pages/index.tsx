import { useEffect, useState } from 'react';
import { TranslateBody } from '@/types/types';
import { LanguageSelect } from '@/components/LanguageSelect';
import { CodeEditor } from '@/components/CodeEditor';
import { APIKeyInput } from '@/components/APIKeyInput';
import Head from 'next/head';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');

  const handleTranslate = async () => {
    if (!apiKey) {
      alert('Please enter an API key.');
      return;
    }

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > 12000) {
      alert(
        `Please enter code less than 12000 characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model: 'deepseek-coder',
      apiKey,
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    const apiKey = localStorage.getItem('deepseek-api-key');
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Code Translator</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="fixed right-4 top-4 z-10">
          <a
            href="https://ztr8.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600"
          >
            <span>Visit Homepage</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">AI Code Translator</div>
          <div className="mt-3 text-center text-lg">
            Translate your code to different programming languages using Deepseek AI
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <APIKeyInput 
            apiKey={apiKey} 
            onChange={(value) => {
              setApiKey(value);
              localStorage.setItem('deepseek-api-key', value);
            }} 
          />
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>
            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => setInputLanguage(value)}
            />
            <CodeEditor
              code={inputCode}
              language={inputLanguage}
              onChange={(value) => setInputCode(value)}
              loading={loading}
            />
          </div>

          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Output</div>
            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => setOutputLanguage(value)}
            />
            <CodeEditor
              code={outputCode}
              language={outputLanguage}
              onChange={(value) => setOutputCode(value)}
              loading={loading}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700 disabled:opacity-50"
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {hasTranslated && (
          <div className="mt-4 text-sm text-neutral-400">
            Output copied to clipboard!
          </div>
        )}
      </div>
    </>
  );
}
