import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const MONTHS = [
  "01월", "02월", "03월", "04월", "05월", "06월",
  "07월", "08월", "09월", "10월", "11월", "12월"
];

export default function MonthPicker({ label = "📅 월 선택", value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const handleSelect = (monthIndex) => {
    const newDate = new Date(year, monthIndex, 1);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setSelectedDate(newDate);
    onChange?.(formatted);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
      <Popover className="relative">
        <Popover.Button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-between">
          <span>{format(selectedDate, "yyyy년 MM월")}</span>
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </Popover.Button>
        <Popover.Panel className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setYear(year - 1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-800">{year}년</span>
            <button
              onClick={() => setYear(year + 1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`py-2 rounded-md text-sm font-medium transition-all ${selectedDate.getFullYear() === year && selectedDate.getMonth() === idx
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      className="h-5 w-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
