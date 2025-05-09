import SearchBox from '../components/SearchBox'
import { useState } from 'react'
import { usePath } from '../contexts/PathContext'
import Setup from './Setup'

function Home() {
  const [selectedStocks, setSelectedStocks] = useState([])
  const { currentPath, setCurrentPath } = usePath()

  const handleAddStock = (stock) => {
    if (!selectedStocks.find((s) => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock])
    }
  }

  return (
    <div className="relative min-h-screen px-6 py-20">
      <SearchBox currentPath={currentPath} onSearchSubmit={handleAddStock} setCurrentPath={setCurrentPath} />
      {currentPath === '/setup' && <Setup selectedStocks={selectedStocks} setSelectedStocks={setSelectedStocks} />}

    </div>
  );
}

export default Home;