import StockTable from '../components/StockTable'

function Result() {
  const mockStocks = [
    { sector: '기술', symbol: 'AAPL', ratio: 20 },
    { sector: '에너지', symbol: 'XOM', ratio: 30 },
    { sector: '헬스케어', symbol: 'JNJ', ratio: 50 },
  ]
  return (
    <div className='relative min-h-screen px-6 py-20 max-w-5xl mx-auto mt-12 opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0'>
      <div className='flex flex-wrap justify-between '>
        <StockTable selectedStocks={mockStocks} />
        <div className='w-1/2'>
          <span className='text-lg font-semibold text-gray-700 py-1'>클러스터링</span>
        </div>
      </div>
    </div>
  );
}

export default Result