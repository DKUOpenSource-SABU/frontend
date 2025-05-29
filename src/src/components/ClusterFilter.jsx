import React, { useState, useEffect } from 'react';

const colorClasses = [
  'bg-red-400',
  'bg-blue-400',
  'bg-yellow-400',
  'bg-green-400',
  // 'bg-purple-400',
  // 'bg-orange-400',
];

const ClusterFilter = ({ onFilterChange }) => {
  const [selectedClusters, setSelectedClusters] = useState(['ALL']);

  const toggleCluster = (cluster) => {
    if (cluster === 'ALL') {
      setSelectedClusters(['ALL']);
    } else {
      const isSelected = selectedClusters.includes(cluster);
      const updated = isSelected
        ? selectedClusters.filter((c) => c !== cluster)
        : [...selectedClusters.filter((c) => c !== 'ALL'), cluster];

      setSelectedClusters(updated.length === 0 ? ['ALL'] : updated);
    }
  };

  useEffect(() => {
    onFilterChange(selectedClusters.includes('ALL') ? [] : selectedClusters);
  }, [selectedClusters]);

  return (
    <div className='flex gap-2 flex-wrap ml-4 mb-2'>
      <div
        onClick={() => toggleCluster('ALL')}
        className={`px-2 rounded-lg shadow flex items-center cursor-pointer hover:scale-105 transition-all ${
          selectedClusters.includes('ALL') ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        <span className='text-xs py-1 font-semibold'>전체</span>
      </div>
      {colorClasses.map((color, idx) => (
        <div
          key={idx}
          onClick={() => toggleCluster(idx)}
          className={`px-2 rounded-lg shadow flex items-center cursor-pointer hover:scale-105 transition-all ${
            selectedClusters.includes(idx) ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <div className={`w-2 h-2 ${color} rounded-full mr-1`}></div>
          <span className='text-xs py-0.5 font-semibold'>{`Cluster ${idx}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ClusterFilter;
