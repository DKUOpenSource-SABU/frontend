
import { TrashIcon } from '@heroicons/react/24/solid'
import { usePath } from '../contexts/PathContext'

function Setup({selectedStocks, setSelectedStocks}) {
  const { setCurrentPath } = usePath()
  return (
    <div className="mt-54 opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0"> {/* 혹은 pt-[height]로 맞춰도 됨 */}
      <div className="w-full max-w-4xl mx-auto px-6">
        <h2 className="text-xl font-semibold mb-4">백테스트 설정</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작 날짜</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">종료 날짜</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">초기 자본 ($)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ex) 10000"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">수수료 (%)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ex) 0.1"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center max-w-4xl mx-auto mt-8 min-h-[40vh]'>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold text-gray-700 py-1'>선택한 종목</span>
          <ul className="max-w-2xl divide-y border border-gray-400 rounded-xl overflow-hidden min-w-md">
            <li className="flex items-center justify-between px-4 py-3 border-gray-400 bg-gray-100 font-semibold text-gray-700">
              <span className="w-24">섹터</span>
              <span className="flex-1">티커</span>
              <span className="w-24 text-right mr-10">비율 (%)</span>
              <span className="w-6" /> {/* 삭제 아이콘 공간 확보 */}
            </li>

            {selectedStocks.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center border-gray-200 justify-between px-4 py-3 hover:bg-blue-50"
              >
                <span className="text-sm text-gray-500 w-24 truncate">{item.sector}</span>
                <span className="flex-1 font-semibold">{item.symbol}</span>
                <input
                  className="w-24 text-right mr-2 font-medium text-gray-800 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="ex) 20"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                />
                %

                {/* 삭제 버튼 */}
                <button
                  onClick={() => {
                    setSelectedStocks((prev) => prev.filter((_, i) => i !== idx))
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='max-w-2xl w-1/2 flex flex-col'>
          <span className='text-lg ml-10 font-semibold text-gray-700 py-1'>클러스터링</span>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          className="mx-auto mt-4 cursor-pointer translate-y-1/2 bg-[#1C8598] hover:bg-[#00324D] text-white rounded-xl px-10 py-2 transition-colors"
          onClick={() => {
            setCurrentPath('/result')
          }}
        >
          백테스트
        </button>
      </div>

    </div>
  )
}

export default Setup;