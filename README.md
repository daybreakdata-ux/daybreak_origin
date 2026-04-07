# AI People Search Engine

A comprehensive people search tool that performs deep internet searches using Firecrawl and generates detailed reports with multiple AI services including Grok, OpenRouter, Groq, Hugging Face, and OpenAI.

## Features

- Deep web search for people information
- Integration with Firecrawl for web scraping
- Support for multiple AI providers: Grok (xAI), OpenRouter, Groq, Hugging Face, and OpenAI
- Intelligent report generation with customizable prompts
- Beautiful React UI with Tailwind CSS
- Vercel deployment ready

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in Vercel:
   - `GROK_API_KEY`: Your xAI Grok API key
   - `FIRECRAWL_API_KEY`: Your Firecrawl API key
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `GROQ_API_KEY`: Your Groq API key
   - `HUGGINGFACE_API_KEY`: Your Hugging Face API key
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Run locally: `npm run dev`
5. Deploy to Vercel

## Usage

1. Select your preferred AI provider in the Settings menu (Grok, OpenRouter, Groq, Hugging Face, or OpenAI)
2. Enter a name and location or phone number in the search box
3. Optionally customize the AI prompt in settings
4. The backend will perform a comprehensive web search using Firecrawl
5. The selected AI service will compile the results into a detailed markdown report
6. View the results including addresses, phone numbers, social media, relatives, criminal records, etc.

## Settings

- **AI Provider**: Choose from Grok, OpenRouter, Groq, Hugging Face, or OpenAI
- **Custom Prompt**: Modify the default prompt to customize how the AI generates reports
- **API Keys**: Configure API keys for local testing (production uses Vercel environment variables)

## API

### POST /api/search

Request body:
```json
{
  "query": "John Doe New York",
  "provider": "grok",
  "prompt": "Custom instructions..."
}
```

**Parameters:**
- `query` (required): The search query (name, location, phone number)
- `provider` (optional): AI provider to use. Options: `grok`, `openrouter`, `groq`, `huggingface`, `openai`. Defaults to `grok`
- `prompt` (optional): Custom prompt for the AI. Uses default if not provided

**Supported Providers:**
- `grok`: xAI's Grok model
- `openrouter`: OpenRouter API (supports various models)
- `groq`: Groq's fast inference
- `huggingface`: Hugging Face Inference API
- `openai`: OpenAI's GPT models

Response:
```json
{
  "result": "# John Doe\n\n## Addresses\n- Current: 123 Main St, New York, NY\n\n..."
}
```

## Technology Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Web Scraping**: Firecrawl API
- **AI Services**: Multiple providers (Grok, OpenRouter, Groq, Hugging Face, OpenAI)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with Lucide React icons