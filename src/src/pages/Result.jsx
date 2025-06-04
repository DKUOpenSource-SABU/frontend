import StockTable from '../components/StockTable'
import { useCluster } from '../contexts/ClusterContext'
import ClusterView from '../components/ClusterView';
import BacktestDashboard from '../components/BacktestDashboard';

function Result({ selectedStocks, backTestData }) {

  const { ratio } = useCluster();
  console.log(backTestData);

  return (
    <div className='max-w-5xl mx-auto opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] z-0'>
      <h2 className='text-center text-3xl font-semibold text-gray-700 mb-8'>백테스트 결과</h2>
      { backTestData && backTestData.length > 0 && (
        <div className='text-center text-gray-500 -mt-3 mb-8'>
        기간: {backTestData[0].start_date} ~ {backTestData[0].end_date}
        </div>
      )}
      <div className='flex flex-wrap justify-between '>
        <StockTable selectedStocks={selectedStocks} ratio={ratio} />
        <div className='w-1/2'>
          <ClusterView selectedStocks={selectedStocks} />
        </div>
      </div>
      <BacktestDashboard strategies={backTestData} />
    </div>
  );
}



export default Result