import { useEffect, useState } from "react";
import { callAPI } from "../api/axiosInstance";

const medals = ["🥇", "🥈", "🥉"];

const LeaderboardTicker = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    callAPI('/backtest/leaderboard', 'GET')
      .then(response => {
        const top3 = response.leaderboard.sort((a, b) => b.total_return - a.total_return).slice(0, 3);
        setData(top3);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {data.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            <span className="text-blue-500">
              SABU
            </span>
            에서 검색된 최고의 분산투자는?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg scale-100 hover:scale-105 duration-300 transition-all"
              >
                {/* 메달 */}
                <div className="absolute -top-3 -left-3 bg-white border border-gray-300 rounded-full px-2 py-1 shadow text-lg">
                  <span className="sparkle-glow shine">{medals[i] || `#${i + 1}`}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.strategy.start_date} ~ {item.strategy.end_date}</p>
                </div>

                {/* 전략명 */}
                <div className="flex">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                    {item.strategy.strategy} 전략
                    {item.strategy.rebalance !== "none" && (
                      <span className="text-xs text-gray-500 ml-2">({item.strategy.rebalance} 리밸런싱)</span>
                    )}
                  </h3>
                </div>

                {/* 수익률 / MDD */}
                <div className="text-sm text-gray-700 mb-4 space-y-1">
                  <p>
                    📈 <span className="font-medium">수익률:</span>{" "}
                    <span className={`${item.total_return < 0 ? "text-red-500" : "text-green-600"} font-bold`}>
                      {item.total_return.toFixed(2) < 0 ? "" : "+"}{item.total_return.toFixed(2)}%
                    </span>
                  </p>
                  <p>
                    📉 <span className="font-medium">MDD:</span>{" "}
                    <span className="text-red-500 font-bold">
                      {item.strategy.max_drawdown.toFixed(2)}%
                    </span>
                  </p>
                </div>

                {/* 자산 구성 */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">📦 자산 구성</p>
                  <div className="flex flex-wrap gap-2">
                    {item.strategy.assets.map((asset, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {asset.ticker} ({(asset.weight * 100).toFixed(0)}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
};

export default LeaderboardTicker;
