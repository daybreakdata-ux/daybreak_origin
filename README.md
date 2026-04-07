# AI People Search Engine

A comprehensive people search tool that performs deep internet searches using Firecrawl and generates detailed reports with Grok AI.

## Features

- Deep web search for people information
- Integration with Firecrawl for web scraping
- Grok AI for intelligent report generation
- Beautiful React UI with Tailwind CSS
- Vercel deployment ready

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in Vercel:
   - `GROK_API_KEY`: Your xAI Grok API key
   - `FIRECRAWL_API_KEY`: Your Firecrawl API key
4. Run locally: `npm run dev`
5. Deploy to Vercel

## Usage

1. Enter a name and location or phone number in the search box
2. The backend will perform a comprehensive web search
3. Grok AI will compile the results into a detailed markdown report
4. View the results including addresses, phone numbers, social media, etc.

## API

### POST /api/search

Request body:
```json
{
  "query": "John Doe New York"
}
```

Response:
```json
{
  "result": "# John Doe\n\n## Addresses\n- Current: 123 Main St, New York, NY\n\n..."
}
```