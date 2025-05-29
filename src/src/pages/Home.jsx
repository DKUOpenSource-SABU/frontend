import SearchBox from '../components/SearchBox'
import { useState, useEffect } from 'react'
import { usePath } from '../contexts/PathContext'
import Setup from './Setup'
import ProgressBar from '../components/ProgressBar'
import Result from './Result'
import { useCluster } from '../contexts/ClusterContext'
import LeaderboardTicker from '../components/LeaderboardTicker'

function Home() {
  const [selectedStocks, setSelectedStocks] = useState([])
  const { currentPath, setCurrentPath } = usePath()
  const [progress, setProgress] = useState(0);
  const [backtestData, setBacktestData] = useState();
  const { setRatio, setData } = useCluster();

  useEffect(() => {
    if (currentPath === '/home') {
      setSelectedStocks([]);
      setRatio([]);
      setData(null);
      setProgress(0);
    }
    if (currentPath !== '/loading') {
      return;
    }
    if (progress >= 100) {
      setProgress(0);
      setCurrentPath('/result');
      return;
    }

    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + 20, 100));
    }, 1000); // 1초마다 10씩 증가

    return () => clearInterval(timer);
  }, [progress, currentPath]);

  const handleAddStock = (stock) => {
    if (!selectedStocks.find((s) => s.SYMBOL === stock.SYMBOL)) {
      setSelectedStocks([...selectedStocks, stock])
    }
  }

  return (
    <div className="">
      <SearchBox currentPath={currentPath} onSearchSubmit={handleAddStock} setCurrentPath={setCurrentPath}  selectedStock={selectedStocks}/>
      {currentPath === '/setup' && <Setup selectedStocks={selectedStocks} setSelectedStocks={setSelectedStocks} setBacktestData={setBacktestData} />}
      {currentPath === '/loading' && <ProgressBar progress={progress} />}
      {currentPath === '/result' && <Result selectedStocks={selectedStocks} backTestData={backtestData} />}
      {currentPath === '/home' && (
        <div className="flex flex-col items-center justify-center mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">현재 리더보드</h2>
          <LeaderboardTicker />
        </div>
      )}
    </div>
  );
}

export default Home;