import SearchBox from '../components/SearchBox'
import { useState, useEffect } from 'react'
import { usePath } from '../contexts/PathContext'
import Setup from './Setup'
import ProgressBar from '../components/ProgressBar'

function Home() {
  const [selectedStocks, setSelectedStocks] = useState([])
  const { currentPath, setCurrentPath } = usePath()
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return;

    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + 40, 100));
    }, 3000); // 1초마다 10씩 증가

    return () => clearInterval(timer);
  }, [progress]);

  const handleAddStock = (stock) => {
    if (!selectedStocks.find((s) => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock])
    }
  }

  return (
    <div className="relative min-h-screen px-6 py-20">
      <SearchBox currentPath={currentPath} onSearchSubmit={handleAddStock} setCurrentPath={setCurrentPath} />
      {currentPath === '/setup' && <Setup selectedStocks={selectedStocks} setSelectedStocks={setSelectedStocks} />}
      {currentPath === '/loading' && <ProgressBar progress={progress}/>}
      {currentPath === '/result'}
    </div>
  );
}

export default Home;