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
import { useUpdateProjectFloorMutation } from "@/redux/apiSlice/apartments/apartments";

import toast from "react-hot-toast";

import { BiSolidEditAlt } from "react-icons/bi";

export default function EditFloorModal({ invoice }: { invoice: any }) {
  const [updateProjectFloor] = useUpdateProjectFloorMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const price = Number(data.get("price"));

    try {
      const res = await updateProjectFloor({
        id: invoice._id,
        data: { price },
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
            <DialogTitle>Edit Floor Plan</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" defaultValue={invoice.price} />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="mt-4 bg-[#1D7889] text-white">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
