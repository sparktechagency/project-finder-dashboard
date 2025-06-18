import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePhaseDetailsMutation } from "@/redux/apiSlice/phase/phase";

import toast from "react-hot-toast";

import { BiSolidEditAlt } from "react-icons/bi";

export default function PhaseEditModal({ invoice }: { invoice: any }) {
  console.log(invoice);
  const [updatePhaseDetails] = useUpdatePhaseDetailsMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const phase = data.get("phase");
    const date = data.get("date");

    const updatePhase = {
      phase,
      date,
    };

    try {
      const res = await updatePhaseDetails({
        id: invoice._id,
        data: updatePhase,
      }).unwrap();
      if (res.success) {
        toast.success("Floor plan updated successfully");
      } else {
        toast.error("Failed to update floor plan");
      }
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "An unknown error occurred";
      toast.error(`Failed to update floor plan: ${errorMessage}`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BiSolidEditAlt size={24} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Phase</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div className="grid gap-3">
              <Label htmlFor="phase">Phase</Label>
              <Input id="phase" name="phase" defaultValue={invoice.phase} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                defaultValue={invoice.date.split("T")[0]}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="mt-4 bg-[#1D7889] text-white hover:bg-[#1D7889]"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
