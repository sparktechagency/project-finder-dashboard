import { completionYear } from "@/components/layout/shared/AllName";

const YearMultiSelect = ({
  selectedYears,
  setSelectedYears,
}: {
  selectedYears: string[];
  setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Completion Years
      </label>
      <div className="grid grid-cols-8 gap-3 mb-3">
        {completionYear?.map((item: any) => (
          <label
            key={item.value}
            className="flex items-center space-x-2 bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              value={item.value}
              checked={selectedYears.includes(item.value)}
              onChange={() => toggleYear(item.value)}
              className="accent-blue-600"
            />
            <span className="text-gray-800">{item.title}</span>
          </label>
        ))}
      </div>

      {/* <div className="my-3 text-sm text-gray-600">
        Selected: {selectedYears.join(", ") || "None"}
      </div> */}
    </div>
  );
};

export default YearMultiSelect;
