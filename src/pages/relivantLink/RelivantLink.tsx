import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineMinus } from "react-icons/hi";

interface RelivantLinks {
  links: { [key: string]: string };
  onChange: (value: string, key: string) => void;
  onAdd: () => void;
  onRemove: (key: string) => void;
}

export default function RelivantLink({
  links,
  onChange,
  onAdd,
  onRemove,
}: RelivantLinks) {
  const placeholder: { [key: string]: string } = {};

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="links" className="mb-2">
          Relivent Link
        </Label>
      </div>

      {Object.entries(links).map(([key, link], index, array) => {
        const lastLink = index === array.length - 1;
        return (
          <div key={key} className="flex items-center gap-2 mb-2">
            {lastLink ? (
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
              className=""
              id={`RelivantLinks${key}`}
              value={link}
              placeholder={placeholder[key]}
              onChange={(e) => onChange(key, e.target.value)}
              required
            />
          </div>
        );
      })}
    </div>
  );
}
