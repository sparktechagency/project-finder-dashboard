import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type inputField = {
  id: string;
  label: string;
  type: string;
  value: string;
};

type FormInputFieldsProps = {
  inputFields: inputField[];
  setFormState: React.Dispatch<
    React.SetStateAction<{
      title: string;
      price?: number;
      description: string[];
      offers: string[];
      isOfferModalOpen: boolean;
      newOffer: string;
      duration: string | number;
      paymentType: string;
    }>
  >;
};

export default function FormInputFields({
  inputFields,
  setFormState,
}: FormInputFieldsProps) {
  return (
    <>
      {inputFields.map(({ id, label, type, value }) => (
        <div className="mb-4" key={id}>
          <Label className="mb-2" htmlFor={id}>
            {label}
          </Label>
          <Input
            id={id}
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value ?? ""}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                [id]:
                  type === "number" ? Number(e.target.value) : e.target.value,
              }))
            }
            className="mt-1"
          />
        </div>
      ))}
    </>
  );
}
