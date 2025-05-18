import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { callAPI } from '../api/axiosInstance'


const colorClasses = [
  'text-red-400',
  'text-blue-400',
  'text-yellow-400',
  'text-green-400',
  'text-purple-400',
  'text-orange-400',
];

async function fetchClusterResult(ticker) {
  const res = await callAPI(`/search/ticker?query=${ticker}`, 'GET');
  return res.results
}

function SearchBox({ currentPath, onSearchSubmit, setCurrentPath }) {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const res = fetchClusterResult(query);
    res.then(data => {
      setSuggestions(data);
    });
  }, [query]);

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      const matches = suggestions.filter((item) =>
        item.NAME.toLowerCase().includes(value.toLowerCase()) ||
        item.SYMBOL.toLowerCase().includes(value.toLowerCase())
      )
      setFiltered(matches)
    } else {
      setFiltered([])
    }
  }

  const onSubmit = () => {
    if (query.length === 0) return
    const selectedStock = suggestions.find((item) => item.SYMBOL === query)

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
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-auto max-h-100">
            <li className="flex items-center justify-between px-4 py-3 border-b border-gray-300 text-sm text-gray-600 font-semibold bg-gray-50">
              <span className="w-24">클러스터</span>
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
                  setQuery(item.SYMBOL)
                  setFiltered([])
                }}
              >
                <span className={`w-24 font-semibold ${item.CLUSTER === null ? 'text-gray-500' : colorClasses[item.CLUSTER % colorClasses.length]} truncate`}>{`${item.CLUSTER === null ? 'NULL' : `Cluster ${item.CLUSTER}`}`}</span>
                <div className="flex-1 ml-2 truncate">
                  <span className="font-semibold">{item.SYMBOL}</span>
                  <span className="ml-5 w-25 text-gray-600">{item.NAME}</span>
                </div>
                <span className="w-20 text-gray-800">${parseFloat(item["LAST PRICE"].replace('$', '')).toFixed(2)}</span>
                <span className={`w-16 font-semibold ${item.DELTA === "up" ? 'text-green-600' : 'text-red-500'}`}>
                  {item.DELTA === "up" ? '+' : ''}
                  {parseFloat(item["% CHANGE"].replace('%', '')).toFixed(2)}%
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
