import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { FaPlus } from "react-icons/fa6";
// import { HiOutlineMinus } from "react-icons/hi";

interface QualitySpecsInputProps {
  specs: { [key: string]: string };
  onChange: (value: string, key: string) => void;
  onAdd: () => void;
  onRemove: (key: string) => void;
}

export function QualitySpecsInput({
  specs,
  onChange,
}: // onAdd,
// onRemove,
QualitySpecsInputProps) {
  const placeholderMap: { [key: string]: string } = {
    // category: "Enter category",
    // generalAmenites: "Enter general amenities",
    // connectivity: "Enter connectivity details",
    // ecoFriendly: "Enter eco-friendly features",
    // parking: "Enter parking info",
    // receational: "Enter recreational facilities",
    // accessiblity: "Enter accessibility features",
    // nearbyFacilities: "Enter nearby facilities",
  };
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="qualitySpecification" className="mb-2">
          Features
        </Label>
        {/* <button onClick={onAdd} type="button" aria-label="Add feature">
          <FaPlus />
        </button> */}
      </div>

      {Object.entries(specs).map(([key, spec]) => {
        // const isLast = index === array.length - 1;

        return (
          <div key={key} className="flex items-center gap-2 mb-2">
            {/* {isLast ? (
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
            )} */}

            <Input
              id={`qualitySpecification-${key}`}
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
}
