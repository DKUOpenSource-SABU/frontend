import React from 'react';
import { useState, useEffect } from 'react';
import {
  getTickerDaily,
  getTickerWeekly,
  getTickerMonthly,
  getTickerAnnual,
  getTickerMeta,
  getTickerNews
} from '../api/ticker';
import StockChart from './StockData';
import Spinner from './Spinner';


function TickerDetail({ selectedStocks }) {
  const [activeTab, setActiveTab] = useState(selectedStocks[0]?.SYMBOL || '');
  const [loading, setLoading] = useState(true);

  const [tickerData, setTickerData] = useState({});

  useEffect(() => {
    const index = selectedStocks.length - 1;
    // selectedStocks가 비어있을 경우 index가 -1이 되어버림
    if (index < 0) return;
    setActiveTab(selectedStocks[index]?.SYMBOL);

    const fetchData = async () => {
      const symbol = selectedStocks[index]?.SYMBOL;
      if (!symbol) return;

      const [dailyRes, weeklyRes, monthlyRes, annualRes, metaRes, newsRes] = await Promise.allSettled([
        getTickerDaily(symbol),
        getTickerWeekly(symbol),
        getTickerMonthly(symbol),
        getTickerAnnual(symbol),
        getTickerMeta(symbol),
        getTickerNews(symbol)
      ]);

      const getValue = (res) => (res.status === 'fulfilled' ? res.value : null);

      const daily = getValue(dailyRes);
      const weekly = getValue(weeklyRes);
      const monthly = getValue(monthlyRes);
      const annual = getValue(annualRes);
      const meta = getValue(metaRes);
      const news = getValue(newsRes);

      setTickerData((prev) => ({
        ...prev,
        [symbol]: {
          daily,
          weekly,
          monthly,
          annual,
          meta,
          news,
          selectedChart: 'daily',
        },
      }));
    };

    const load = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    load();
  }, [selectedStocks]);

  // activeTab이 바뀌면 해당 데이터로 렌더링됨
  const currentData = tickerData[activeTab] || {};

  return (
    <div className="ticker-detail">
      <div className="flex gap-1 flex-wrap">
        {selectedStocks.map((stock) => (
          <button
            key={stock.SYMBOL}
            className={`${activeTab === stock.SYMBOL ? 'bg-blue-400 text-white hover:bg-blue-500' : 'hover:bg-gray-100'} shadow-sm border-gray-200 border rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors`}
            onClick={() => setActiveTab(stock.SYMBOL)}
          >
            {stock.SYMBOL}
          </button>
        ))}
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex-1 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            {/* 그래프 SVG 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 17V7m4 10V11m4 6V13m4 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            가격 그래프
          </h3>
          <div className="flex gap-2 mb-6 justify-between">
            <button
              className={`flex-1 px-3 py-1 rounded shadow-sm border-gray-50 font-semibold ${currentData.selectedChart === 'daily' ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-white hover:bg-gray-100'}`}
              onClick={() =>
                setTickerData(prev => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], selectedChart: 'daily' }
                }))
              }
            >
              일간 <span className='text-gray-600 text-xs'>(60일)</span>
            </button>
            <button
              className={`flex-1 px-3 py-1 rounded shadow-sm border-gray-50 font-semibold ${currentData.selectedChart === 'weekly' ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-white hover:bg-gray-100'}`}
              onClick={() =>
                setTickerData(prev => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], selectedChart: 'weekly' }
                }))
              }
            >
              주간 <span className='text-gray-600 text-xs'>(60주)</span>
            </button>
            <button
              className={`flex-1 px-3 py-1 rounded shadow-sm border-gray-50 font-semibold ${currentData.selectedChart === 'monthly' ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-white hover:bg-gray-100'}`}
              onClick={() =>
                setTickerData(prev => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], selectedChart: 'monthly' }
                }))
              }
            >
              월간 <span className='text-gray-600 text-xs'>(60개월)</span>
            </button>
            <button
              className={`${currentData.selectedChart === 'annual' ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-white hover:bg-gray-100'} flex-1 px-3 py-1 rounded shadow-sm border-gray-50 font-semibold`}
              onClick={() =>
                setTickerData(prev => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], selectedChart: 'annual' }
                }))
              }
            >
              연간 <span className='text-gray-600 text-xs'>(60년)</span>
            </button>
          </div>
          <div className="mb-4">
            <StockChart
              stockData={
                currentData[
                currentData.selectedChart ||
                'daily'
                ]
              }
            />
            <div className="flex justify-between mt-3">
              <span className="ml-auto text-xs text-gray-500">tiingoAPI & Chart.js</span>
            </div>
          </div>
        </div>
        <div className="flex-1 border border-gray-200 p-4 rounded min-h-96 ">
          <div className="h-1/2">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                {/* 기본 정보 SVG 아이콘 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
                기본 정보
              </h3>
              {currentData.meta ? (
                <div className='ml-auto flex flex-col'>
                  <div className='w-32 truncate'>
                    <strong>{currentData.meta.name} </strong>
                    <span className="text-gray-500">({currentData.meta.ticker})</span>
                  </div>
                  <div className='text-xs text-gray-700 mb-2'>
                    <strong>상장일 :</strong> {currentData.meta.startDate}
                  </div>
                </div>
              ) : (null)}
            </div>
            <hr className="flex-1 border-gray-300 mb-2" />
            {loading ? <Spinner /> : (
              <div>
                {currentData.meta && currentData.meta.description ? (
                  <div className="text-sm text-gray-700 mb-2">
                    <div className='max-h-24 overflow-auto'>
                      {currentData.meta.description}
                    </div>
                  </div>
                ) : <div className="flex justify-center text-base text-gray-500 mb-2">기본 정보가 없습니다...</div>}
              </div>
            )}
          </div>
          <div className='h-1/2'>
            <p className="text-sm text-gray-700"></p>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              {/* 왼쪽: 뉴스 아이콘 + 제목 */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                뉴스
              </div>

              {/* 오른쪽: 감정 통계 */}
              {currentData.news && currentData.news.sentiment_counts && (
                <div className="text-sm text-gray-700 space-x-2 flex items-center">
                  <span className="text-gray-500">총 {currentData.news.sentiment_counts.positive + currentData.news.sentiment_counts.neutral + currentData.news.sentiment_counts.negative}건</span>
                  <span className="text-green-600">🟢 {currentData.news.sentiment_counts.positive}</span>
                  <span className="text-gray-600">⚪️ {currentData.news.sentiment_counts.neutral}</span>
                  <span className="text-red-600">🔴 {currentData.news.sentiment_counts.negative}</span>
                </div>
              )}

            </h3>
            <hr className="flex-1 border-gray-300 mb-2" />
            <div className='mb-6'>
              {loading ? <Spinner /> : (
                <ul className="space-y-2 overflow-auto max-h-36 p-2">
                  {currentData && currentData.news && currentData.news.results && currentData.news.results.length > 0 ? (currentData.news.results).map((news, idx) => (
                    <li
                      key={idx}
                      className="text-sm shadow p-3 rounded-lg hover:bg-gray-50 cursor-default space-y-2"
                    >
                      <div>
                        <strong>{news.title}</strong>{' '}
                        <span className="text-gray-500">({news.source})</span>
                      </div>

                      <div
                        className={`w-fit px-2 py-1 rounded-md text-xs font-medium
                            ${news.sentiment === 'positive'
                            ? 'bg-green-50 text-green-700'
                            : news.sentiment === 'negative'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {news.sentiment === 'positive' && '🟢 긍정적인 뉴스예요!'}
                        {news.sentiment === 'neutral' && '⚪️ 중립적인 의견이에요.'}
                        {news.sentiment === 'negative' && '🔴 부정적인 의견이에요.'}
                      </div>
                    </li>


                  )) : <li className="flex justify-center text-base text-gray-500">뉴스가 없습니다...</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default TickerDetail;