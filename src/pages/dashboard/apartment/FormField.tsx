import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  // type: React.HTMLInputTypeAttribute;
  type: any;
  name?: string;
  label: string;
  placeholder: string;
  value?: string;
  step: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  id,
  type,
  name,
  label,
  placeholder,
  value,
  step,

  onChange,
}: FormFieldProps) {
  return (
    <div className="my-4">
      <Label htmlFor={id} className="mb-2 text-black">
        {label}
      </Label>
      <Input
        type={type}
        step={step ?? "any"}
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
