const TableSkeleton = ({title}:{title:string})=> {
  const rows = Array(7).fill(0);
  const cols = 6;

  return (
    <div className="p-4 bg-background shadow rounded-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {/* Filter + Search */}
      <div className="flex justify-end items-center mb-4">
        {/* <div className="w-28 h-8 bg-gray-200 rounded animate-pulse" /> */}
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50 text-sm text-left font-medium h-10 text-gray-600">
              {Array.from({length:6}).map((head, i) => (
                <th key={i} className="px-4 py-2 animate-pulse w-10 bg-gray-200 "/>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-gray-100">
                {Array.from({ length: cols }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <div
                      className={`h-4 rounded bg-gray-200 animate-pulse ${
                        colIdx === 0 ? "w-3/4" : "w-2/3"
                      }`}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
