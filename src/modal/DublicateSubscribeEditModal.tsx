import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "@/redux/subscriptions/subscriptions";
import AddNewOffer from "@/pages/subscriptions/AddNewOffer";
import FormInputFields from "@/pages/subscriptions/InputName";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  edit?: {
    _id?: string;
    title: string;
    price?: number;
    description?: string[];
    paymentType?: string;
    duration?: string | number;
    status: boolean;
  };
}

export default function DublicateSubscribeEditModal({
  isOpen,
  onClose,
  edit,
}: PackageModalProps) {
  const [createSubscription] = useCreateSubscriptionMutation();
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const [formState, setFormState] = useState<{
    title: string;
    price?: number;
    description: string[];
    offers: string[];
    isOfferModalOpen: boolean;
    newOffer: string;
    duration: string | undefined;
    product_id: string | number;
    paymentType: string;
    status: boolean;
  }>({
    title: "",
    price: undefined,
    description: [],
    offers: [],
    isOfferModalOpen: false,
    newOffer: "",
    duration: "",
    product_id: "",
    paymentType: "",
    status: false,
  });

  useEffect(() => {
    if (!edit?._id) return;

    const desc = Array.isArray(edit.description)
      ? edit.description
      : edit.description
      ? [edit.description]
      : [];

    setFormState((prev) => ({
      ...prev,
      title: edit.title,
      price: edit.price,
      description: desc,
      offers: desc,
      paymentType: edit.paymentType ?? "",
      duration: String(edit.duration ?? ""),
      status: edit.status,
    }));
  }, [edit]);

  const removeOffer = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  type FormFieldKey = "price" | "duration" | "product_id";

  const onSubmit = async () => {
    const missingRequiredField = inputFields.some(
      (field) => field.required && !formState[field.id as FormFieldKey]
    );

    if (
      !formState.title ||
      missingRequiredField ||
      !formState.description ||
      formState.description.filter(Boolean).length === 0
    ) {
      toast.error(
        "Please fill in all required fields and add at least one Package Offer."
      );
      return;
    }

    const {
      title,
      price,
      duration,
      product_id,
      paymentType,
      description,
      status,
    } = formState;

    // ✅ Build data safely (optional fields allowed)
    const data = {
      title,
      description,
      price,
      duration,
      paymentType,
      status,
      ...(product_id && { product_id }), // optional
    };

    try {
      if (edit?._id) {
        await updateSubscription({ _id: edit._id, data }).unwrap();
      } else {
        await createSubscription(data).unwrap();
      }
      onClose();
    } catch {
      toast.error("failed subscription");
    }
  };

  const inputFields = [
    {
      id: "price",
      label: "Price",
      type: "number",
      value: formState.price !== undefined ? String(formState.price) : "",
      required: true,
    },

    {
      id: "product_id",
      label: "Product Id",
      type: "text",
      value:
        formState.product_id !== undefined ? String(formState.product_id) : "",
      required: false,
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg rounded-lg bg-[#fefefe] text-[#1A1E25] p-6 overflow-y-auto h-[600px]">
          <DialogTitle className="text-2xl -mt-2">
            {edit ? "Edit Subscription" : "Add Subscription"}
          </DialogTitle>

          {(edit || isOpen) && (
            <div className="mb-4">
              <Label className="mb-2" htmlFor="title">
                Package Name
              </Label>
              <Select
                value={formState.title}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, title: value }))
                }
              >
                <SelectTrigger id="title" className="w-full mt-1">
                  <SelectValue
                    placeholder="Select Payment Type"
                    defaultValue={formState?.title}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic Plan">Basic Plan</SelectItem>
                  <SelectItem value="Premium Plan">Premium Plan</SelectItem>
                  <SelectItem value="Standard Plan">Standard Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* monthly and yearly */}
          {(edit || isOpen) && (
            <div className="mb-4">
              <Label className="mb-2" htmlFor="duration">
                Duration
              </Label>
              <Select
                value={formState.duration}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, duration: value }))
                }
              >
                <SelectTrigger id="duration" className="w-full mt-1">
                  <SelectValue
                    placeholder="Select Type"
                    defaultValue={formState?.duration}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="1 year">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <FormInputFields
            inputFields={inputFields}
            setFormState={setFormState}
          />

          {/* payment type */}
          {(edit || isOpen) && (
            <div className="mb-4">
              <Label className="mb-2" htmlFor="paymentType">
                Payment Type
              </Label>
              <Select
                value={formState.paymentType}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, paymentType: value }))
                }
              >
                <SelectTrigger id="paymentType" className="w-full mt-1">
                  <SelectValue
                    placeholder="Select Package Name"
                    defaultValue={formState?.paymentType}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2 px-1">
              <h2 className="font-medium">Package Offers</h2>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setFormState((prev) => ({ ...prev, isOfferModalOpen: true }))
                }
              >
                <FiPlusCircle className="w-6 h-6 text-orange-500" />
              </Button>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 space-y-2">
              {formState.description.filter(Boolean).length > 0 ? (
                formState.description.filter(Boolean).map((des, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <IoMdCheckmarkCircle className="text-[#34383A] w-5 h-5" />
                      <span>{des}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOffer(i)}
                    >
                      <FiMinusCircle className="text-gray-500 w-5 h-5" />
                    </Button>
                  </div>
                ))
              ) : (
                <span className="text-black">New Item Add Here</span>
              )}
            </div>

            {/*switch */}
            <div className="flex items-center space-x-2 mt-9">
              <Switch
                id="status"
                checked={formState.status}
                onCheckedChange={(checked) =>
                  setFormState((prev) => ({
                    ...prev,
                    status: checked,
                  }))
                }
              />
              <Label htmlFor="status">
                {formState.status ? "Active" : "Delete"}
              </Label>
            </div>
          </div>

          <Button
            className="w-full py-3 text-black mt-6 cursor-pointer"
            onClick={onSubmit}
            style={{ backgroundColor: "#F79535", borderColor: "#188754" }}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      {/* add new offer */}
      <AddNewOffer formState={formState} setFormState={setFormState} />
    </>
  );
}
