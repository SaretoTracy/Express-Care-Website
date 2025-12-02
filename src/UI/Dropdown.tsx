
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ label, items, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 shadow-sm border transition"
      >
        {selected || label}
        <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition`} />
      </button>

      {open && (
        <div
          className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg border p-2 z-30 animate-fadeIn"
        >
          {items.map((item) => (
            <div
              key={item}
              onClick={() => { onSelect(item); setOpen(false); }}
              className={`px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selected === item ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
