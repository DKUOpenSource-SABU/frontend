import React, { use, useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { callAPI } from '../api/axiosInstance'
import ClusterFilter from './ClusterFilter'


const colorClasses = [
  'text-red-400',
  'text-blue-400',
  'text-yellow-400',
  'text-green-400',
  'text-purple-400',
  'text-orange-400',
];


function SearchBox({ currentPath, onSearchSubmit, setCurrentPath, selectedStock }) {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selectedClusters, setSelectedClusters] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recommended, setRecommended] = useState([]);
  const debounceTimeout = useRef(null);
  const isManualSelection = useRef(false);

  const uniqueFiltered = filtered.filter(
    item => !recommended.some(rec => rec.SYMBOL === item.SYMBOL)
  );
  const finalList = [...recommended, ...uniqueFiltered];

  const fetchClusterResult = async (ticker) => {
    try {
      const res = await callAPI(`/search/ticker?query=${ticker}`, 'POST',
        JSON.stringify({
          clusters: selectedClusters.length > 0 ? selectedClusters : undefined
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return res.results
    }
    catch (error) {
      console.error('Error fetching cluster result:', error);
      return [];
    }
  }

  const fetchRecommended = async () => {
    try {
      const res = await callAPI('/cluster/recommend', 'POST', JSON.stringify({
        tickers : selectedStock.map((item) => item.SYMBOL)
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res;
    } catch (error) {
      console.error('Error fetching recommended stocks:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchRecommended().then((res) => {
      console.log('Recommended stocks fetched:', res);
      setRecommended(res);
    });
  }, [selectedStock]);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    fetchClusterResult(debouncedQuery).then(setSuggestions);
  }, [debouncedQuery, selectedClusters]);

  useEffect(() => {
    if (isManualSelection.current) {
      isManualSelection.current = false;
      return;
    }
    if (query.length > 0) {
      const matches = suggestions.filter((item) =>
        item.NAME.toLowerCase().includes(query.toLowerCase()) ||
        item.SYMBOL.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(matches);
    } else {
      setFiltered([]);
    }
  }, [suggestions, query]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 100);
  };

  const onSubmit = () => {
    isManualSelection.current = false;
    console.log('onSubmit called with query:', query)
    console.log('currentPath:', currentPath)
    if (query.length === 0) return
    const selectedStock = suggestions.find((item) => item.SYMBOL === query) || recommended.find((item) => item.SYMBOL === query)

    if (currentPath === '/setup' || currentPath === '/home') {
      console.log('Submitting stock:', selectedStock)
      if (selectedStock) {
        setQuery('')
        onSearchSubmit(selectedStock)
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
          {currentPath === '/setup' && (
            <div className='ml-4 mb-1 flex'>
              <ClusterFilter onFilterChange={setSelectedClusters} />
            </div>
          )}
          <MagnifyingGlassIcon className="absolute left-4 mt-3.5 transform w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="여기에 주식 코드를 입력해주세요!"
            onChange={handleChange}
            value={query}
            className="w-full pl-12 pr-12 py-3 text-lg text-center rounded-4xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={onSubmit}
            className="absolute right-3 mt-2 transform  bg-[#1C8598] hover:bg-[#00324D] text-white rounded-full p-2 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>

        {!isManualSelection.current && query.length > 0 && finalList.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-auto max-h-100">
              {/* 헤더 */}
              <li className="flex items-center justify-between px-4 py-3 border-b border-gray-300 text-sm text-gray-600 font-semibold bg-gray-50 sticky top-0 z-20">
                <span className="w-24">섹터</span>
                <span className="w-24">클러스터</span>
                <div className="flex-1 flex gap-4 ml-2">
                  <span>티커</span>
                  <span className="ml-3">이름</span>
                </div>
                <span className="w-20">현재가</span>
                <span className="w-16">등락률</span>
              </li>

              {/* 추천 섹션 라벨 */}
              <li className="px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 z-10">
                🔥 SABU 추천 종목
              </li>
              {recommended.map((item, idx) => (
                <li
                  key={`rec-${idx}`}
                  className="flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => {
                    isManualSelection.current = true;
                    setQuery(item.SYMBOL);
                    setFiltered([]);
                  }}
                >
                  <span className="w-24 truncate font-base text-xs text-gray-600">{item.SECTOR}</span>
                  <span className={`w-24 font-semibold ${item.CLUSTER === null ? 'text-gray-500' : colorClasses[item.CLUSTER % colorClasses.length]} truncate`}>
                    {item.CLUSTER === null ? 'NULL' : `Cluster ${item.CLUSTER}`}
                  </span>
                  <div className="flex-1 ml-2 truncate">
                    <span className="sparkle-glow font-semibold">{item.SYMBOL}</span>
                    <span className="ml-5 w-25 text-gray-600">{item.NAME}</span>
                  </div>
                  <span className="w-20 text-gray-800">${parseFloat(item["LAST PRICE"].replace('$', '')).toFixed(2)}</span>
                  <span className={`w-16 font-semibold ${parseFloat(item["% CHANGE"].replace('%', '')) === 0 ? 'text-gray-600' :
                    parseFloat(item["% CHANGE"].replace('%', '')) > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {parseFloat(item["% CHANGE"].replace('%', '')).toFixed(2)}%
                  </span>
                </li>
              ))}

              {/* 검색 결과 라벨 */}
              {uniqueFiltered.length > 0 && (
                <li className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 z-10">
                  🔍 검색 결과
                </li>
              )}
              {uniqueFiltered.map((item, idx) => (
                <li
                  key={`filtered-${idx}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm"
                  onClick={() => {
                    isManualSelection.current = true;
                    setQuery(item.SYMBOL);
                    setFiltered([]);
                  }}
                >
                  <span className="w-24 truncate font-base text-xs text-gray-600">{item.SECTOR}</span>
                  <span className={`w-24 font-semibold ${item.CLUSTER === null ? 'text-gray-500' : colorClasses[item.CLUSTER % colorClasses.length]} truncate`}>
                    {item.CLUSTER === null ? 'NULL' : `Cluster ${item.CLUSTER}`}
                  </span>
                  <div className="flex-1 ml-2 truncate">
                    <span className="font-semibold">{item.SYMBOL}</span>
                    <span className="ml-5 w-25 text-gray-600">{item.NAME}</span>
                  </div>
                  <span className="w-20 text-gray-800">${parseFloat(item["LAST PRICE"].replace('$', '')).toFixed(2)}</span>
                  <span className={`w-16 font-semibold ${parseFloat(item["% CHANGE"].replace('%', '')) === 0 ? 'text-gray-600' :
                    parseFloat(item["% CHANGE"].replace('%', '')) > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {parseFloat(item["% CHANGE"].replace('%', '')).toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          )
        }

      </div>
    </div>
  )
}

export default SearchBox
