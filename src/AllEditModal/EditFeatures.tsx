import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditFeatures({ features = {}, onChange }: any) {
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="qualitySpecification" className="mb-2">
          Features
        </Label>
      </div>

      {Object.entries(features).map(([key, feature]) => {
        return (
          <div key={key} className="flex items-center gap-2 mb-2">
            <Input
              id={`${key}`}
              className="flex-1"
              value={String(feature)}
              onChange={(e) => onChange && onChange(key, e.target.value)}
              required
            />
          </div>
        );
      })}
    </div>
  );
}
