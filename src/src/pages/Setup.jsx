
import { TrashIcon } from '@heroicons/react/24/solid'
import { usePath } from '../contexts/PathContext'
import ClusterChart from '../components/ClusterChart'
import { useEffect, useState } from 'react';
import { callAPI } from '../api/axiosInstance'
import { useCluster } from '../contexts/ClusterContext'
import TickerDetail from '../components/TickerDetail';
import Spinner from '../components/Spinner';

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
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    initialCapital: '',
    commission: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.startDate || !formData.endDate || !formData.initialCapital || !formData.commission) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('시작 날짜는 종료 날짜보다 이전이어야 합니다.');
      return;
    }
    if (selectedStocks.length === 0) {
      alert('종목을 선택해주세요.');
      return;
    }
    const totalRatio = ratio.reduce((sum, r) => sum + Number(r.ratio), 0);
    if (ratio.some(r => Number(r.ratio) === 0)) {
      alert('비율이 0인 종목은 선택할 수 없습니다.');
      return;
    }
    if (totalRatio !== 100) {
      alert('비율의 합이 100이 되어야 합니다.');
      return;
    }
    try {
      // API 호출
      setCurrentPath('/loading');
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };


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
        <TickerDetail selectedStocks={selectedStocks} />
        <div className='flex flex-wrap justify-between mx-auto mt-8 w-full '>
          <div className='flex flex-col mx-auto w-1/2'>
            <span className='text-lg font-semibold text-gray-700 py-1'>선택한 종목</span>
            <ul className="divide-y border border-gray-400 rounded-xl overflow-hidden mr-2">
              <li className="flex items-center justify-between px-4 py-3 border-gray-400 bg-gray-100 font-semibold text-gray-700">
                <span className="w-24">섹터</span>
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
                  <span className='w-24 font-base text-xs text-gray-600'>{item.SECTOR}</span>
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
          <div className='max-w-2xl w-1/2 flex flex-col p-2'>
            <span className='text-lg font-semibold text-gray-700 py-1'>클러스터링</span>
            <div className="w-full h-auto rounded-xl shadow-md scale-95 hover:scale-100 transition-all duration-300">
              {data ? <ClusterChart data={data} ratio={ratio} /> : <Spinner />}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">백테스트 설정</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작 날짜</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">종료 날짜</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">초기 자본 ($)</label>
            <input
              type="number"
              name="initialCapital"
              value={formData.initialCapital}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ex) 10000"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">수수료 (%)</label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ex) 0.1"
              step="0.01"
              max={100}
            />
          </div>
        </div>
        <div className='flex justify-center mb-10'>
          <button
            className="mx-auto mt-4 cursor-pointer translate-y-1/2 bg-[#1C8598] hover:bg-[#00324D] text-white rounded-xl px-10 py-2 transition-colors"
            onClick={() => {
              handleSubmit();
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