import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineMinus } from "react-icons/hi";

interface SeaViewProps {
  specs: { [key: string]: string };
  onChange: (key: string, value: string) => void;
  onAdd: () => void;
  onRemove: (key: string) => void;
  title: string;
}

const SeaView = ({ specs, onChange, onAdd, onRemove, title }: SeaViewProps) => {
  const placeholderMap: { [key: string]: string } = {};

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="qualitySpecification" className="mb-2">
          {title}
        </Label>
      </div>

      {Object.entries(specs).map(([key, spec], index, array) => {
        const isLast = index === array.length - 1;

        return (
          <div key={key} className="flex items-center gap-2 mb-2">
            {isLast ? (
              <button type="button" onClick={onAdd} aria-label="Add feature">
                <FaPlus />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRemove(key)}
                aria-label={`Remove feature ${key}`}
              >
                <HiOutlineMinus size={22} />
              </button>
            )}

            <Input
              id={`qualitySpecification-${key}`}
              name={`seaView-${key}`}
              className="flex-1"
              value={spec}
              placeholder={placeholderMap[key]}
              onChange={(e) => onChange(key, e.target.value)}
              required
            />
          </div>
        );
      })}
    </div>
  );
};

export default SeaView;
