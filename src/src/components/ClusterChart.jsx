import React from 'react';
import { Chart as ChartJS, Chart, BubbleController, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

import { Scatter } from 'react-chartjs-2';

ChartJS.register(BubbleController, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler);

const colorPalette = [
  'rgba(255, 99, 132, 0.6)',   // Red
  'rgba(54, 162, 235, 0.6)',   // Blue
  'rgba(255, 206, 86, 0.6)',   // Yellow
  'rgba(75, 192, 192, 0.6)',   // Green
  'rgba(153, 102, 255, 0.6)',  // Purple
  'rgba(255, 159, 64, 0.6)',   // Orange
  // 더 많은 색상 추가 가능
];

export default function ClusterChart({ data, ratio }) {
  // 1. 클러스터 윤곽선을 line+fill로 구성
  const clusterDatasets = data.hull_coords.map((cluster) => {
    let borderColor;
    let backgroundColor;
    let hull
    if (cluster.cluster < 0) {
      borderColor = 'rgba(128, 128, 128, 0.6)'; // 회색
      backgroundColor = 'rgba(128, 128, 128, 0.15)'; // 회색
      hull = [];
    } else {
      hull = [...cluster.hull_coords, cluster.hull_coords[0]]; // 닫힌 다각형
      borderColor = colorPalette[cluster.cluster % colorPalette.length]; // 팔레트 순환 사용
      backgroundColor = borderColor.replace(', 0.6)', ', 0.15)');
    }

    return {
      label: `Cluster ${cluster.cluster}`,
      type: 'line',
      data: hull,
      fill: true,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      pointRadius: 0,
      tension: 0.5,
      borderWidth: 5,
    };
  });

  // 2. 선택된 티커 점 (scatter)
  const clusterGroups = {};
  data.nodes.forEach(node => {
    const cluster = node.cluster ?? -1; // cluster가 null/undefined면 -1로 대체
    if (!clusterGroups[cluster]) {
      clusterGroups[cluster] = [];
    }
    clusterGroups[cluster].push({
      x: node.PC1,
      y: node.PC2,
      r: ratio.filter(r => r.symbol === node.ticker)[0]?.ratio === undefined ? 10 : ratio.filter(r => r.symbol === node.ticker)[0]?.ratio / 3,
      ticker: node.ticker
    });
  });
  const clusterHighlightDataset = Object.entries(clusterGroups).map(([cluster, points]) => {
    const clusterIdx = parseInt(cluster, 10);
    const color = colorPalette[clusterIdx % colorPalette.length] || 'gray';

    return {
      label: `Cluster ${cluster}`,
      type: 'bubble',
      data: points,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1
    };
  });

  const chartData = {
    datasets: [...clusterDatasets, ...clusterHighlightDataset]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => ctx.raw.ticker || `(${ctx.raw.x.toFixed(2)}, ${ctx.raw.y.toFixed(2)})`
        }
      },
      legend: {
        display: 'grid',
        position: 'top',
        labels: {
          boxWidth: 40,
          generateLabels: function (chart) {
            const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);

            return labels.sort((a, b) => {
              const getTypePriority = (type) => {
                if (type === 'line') return 0;
                if (type === 'scatter') return 1;
                return 2; // 기타 타입들
              };

              const aType = chart.data.datasets[a.datasetIndex].type || 'line';
              const bType = chart.data.datasets[b.datasetIndex].type || 'line';

              const typeCompare = getTypePriority(aType) - getTypePriority(bType);
              if (typeCompare !== 0) return typeCompare;

              // 같은 타입이면 이름순 정렬
              return a.text.localeCompare(b.text);
            });
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false }
      },
      y: {
        grid: { display: false },
        ticks: { display: false }
      }
    }
  };

  return <Scatter data={chartData} options={options} height={200} width={200} />;
}

