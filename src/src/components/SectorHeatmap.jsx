
const ALL_SECTORS = [
  "Technology",
  "Telecommunications",
  "Health Care",
  "Finance",
  "Real Estate",
  "Consumer Discretionary",
  "Consumer Staples",
  "Industrials",
  "Basic Materials",
  "Energy",
  "Utilities",
  "ETF"
];

const SectorHeatmap = ({ selectedStocks = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {ALL_SECTORS.map((sector, idx) => {
        const isSelected = selectedStocks.some(stock => stock.SECTOR === sector);
        return (
          <div
            key={idx}
            className={`p-4 text-sm font-medium rounded-xl shadow-sm text-center scale-95 hover:scale-100 transition-all duration-300
    ${isSelected ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-500'}
    break-words leading-tight`}
            title={sector}
          >
            {sector}
          </div>

        );
      })}
    </div>
  );
};

export default SectorHeatmap;
