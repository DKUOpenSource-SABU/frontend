import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title); // 👈 등록

const SectorScatterChart = ({ sectorData }) => {
  const colors = [
  '#FFB3BA', // 연핑크
  '#FFDFBA', // 연살구
  '#FFFFBA', // 연노랑
  '#BAFFC9', // 연민트
  '#BAE1FF', // 연하늘
  '#D7BAFF', // 연보라
  '#FFC8DD', // 파스텔 핑크
  '#C1FFD7', // 파스텔 민트
  '#FFD6A5', // 파스텔 오렌지
  '#A0C4FF', // 파스텔 블루
  '#B5EAD7'  // 파스텔 그린
];
  const data = {
    datasets: sectorData.map((s, i) => ({
      label: s.sector,
      data: [{ x: s.PC1, y: s.PC2, sector: s.sector }],
      backgroundColor: colors[i % colors.length],
      pointRadius: 25,
      pointHoverRadius: 30
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const point = context.raw;
            return `${point.sector}`;
          }
        }
      },
      legend: {
        display: false
      },
      datalabels: {
        align: 'center',
        anchor: 'center',
        color: 'gray',
        font: {
          weight: 'bold',
          size: 9
        },
        formatter: function (value) {
          return value.sector;
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          display: false
        },
      }
    }
  };

  return (
    <Scatter data={data} options={options} height={300} width={300} plugins={[ChartDataLabels]} />
  );
};

export default SectorScatterChart;
