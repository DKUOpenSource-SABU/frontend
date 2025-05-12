import StockTable from '../components/StockTable'

function Result() {
  const mockStocks = [
    { sector: '기술', symbol: 'AAPL', ratio: 20 },
    { sector: '에너지', symbol: 'XOM', ratio: 30 },
    { sector: '헬스케어', symbol: 'JNJ', ratio: 50 },
  ]
  return (
    <div className='max-w-5xl mx-auto opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0'>
      <h2 className='text-center text-3xl font-semibold text-gray-700 mb-8'>백테스트 결과</h2>
      <div className='flex flex-wrap justify-between '>
        <StockTable selectedStocks={mockStocks} />
        <div className='w-1/2'>
          <span className='text-lg font-semibold text-gray-700 py-1'>클러스터링</span>
          <img src="clustering.png" alt="클러스터링" className="w-full h-auto rounded-xl shadow-md scale-95 hover:scale-100 transition-all duration-300" />
          
        </div>
      </div>
    </div>
  );
}

export default Result