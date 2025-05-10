import React from 'react'
import { useState } from 'react'
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


  let position = 'top-2/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

  if (currentPath === '/setup') position = 'top-1/14 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  if (currentPath === '/loading') position = 'hidden'
  if (currentPath === '/result') position = 'hidden'

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      const matches = MOCK_SUGGESTIONS.filter((item) => (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase())
      ))
      setFiltered(matches)
    } else {
      setFiltered([])
    }
  }

  const onSubmit = () => {
    if (currentPath === '/setup') {
      const selectedStock = MOCK_SUGGESTIONS.find((item) => item.symbol === query)
      if (selectedStock) {
        onSearchSubmit(selectedStock)
        setQuery('')
        setFiltered([])
      }
    }
    if (currentPath === '/home') {
      const selectedStock = MOCK_SUGGESTIONS.find((item) => item.symbol === query)
      setCurrentPath('/setup')
      if (selectedStock) {
        onSearchSubmit(selectedStock)
      }
    }
  }

  return (
    <div className={`absolute w-full transition-all duration-700 ${position} z-10`}>
      <div className="max-w-3xl mx-auto px-4 mt-84 relative">
        <MagnifyingGlassIcon className="absolute left-7 bottom-3 w-7 h-7 text-gray-400" />
        <input
          type="text"
          placeholder="여기에 주식 코드를 입력해주세요!"
          onChange={handleChange}
          value={query}
          className="w-full px-6 py-3 text-lg text-center rounded-4xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        {filtered.length > 0 && (
          <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md z-10 overflow-hidden">
            <li className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
              {/* 섹터 */}
              <span className="font-semibold w-24 text-gray-500 truncate">섹터</span>

              {/* 티커 & 이름 */}
              <div className="flex-1 flex gap-4 ml-2">
                <span className="font-semibold">티커</span>
                <span className="ml-3 font-semibold text-gray-600">이름</span>
              </div>

              {/* 가격 */}
              <span className="w-20 font-semibold text-left text-gray-800">현재가</span>

              {/* 등락률 */}
              <span
                className={`w-16 font-semibold `}
              >
                등락률
              </span>
            </li>
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  setQuery(item.symbol)
                  setFiltered([])
                }}
              >
                {/* 섹터 */}
                <span className="text-sm text-gray-500 w-24 truncate">{item.sector}</span>

                {/* 티커 & 이름 */}
                <div className="flex-1 ml-2">
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="ml-5 text-gray-600">{item.name}</span>
                </div>

                {/* 가격 */}
                <span className="w-20 font-medium text-gray-800">${item.price.toFixed(2)}</span>

                {/* 등락률 */}
                <span
                  className={`w-16 font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.change.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onSubmit}
          className="absolute cursor-pointer right-7 top-1/2 -translate-y-1/2 bg-[#1C8598] hover:bg-[#00324D] text-white rounded-full p-2 transition-colors">
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default SearchBox
