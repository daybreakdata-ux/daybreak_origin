'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchFormProps {
  onSearch: (query: string) => void
  loading: boolean
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let searchQuery = query
    if (!searchQuery) {
      searchQuery = [name, location, phone].filter(Boolean).join(' ')
    }
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Search Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State or Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <div className="text-center text-gray-500">or</div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Query</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter custom search query..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading || (![name, location, phone, query].some(Boolean))}
        className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <Search size={20} />
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}