import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const { query, prompt } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Get API keys from environment variables (set in Vercel)
    const grokApiKey = process.env.GROK_API_KEY
    const firecrawlApiKey = process.env.FIRECRAWL_API_KEY

    if (!grokApiKey || !firecrawlApiKey) {
      return NextResponse.json({ error: 'API keys not configured' }, { status: 500 })
    }

    // Perform web search using Firecrawl
    const searchResults = await performWebSearch(firecrawlApiKey, query)

    // Generate response using Grok
    const grokResponse = await generateGrokResponse(grokApiKey, query, searchResults, prompt)

    return NextResponse.json({ result: grokResponse })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function performWebSearch(firecrawlApiKey: string, query: string): Promise<string> {
  try {
    const response = await axios.post('https://api.firecrawl.dev/v1/search', {
      query,
      limit: 20,
      format: 'markdown',
    }, {
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.data.success && response.data.data) {
      return response.data.data.map((item: any) => item.markdown).join('\n\n---\n\n')
    }

    return 'No search results found.'
  } catch (error) {
    console.error('Firecrawl search error:', error)
    return 'Error performing web search.'
  }
}

async function generateGrokResponse(apiKey: string, query: string, searchResults: string, customPrompt?: string): Promise<string> {
  const defaultPrompt = `You are an AI assistant that performs deep internet searches for people information. Based on the search results provided below, compile a comprehensive markdown report including:

- Full name and aliases
- Current and past addresses
- Phone numbers
- Email addresses
- Social media profiles
- Professional information
- Relatives and associates
- Criminal records (if any)
- Other relevant public information

Search Query: ${query}

Search Results:
${searchResults}

Format the response in clean markdown with sections and bullet points. If information is not available, note that clearly.`

  const prompt = customPrompt || defaultPrompt

  try {
    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'grok-beta',
      stream: false,
      temperature: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Grok API error:', error)
    throw new Error('Failed to generate response from Grok')
  }
}