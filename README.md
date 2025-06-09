# AI Code Translator

An AI-powered code translation tool that helps you convert code between different programming languages using Deepseek AI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzhangzhang88%2Fai-code-translator-1)

## Features

- Translate code between 40+ programming languages
- Real-time syntax highlighting
- Streaming response
- Modern UI with dark theme
- Mobile responsive

## Getting Started

1. Visit the deployed application
2. Enter your Deepseek API key
3. Select input and output programming languages
4. Enter or paste your code
5. Click "Translate" to convert your code

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
DEEPSEEK_API_KEY=your_api_key_here # Optional, can be provided via UI
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Deepseek AI API
- CodeMirror

## License

MIT License
