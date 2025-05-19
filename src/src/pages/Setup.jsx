
import { TrashIcon } from '@heroicons/react/24/solid'
import { usePath } from '../contexts/PathContext'
import ClusterChart from '../components/ClusterChart'
import { useEffect } from 'react';
import { callAPI } from '../api/axiosInstance'
import { useCluster } from '../contexts/ClusterContext'

const colorClasses = [
  'text-red-400',
  'text-blue-400',
  'text-yellow-400',
  'text-green-400',
  'text-purple-400',
  'text-orange-400',
];

function Setup({ selectedStocks, setSelectedStocks }) {
  const { setCurrentPath } = usePath()
  const { data, setData, ratio, updateRatio } = useCluster();

  useEffect(() => {
    callAPI('/cluster/analyze?pre=true', 'POST', {
      tickers: selectedStocks.map(stock => stock.SYMBOL)
    }).then((res) => {
      setData(res);
    }).catch((err) => {
      console.error('Error fetching cluster data:', err);
    });
  }, [selectedStocks]);
  return (
    <div className="opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0"> {/* 혹은 pt-[height]로 맞춰도 됨 */}
      <div className="w-full max-w-5xl mx-auto px-6">
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
        <div className='flex flex-wrap justify-between mx-auto mt-8 w-full'>
          <div className='flex flex-col mx-auto w-1/2'>
            <span className='text-lg font-semibold text-gray-700 py-1'>선택한 종목</span>
            <ul className="divide-y border border-gray-400 rounded-xl overflow-hidden mr-2">
              <li className="flex items-center justify-between px-4 py-3 border-gray-400 bg-gray-100 font-semibold text-gray-700">
                <span className="w-24">클러스터</span>
                <span className="flex-1">티커</span>
                <span className="w-24 text-right mr-10">비율 (%)</span>
                <span className="w-6" /> {/* 삭제 아이콘 공간 확보 */}
              </li>

              {selectedStocks.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center border-gray-200 justify-between px-4 py-3 hover:bg-blue-50"
                >
                  <span className={`text-sm font-semibold ${item.CLUSTER === null ? 'text-gray-500' : colorClasses[item.CLUSTER % colorClasses.length]} w-24 truncate`}>{`${item.CLUSTER === null ? 'NULL' : `Cluster ${item.CLUSTER}`}`}</span>
                  <span className="flex-1 font-semibold">{item.SYMBOL}</span>
                  <input
                    className="w-24 text-right mr-2 font-medium text-gray-800 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="ex) 20"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    onChange={(e) => {
                      const updatedValue = Number(e.target.value);
                      updateRatio(item.SYMBOL, updatedValue);
                    }}
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
          <div className='max-w-2xl w-1/2 flex flex-col mx-auto '>
            <span className='text-lg font-semibold text-gray-700 py-1'>클러스터링</span>
            <div className="w-full h-auto rounded-xl shadow-md scale-95 hover:scale-100 transition-all duration-300">
              {data && <ClusterChart data={data} ratio={ratio}/>}
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className="mx-auto mt-4 cursor-pointer translate-y-1/2 bg-[#1C8598] hover:bg-[#00324D] text-white rounded-xl px-10 py-2 transition-colors"
            onClick={() => {
              setCurrentPath('/loading')
            }}
          >
            백테스트
          </button>
        </div>
      </div>

    </div>
  )
}

export default Setup;