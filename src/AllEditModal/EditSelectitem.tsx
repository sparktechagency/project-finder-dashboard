import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectItemsProps = {
  title: string;
  placeholder: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
};

export default function EditSelectItems({
  title,
  placeholder,
  options,
  value,
  onSelect,
}: SelectItemsProps) {
  return (
    <div className="">
      <Label htmlFor={title} className="mb-2 text-black">
        {title}
      </Label>
      <Select defaultValue={value} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
