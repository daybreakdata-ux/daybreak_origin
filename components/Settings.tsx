'use client'

import { useState } from 'react'

interface SettingsProps {
  customPrompt: string
  setCustomPrompt: (prompt: string) => void
  selectedProvider: string
  setSelectedProvider: (provider: string) => void
}

export default function Settings({ customPrompt, setCustomPrompt, selectedProvider, setSelectedProvider }: SettingsProps) {
  const [apiKeys, setApiKeys] = useState({
    grok: '',
    firecrawl: '',
    openrouter: '',
    groq: '',
    huggingface: '',
    openai: '',
  })

  const handleSave = () => {
    // In a real app, save to localStorage or send to backend
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
    localStorage.setItem('customPrompt', customPrompt)
    localStorage.setItem('selectedProvider', selectedProvider)
    alert('Settings saved!')
  }

  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI Provider
          </label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="grok">Grok (xAI)</option>
            <option value="openrouter">OpenRouter</option>
            <option value="groq">Groq</option>
            <option value="huggingface">Hugging Face</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grok API Key
          </label>
          <input
            type="password"
            value={apiKeys.grok}
            onChange={(e) => setApiKeys(prev => ({ ...prev, grok: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your Grok API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Firecrawl API Key
          </label>
          <input
            type="password"
            value={apiKeys.firecrawl}
            onChange={(e) => setApiKeys(prev => ({ ...prev, firecrawl: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your Firecrawl API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenRouter API Key
          </label>
          <input
            type="password"
            value={apiKeys.openrouter || ''}
            onChange={(e) => setApiKeys(prev => ({ ...prev, openrouter: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your OpenRouter API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Groq API Key
          </label>
          <input
            type="password"
            value={apiKeys.groq || ''}
            onChange={(e) => setApiKeys(prev => ({ ...prev, groq: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your Groq API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hugging Face API Key
          </label>
          <input
            type="password"
            value={apiKeys.huggingface || ''}
            onChange={(e) => setApiKeys(prev => ({ ...prev, huggingface: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your Hugging Face API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={apiKeys.openai || ''}
            onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your OpenAI API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Prompt
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter custom prompt for the LLM"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}