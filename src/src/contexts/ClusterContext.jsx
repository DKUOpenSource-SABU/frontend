import { createContext, useContext, useState } from 'react';

const ClusterContext = createContext();

export function ClusterProvider({ children }) {
  const [data, setData] = useState(null);
  const [ratio, setRatio] = useState([]);

  const updateRatio = (symbol, newRatio) => {
    setRatio(prev => {
      const idx = prev.findIndex(r => r.symbol === symbol);
      if (idx === -1) {
        return [...prev, { symbol, ratio: newRatio }];
      } else {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ratio: newRatio };
        return updated;
      }
    });
  };

  return (
    <ClusterContext.Provider value={{ data, setData, ratio, setRatio, updateRatio }}>
      {children}
    </ClusterContext.Provider>
  );
}

export function useCluster() {
  const context = useContext(ClusterContext);
  if (!context) {
    throw new Error('useCluster must be used within a ClusterProvider');
  }
  return context;
}
