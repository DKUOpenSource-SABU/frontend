import React, { useEffect, useState } from "react";

const dummyData = [
  {
  "total_return": 16.15723389730942,
  "strategy": {
    "strategy": "rsi",
    "rebalance": "quarterly",
    "initial_balance": 1000,
    "final_balance": 1161.5723389730942,
    "total_return": 16.15723389730942,
    "cagr": 0,
    "max_drawdown": 18.72,
    "assets": [
      {
        "ticker": "AAPL",
        "weight": 1
      }
    ]
  }
},{
  "total_return": 16.15723389730942,
  "strategy": {
    "strategy": "rsi",
    "rebalance": "quarterly",
    "initial_balance": 1000,
    "final_balance": 1161.5723389730942,
    "total_return": 16.15723389730942,
    "cagr": 0,
    "max_drawdown": 18.72,
    "assets": [
      {
        "ticker": "AAPL",
        "weight": 1
      }
    ]
  }
},{
  "total_return": 16.15723389730942,
  "strategy": {
    "strategy": "rsi",
    "rebalance": "quarterly",
    "initial_balance": 1000,
    "final_balance": 1161.5723389730942,
    "total_return": 16.15723389730942,
    "cagr": 0,
    "max_drawdown": 18.72,
    "assets": [
      {
        "ticker": "AAPL",
        "weight": 1
      }
    ]
  }
},{
  "total_return": 166.15723389730942,
  "strategy": {
    "strategy": "rsi",
    "rebalance": "quarterly",
    "initial_balance": 1000,
    "final_balance": 1161.5723389730942,
    "total_return": 16.15723389730942,
    "cagr": 0,
    "max_drawdown": 18.72,
    "assets": [
      {
        "ticker": "AAPL",
        "weight": 1
      },

      {
        "ticker": "AAPL",
        "weight": 1
      },

      {
        "ticker": "a",
        "weight": 1
      },

      {
        "ticker": "b",
        "weight": 1
      },

      {
        "ticker": "c",
        "weight": 1
      }
    ]
  }
},
  // 원하면 더 추가 가능
];

const medals = ["🥇", "🥈", "🥉"];

const LeaderboardTicker = ({ data = dummyData}) => {
  const top3 = [...data]
    .sort((a, b) => b.total_return - a.total_return)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {top3.map((item, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            {/* 메달 */}
            <div className="absolute -top-3 -left-3 bg-white border border-gray-300 rounded-full px-2 py-1 shadow text-lg">
              <span className="sparkle-glow shine">{medals[i] || `#${i + 1}`}</span>
            </div>

            {/* 전략명 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
              {item.strategy.strategy} 전략
            </h3>

            {/* 수익률 / MDD */}
            <div className="text-sm text-gray-700 mb-4 space-y-1">
              <p>
                📈 <span className="font-medium">수익률:</span>{" "}
                <span className="text-green-600 font-bold">
                  +{item.total_return.toFixed(2)}%
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
    </div>
  );
};

export default LeaderboardTicker;
