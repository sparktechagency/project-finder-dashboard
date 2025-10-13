import { Label } from "@/components/ui/label";

const options = ["2024", "2025", "2026", "2027", "2028"];

interface Props {
  selectedYear: string | null;
  handleYearChange: (value: string) => void;
}

export default function SelectYear({ selectedYear, handleYearChange }: Props) {
  return (
    <div className="">
      <Label htmlFor="CompletionDate" className="mb-2 text-black">
        Completion Date
      </Label>
      <select
        value={selectedYear ?? ""}
        onChange={(e) => handleYearChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
