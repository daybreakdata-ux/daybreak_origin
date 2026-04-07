import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const { query, prompt, provider } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Get API keys from environment variables (set in Vercel)
    const grokApiKey = process.env.GROK_API_KEY
    const firecrawlApiKey = process.env.FIRECRAWL_API_KEY
    const openrouterApiKey = process.env.OPENROUTER_API_KEY
    const groqApiKey = process.env.GROQ_API_KEY
    const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!firecrawlApiKey) {
      return NextResponse.json({ error: 'Firecrawl API key not configured' }, { status: 500 })
    }

    // Perform web search using Firecrawl
    const searchResults = await performWebSearch(firecrawlApiKey, query)

    // Generate response using selected AI
    const aiResponse = await generateAIResponse(provider || 'grok', {
      grok: grokApiKey,
      openrouter: openrouterApiKey,
      groq: groqApiKey,
      huggingface: huggingfaceApiKey,
      openai: openaiApiKey,
    }, query, searchResults, prompt)

    return NextResponse.json({ result: aiResponse })
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

async function generateAIResponse(provider: string, apiKeys: Record<string, string | undefined>, query: string, searchResults: string, customPrompt?: string): Promise<string> {
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

  const providers = {
    grok: {
      url: 'https://api.x.ai/v1/chat/completions',
      model: 'grok-beta',
      key: apiKeys.grok,
    },
    openrouter: {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'openai/gpt-3.5-turbo',
      key: apiKeys.openrouter,
    },
    groq: {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'llama3-8b-8192',
      key: apiKeys.groq,
    },
    huggingface: {
      url: 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
      model: null, // HF uses different format
      key: apiKeys.huggingface,
    },
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
      key: apiKeys.openai,
    },
  }

  const config = providers[provider as keyof typeof providers]
  if (!config || !config.key) {
    throw new Error(`Provider ${provider} not configured or API key missing`)
  }

  if (provider === 'huggingface') {
    // Hugging Face has different API
    const response = await axios.post(config.url, {
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.1,
      },
    }, {
      headers: {
        'Authorization': `Bearer ${config.key}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data[0]?.generated_text || 'No response from Hugging Face'
  } else {
    // OpenAI-compatible
    const response = await axios.post(config.url, {
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: config.model,
      stream: false,
      temperature: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
      },
    })

    return response.data.choices[0].message.content
  }
}