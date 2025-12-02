// components/CaregiverSidebarFilters.tsx
export default function CaregiverSidebarFilters({ filters, setFilters }) {
    return (
      <div className="w-64 bg-white rounded-2xl shadow p-6 border">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
  
        {/* Working Schedule */}
        <div className="space-y-3 mb-6">
          <h3 className="font-medium">Working schedule</h3>
          {["Full time", "Part time", "Live-in", "Respite care", "Overnight"].map(
            (type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.schedule.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        schedule: [...filters.schedule, type],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        schedule: filters.schedule.filter((t) => t !== type),
                      });
                    }
                  }}
                />
                {type}
              </label>
            )
          )}
        </div>
  
        {/* Employment Types */}
        <div className="space-y-3">
          <h3 className="font-medium">Employment type</h3>
          {["Long term", "Temporary", "Contract", "Per diem"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.employment.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      employment: [...filters.employment, type],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      employment: filters.employment.filter((t) => t !== type),
                    });
                  }
                }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    );
  }
  