'use client'

import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface ResultsDisplayProps {
  results: string
  loading: boolean
}

export default function ResultsDisplay({ results, loading }: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <Loader2 className="animate-spin mx-auto mb-4" size={48} />
        <p className="text-lg text-gray-600">Searching the internet for information...</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-600">Enter a search query to get started.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{results}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}