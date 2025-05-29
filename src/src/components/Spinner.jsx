function Spinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <svg className="w-10 h-10 animate-spin text-teal-400" viewBox="0 0 40 40" fill="none">
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="90"
          strokeDashoffset="60"
          strokeLinecap="round"
          className="opacity-30"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="90"
          strokeDashoffset="0"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default Spinner