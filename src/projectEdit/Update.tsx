import { Label } from "@/components/ui/label";

export default function Update({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <div className="grid gap-3">
      <Label htmlFor="CompletionDate">Update Date</Label>

      <div className="grid gap-3">
        <input
          type="date"
          name="date"
          onChange={(e) => {
            const date = e.target.value;
            setSelectedDate(date || undefined);
          }}
          value={selectedDate || ""}
          style={{
            height: 45,
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
