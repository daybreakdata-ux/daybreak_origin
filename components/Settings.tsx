'use client'

import { useState } from 'react'

interface SettingsProps {
  customPrompt: string
  setCustomPrompt: (prompt: string) => void
}

export default function Settings({ customPrompt, setCustomPrompt }: SettingsProps) {
  const [apiKeys, setApiKeys] = useState({
    grok: '',
    firecrawl: '',
  })

  const handleSave = () => {
    // In a real app, save to localStorage or send to backend
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
    localStorage.setItem('customPrompt', customPrompt)
    alert('Settings saved!')
  }

  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-6">
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