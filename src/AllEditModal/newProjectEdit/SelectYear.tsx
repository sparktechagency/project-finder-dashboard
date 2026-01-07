// import { Label } from "@/components/ui/label";

// const options = ["2024", "2025", "2026", "2027", "2028"];

// interface Props {
//   selectedYear: string | null;
//   handleYearChange: (value: string) => void;
// }

// export default function SelectYear({ selectedYear, handleYearChange }: Props) {
//   return (
//     <div className="">
//       <Label htmlFor="CompletionDate" className="mb-2 text-black">
//         Completion Date
//       </Label>
//       <select
//         value={selectedYear ?? ""}
//         onChange={(e) => handleYearChange(e.target.value)}
//         className="w-full border border-gray-300 rounded-md px-3 py-1"
//       >
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { completionYear } from "@/components/layout/shared/AllName";

const YearMultiSelect = ({
  selectedYears,
  setSelectedYears,
}: {
  selectedYears: any;
  setSelectedYears: any;
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
      <div className="grid grid-cols-6 gap-3 mb-3">
        {completionYear?.map((item: any, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              value={item.value}
              checked={selectedYears?.includes(item.value)}
              onChange={() => toggleYear(item.value)}
              className="accent-blue-600"
            />
            <span className="text-gray-800">{item.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default YearMultiSelect;
