import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

export function EditSeeViews({
  seaViews = [],
  onChange,
  onAdd,
  onRemove,
}: {
  seaViews: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="qualitySpecification" className="mb-2">
          See Views
        </Label>
        <div onClick={onAdd} className="cursor-pointer">
          <Plus />
        </div>
      </div>

      {seaViews.length > 0 &&
        seaViews.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Input
              id={`${index}`}
              className="flex-1"
              value={feature}
              onChange={(e) => onChange(index, e.target.value)}
              required
            />
            <span className="cursor-pointer" onClick={() => onRemove(index)}>
              <Minus />
            </span>
          </div>
        ))}
    </div>
  );
}
