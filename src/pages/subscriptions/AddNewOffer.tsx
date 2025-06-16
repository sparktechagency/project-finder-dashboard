import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog } from "@radix-ui/react-dialog";

type AddNewOfferProps = {
  formState: {
    title: string;
    price?: number;
    description: string[];
    offers: string[];
    isOfferModalOpen: boolean;
    newOffer: string;
    duration: string | number;
    paymentType: string;
  };
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

export default function AddNewOffer({
  formState,
  setFormState,
}: AddNewOfferProps) {
  const handleAddOffer = () => {
    const trimmedOffer = formState.newOffer.trim();
    if (trimmedOffer) {
      setFormState((prev) => ({
        ...prev,
        offers: [...prev.offers, trimmedOffer],
        description: [...prev.description, trimmedOffer],
        newOffer: "",
        isOfferModalOpen: false,
      }));
    }
  };
  return (
    <Dialog
      open={formState.isOfferModalOpen}
      onOpenChange={(open) =>
        setFormState((prev) => ({ ...prev, isOfferModalOpen: open }))
      }
    >
      <DialogContent className="sm:max-w-md rounded-lg bg-[#fefefe] text-[#1A1E25] p-6">
        <DialogTitle>Add New Offer</DialogTitle>
        <Input
          placeholder="Enter offer name"
          value={formState.newOffer}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, newOffer: e.target.value }))
          }
          className="mt-4"
        />
        <div className="mt-6 flex justify-end gap-2">
          <Button
            className="w-[48%]"
            variant="outline"
            onClick={() =>
              setFormState((prev) => ({ ...prev, isOfferModalOpen: false }))
            }
          >
            Cancel
          </Button>
          <Button
            className="w-[48%] bg-[#F79535] hover:bg-[#F79535]"
            onClick={handleAddOffer}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
