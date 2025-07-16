import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  name?: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contactAddress?: string;
}

export function ContactProjectEdit({
  id,
  type,
  name,
  label,
  placeholder,
  contactAddress,
  onChange,
}: FormFieldProps) {
  return (
    <div className="">
      <Label htmlFor={id} className="mb-2 mt-2 text-black">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        value={contactAddress}
        onChange={onChange}
      />
    </div>
  );
}
