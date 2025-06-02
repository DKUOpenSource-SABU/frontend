import { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import clsx from 'clsx';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement);


export default function BacktestDashboard({ strategies }) {
  if (strategies) {
    strategies = strategies.sort((a, b) => b.total_return - a.total_return);
  }
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    initial_balance,
    final_balance,
    total_return,
    cagr,
    max_drawdown,
    portfolio_growth,
    drawdown_series,
    annual_returns,
    assets,
  } = strategies[selectedIndex];

  const annualData = {
    labels: Object.keys(annual_returns),
    datasets: [
      {
        label: '연간 수익률 (%)',
        data: Object.values(annual_returns),
        backgroundColor: Object.values(annual_returns).map(v =>
          v < 0 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(239, 68, 68, 0.7)'
        )
      },
    ],
  };

  const growthData = {
    labels: portfolio_growth.map(p => p.date),
    datasets: [
      {
        label: '포트폴리오 가치',
        data: portfolio_growth.map(p => p.value),
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        pointRadius: 2
      }
    ]
  };

  const drawdownData = {
    labels: drawdown_series.map(d => d.date),
    datasets: [
      {
        label: 'Drawdown (%)',
        data: drawdown_series.map(d => d.drawdown),
        fill: true,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3,
        pointRadius: 2
      }
    ]
  };


  const pieData = {
    labels: assets.map(a => a.ticker),
    datasets: [
      {
        label: '비중',
        data: assets.map(a => a.weight),
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171']
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: { size: 12 }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy'
          }
        },
        ticks: {
          color: '#4b5563',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4b5563',
          maxTicksLimit: 5,
          callback: value => `${value.toLocaleString()}`
        },
        grid: {
          display: false
        }
      }
    }
  };

  const annualChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: { size: 12 }
        },
        grid: {
          display: true
        }
      },
      y: {
        beginAtZero: true,
        maxTicksLimit: 4,
        ticks: {
          color: '#4b5563',
          callback: value => `${value}%`
        },
        grid: {
          display: true
        }
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className='font-bold text-2xl flex items-center gap-2'>
          <span className='mb-2'>투자 전략 선택</span>
          <div className="relative group ml-1 w-5 h-5 mb-6">
            <span data-tip data-for="strategyTooltip" className="cursor-pointer text-blue-500 text-base">ⓘ</span>
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              <div className='text-sm'>
                <p>BuyAndHold: 초기에 매수 후 보유만 하는 장기 전략</p>
                <p>SmaCross: 단기/장기 이동 평균선 교차로 매매 결정</p>
                <p>RSI: 과매수/과매도 여부를 기반으로 매매</p>
                <hr className='my-1' />
                <p>리밸런싱: 정기적으로 자산 비율을 재조정하는 작업</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto whitespace-nowrap bg-gray-100 px-4 py-6 rounded-xl">
          {strategies.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-48 px-4 py-3 rounded-xl text-sm font-medium shadow-md text-left transition-all overflow-visible
    ${i === selectedIndex ? 'bg-blue-400 text-white' : 'bg-white text-black'}`}
            >
              {/* 🥇 매달 왼쪽 상단에 고정 */}
              <div className="absolute -top-3 -left-3 flex flex-col items-center animate-drop-in">
                {/* 메달 */}
                <div
                  className={`rounded-full px-2 py-1 text-xs font-bold shadow-md border
        ${i === 0 ? 'bg-yellow-300 text-yellow-900 border-yellow-500' :
                      i === 1 ? 'bg-gray-300 text-gray-800 border-gray-500' :
                        i === 2 ? 'bg-amber-400 text-white border-amber-500' :
                          'bg-white text-black border-gray-300'}`}
                >
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </div>
              </div>

              <div className="mb-1">
                🧠 <span className="font-semibold">전략 :</span> {s.strategy.replace(/_/g, ' ')}
              </div>
              <div>
                🔄 <span className="font-semibold">리밸런싱 :</span> {s.rebalance}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="초기 자산" value={`$${parseInt(initial_balance).toLocaleString()}`} />
        <StatCard label="최종 자산" value={`$${parseInt(final_balance).toLocaleString()}`} />
        <StatCard label="총 수익률" value={`${parseFloat(total_return).toFixed(2)}%`} color={`${total_return < 0 ? 'red' : 'green'}`} tooltip="투자 기간 전체 수익률" />
        <StatCard label="CAGR" value={`${parseFloat(cagr).toFixed(2)}%`} tooltip="연평균 복리 수익률 (Compound Annual Growth Rate)" />
        <StatCard label="최대 낙폭" value={`${(parseFloat(max_drawdown) * -1).toFixed(2)}%`} color="red" tooltip="최대 손실 비율 (고점 대비 하락률)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartBox title="포트폴리오 성장">
          <Line data={growthData} options={chartOptions} />
        </ChartBox>
        <ChartBox title="최대 낙폭 (Drawdown)">
          <Line data={drawdownData} options={chartOptions} />
        </ChartBox>
      </div>

      <ChartBox title="연도별 수익률">
        <Bar data={annualData} height={100} options={annualChartOptions} />
      </ChartBox>

      <div className="grid md:grid-cols-2 gap-6">
        <ChartBox title="자산 비중">
          <Pie data={pieData} />
        </ChartBox>
        <div className="overflow-auto border rounded-xl">
          <table className="text-sm w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-2 py-2">종목</th>
                <th>기초가 ($)</th>
                <th>종가 ($)</th>
                <th>수익률</th>
                <th>기여도</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="font-bold text-gray-800 py-2">{a.ticker}</td>
                  <td>${parseFloat(a.start_price).toFixed(2)}</td>
                  <td>${parseFloat(a.end_price).toFixed(2)}</td>
                  <td className={`${parseInt(a.return_pct) < 0 ? 'text-red-600' : 'text-green-600'}`}>{parseFloat(a.return_pct).toFixed(2)}%</td>
                  <td>{parseFloat(a.contribution_pct).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

const COLOR_MAP = {
  blue: 'bg-blue-50 text-blue-800',
  red: 'bg-red-50 text-red-800',
  green: 'bg-green-50 text-green-800',
  yellow: 'bg-yellow-50 text-yellow-800',
  gray: 'bg-gray-50 text-gray-800',
};

function StatCard({ label, value, color = 'gray', tooltip }) {
  return (
    <div className={clsx('rounded-xl p-4 shadow-md relative', COLOR_MAP[color])}>
      <div className="text-sm font-semibold flex items-center">
        {label}
        {tooltip && (
          <div className="relative group ml-1 w-5 h-5 cursor-help">
            ⓘ
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="rounded-xl p-4 shadow-md border">
      <div className="text-md font-semibold text-gray-700 mb-2">{title}</div>
      {children}
    </div>
  );
}
