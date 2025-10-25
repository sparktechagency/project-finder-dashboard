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
  options: any;
  value: string;
  onSelect: (value: string) => void;
};

export default function SelectItems({
  title,
  placeholder,
  options,
  value,
  onSelect,
}: SelectItemsProps) {
  return (
    <div className="my-4">
      <Label htmlFor={title} className="mb-2 text-black">
        {title}
      </Label>
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt: any) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
