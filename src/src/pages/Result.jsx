import StockTable from '../components/StockTable'
import { useCluster } from '../contexts/ClusterContext'
import ClusterChart from '../components/ClusterChart';

function Result({selectedStocks}) {

  const { data, ratio } = useCluster();
  return (
    <div className='max-w-5xl mx-auto opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0'>
      <h2 className='text-center text-3xl font-semibold text-gray-700 mb-8'>백테스트 결과</h2>
      <div className='flex flex-wrap justify-between '>
        <StockTable selectedStocks={selectedStocks} ratio={ratio} />
        <div className='w-1/2'>
          <span className='text-lg font-semibold text-gray-700 py-1'>클러스터링</span>
          {data && <ClusterChart data={data} ratio={ratio}/>}          
        </div>
      </div>
    </div>
  );
}

export default Result