import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

const MOCK_SUGGESTIONS = [
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    price: 439.87,
    change: +0.42,
    sector: 'ETF'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 181.52,
    change: +1.12,
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 171.23,
    change: -2.35,
    sector: 'Automotive'
  }
]

function SearchBox({ currentPath, onSearchSubmit, setCurrentPath }) {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      const matches = MOCK_SUGGESTIONS.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase())
      )
      setFiltered(matches)
    } else {
      setFiltered([])
    }
  }

  const onSubmit = () => {
    if (query.length === 0) return
    const selectedStock = MOCK_SUGGESTIONS.find((item) => item.symbol === query)

    if (currentPath === '/setup' || currentPath === '/home') {
      if (selectedStock) {
        onSearchSubmit(selectedStock)
        setQuery('')
        setFiltered([])
        if (currentPath === '/home') setCurrentPath('/setup')
      }
    }
  }

  // `/loading` 또는 `/result`일 때는 아무것도 렌더링하지 않음
  if (currentPath === '/loading' || currentPath === '/result') return null

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-3xl mx-auto relative">
        {currentPath === '/home' && (
          <p className="text-center text-2xl font-bold mb-6">
            당신의 분산투자, 이제 <span className="text-blue-500">SABU</span>와 함께 시작해보세요.
          </p>
        )}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="여기에 주식 코드를 입력해주세요!"
            onChange={handleChange}
            value={query}
            className="w-full pl-12 pr-12 py-3 text-lg text-center rounded-4xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={onSubmit}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#1C8598] hover:bg-[#00324D] text-white rounded-full p-2 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>

        {filtered.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
            <li className="flex items-center justify-between px-4 py-3 border-b border-gray-300 text-sm text-gray-600 font-semibold bg-gray-50">
              <span className="w-24">섹터</span>
              <div className="flex-1 flex gap-4 ml-2">
                <span>티커</span>
                <span className="ml-3">이름</span>
              </div>
              <span className="w-20">현재가</span>
              <span className="w-16">등락률</span>
            </li>
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => {
                  setQuery(item.symbol)
                  setFiltered([])
                }}
              >
                <span className="w-24 text-gray-500 truncate">{item.sector}</span>
                <div className="flex-1 ml-2">
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="ml-5 text-gray-600">{item.name}</span>
                </div>
                <span className="w-20 text-gray-800">${item.price.toFixed(2)}</span>
                <span className={`w-16 font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {item.change > 0 ? '+' : ''}
                  {item.change.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchBox
