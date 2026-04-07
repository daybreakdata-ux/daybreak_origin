'use client'

import { useState, useEffect } from 'react'
import SearchForm from '@/components/SearchForm'
import ResultsDisplay from '@/components/ResultsDisplay'
import Settings from '@/components/Settings'

export default function Home() {
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('grok')

  useEffect(() => {
    const savedPrompt = localStorage.getItem('customPrompt')
    if (savedPrompt) {
      setCustomPrompt(savedPrompt)
    }
    const savedProvider = localStorage.getItem('selectedProvider')
    if (savedProvider) {
      setSelectedProvider(savedProvider)
    }
  }, [])

  const handleSearch = async (query: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, prompt: customPrompt || undefined, provider: selectedProvider }),
      })
      const data = await response.json()
      setResults(data.result)
    } catch (error) {
      console.error('Search failed:', error)
      setResults('Error occurred during search.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ORIGIN Social Intelligence</h1>
          <p className="text-lg text-gray-600">Deep internet search for comprehensive person information</p>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Settings
          </button>
        </header>

        {showSettings && <Settings customPrompt={customPrompt} setCustomPrompt={setCustomPrompt} selectedProvider={selectedProvider} setSelectedProvider={setSelectedProvider} />}

        <SearchForm onSearch={handleSearch} loading={loading} />
        <ResultsDisplay results={results} loading={loading} />
      </div>
    </div>
  )
}