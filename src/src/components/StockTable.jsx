
function StockTable({ selectedStocks, ratio }) {
  const colorClasses = [
    'text-red-400',
    'text-blue-400',
    'text-yellow-400',
    'text-green-400',
    'text-purple-400',
    'text-orange-400',
  ];

  return (
    <div className='flex flex-col mx-auto w-1/2'>
      <span className='text-lg font-semibold text-gray-700 py-1'>선택한 종목</span>
      <ul className="divide-y border border-gray-400 rounded-xl overflow-hidden mr-2">
        <li className="flex items-center justify-between px-4 py-3 border-gray-400 bg-gray-100 font-semibold text-gray-700">
          <span className="w-24">섹터</span>
          <span className="flex-1">티커</span>
          <span className="w-24 text-right mr-10">비율 (%)</span>
        </li>

        {selectedStocks.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center border-gray-200 justify-between px-4 py-3 hover:bg-blue-50"
          >
            <span className={`text-sm font-semibold ${item.CLUSTER === null ? 'text-gray-500' : colorClasses[item.CLUSTER % colorClasses.length]} w-24 truncate`}>{`${item.CLUSTER === null ? 'NULL' : `Cluster ${item.CLUSTER}`}`}</span>
            <span className="flex-1 font-semibold">{item.SYMBOL}</span>
            <span className="w-24 text-right mr-2 font-medium text-gray-800 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">{ratio.filter(r => r.symbol === item.SYMBOL)[0]?.ratio} %</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StockTable
