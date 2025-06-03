import { useCluster } from "../contexts/ClusterContext";
import { Tab } from '@headlessui/react'
import Spinner from '../components/Spinner';
import ClusterChart from '../components/ClusterChart'
import SectorHeatmap from "./SectorHeatmap";
import { useEffect, useState } from "react";
import { callAPI } from "../api/axiosInstance";
import SectorScatterChart from "./SectorChart";

function ClusterView({ selectedStocks }) {

  const { data, ratio } = useCluster();
  const [sectorsData, setSectorsData] = useState(null);
  const [score, setScore] = useState(null);

  const [fullStars, setFullStars] = useState(0);
  const [emptyStars, setEmptyStars] = useState(0);



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    callAPI('/cluster/sectors', 'GET').then(response => {
      setSectorsData(response.sectors);
    }).catch(error => {
      console.error("Error fetching sector data:", error);
    });

  }, []);

  useEffect(() => {
    if (ratio.length < 2) {
      setScore(null);
      setFullStars(0);
      setEmptyStars(5);
      return ;
    }
    const fetchData = ratio.map((item) => {
      return {
        ticker: item.symbol,
        ratio: item.ratio
      }
    });
    callAPI('/cluster/score', 'POST',
      {
        ratios: fetchData
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.cluster_score) {
        setScore(response.cluster_score * 5);
        setFullStars(Math.floor(response.cluster_score * 5));
        setEmptyStars(5 - Math.floor(response.cluster_score * 5));
      }
    }).catch(error => {
      console.error("Error fetching cluster data:", error);
    });
  }, [ratio])
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-700 py-1">클러스터링 결과</span>
        <div className="flex items-center justify-end">
          {score === null ? (<div className="text-xs text-gray-400">2개 이상의 종목을 담으면 여기에 점수가 표시됩니다.</div>) : (
            <>
              <span className="text-gray-700 font-medium text-sm mr-1">클러스터링 점수</span>

              {/* 꽉 찬 별 */}
              {[...Array(fullStars)].map((_, i) => (
                <svg
                  key={`full-${i}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.454a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.538 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}

              {/* 빈 별 */}
              {[...Array(emptyStars)].map((_, i) => (
                <svg
                  key={`empty-${i}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-gray-300"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.454a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.538 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
              <span className="text-gray-700 font-medium text-sm ml-2">{score.toFixed(2)}</span>
            </>)}

        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow border border-gray-100">
          {['SABU 분석', '섹터 분석', '선택 현황'].map((label, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 text-black font-bold rounded-lg',
                  selected ? 'bg-blue-400 text-white shadow' : 'text-black hover:bg-white/[0.12] hover:text-blue-700'
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="w-full h-auto rounded-xl shadow-md scale-95 hover:scale-100 transition-all duration-300">
            {data ? <ClusterChart data={data} ratio={ratio} /> : <Spinner />}
          </Tab.Panel>
          <Tab.Panel className="w-full h-auto rounded-xl shadow-md scale-95 hover:scale-100 transition-all duration-300">
            {sectorsData ? <SectorScatterChart sectorData={sectorsData} /> : <Spinner />}
          </Tab.Panel>
          <Tab.Panel className="w-full h-auto rounded-xl shadow-md ">
            <SectorHeatmap selectedStocks={selectedStocks} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div >
  )
}

export default ClusterView;