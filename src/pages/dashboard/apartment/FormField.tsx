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
}

export function FormField({
  id,
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="my-4">
      <Label htmlFor={id} className="mb-2 text-black">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
