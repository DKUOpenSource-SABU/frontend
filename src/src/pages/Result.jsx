import StockTable from '../components/StockTable'
import { useCluster } from '../contexts/ClusterContext'
import ClusterView from '../components/ClusterView';
import BacktestDashboard from '../components/BacktestDashboard';

function Result({ selectedStocks }) {

  const { data, ratio } = useCluster();

  return (
    <div className='max-w-5xl mx-auto opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0'>
      <h2 className='text-center text-3xl font-semibold text-gray-700 mb-8'>백테스트 결과</h2>
      <div className='flex flex-wrap justify-between '>
        <StockTable selectedStocks={selectedStocks} ratio={ratio} />
        <div className='w-1/2'>
          <ClusterView selectedStocks={selectedStocks}/>
        </div>
      </div>
      <BacktestDashboard />
    </div>
  );
}



export default Result