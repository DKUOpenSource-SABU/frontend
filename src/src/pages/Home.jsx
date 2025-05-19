import SearchBox from '../components/SearchBox'
import { useState, useEffect } from 'react'
import { usePath } from '../contexts/PathContext'
import Setup from './Setup'
import ProgressBar from '../components/ProgressBar'
import Result from './Result'

function Home() {
  const [selectedStocks, setSelectedStocks] = useState([])
  const { currentPath, setCurrentPath } = usePath()
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      <SearchBox currentPath={currentPath} onSearchSubmit={handleAddStock} setCurrentPath={setCurrentPath} />
      {currentPath === '/setup' && <Setup selectedStocks={selectedStocks} setSelectedStocks={setSelectedStocks} />}
      {currentPath === '/loading' && <ProgressBar progress={progress} />}
      {currentPath === '/result' && <Result selectedStocks={selectedStocks} />}
    </div>
  );
}

export default Home;