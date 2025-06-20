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
import { imageUrl } from "@/redux/api/baseApi";
import { useUpdateFloorMutation } from "@/redux/apiSlice/floor/floor";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";

export default function EditFloorModal({ invoice }: { invoice: any }) {
  const [updateFloor] = useUpdateFloorMutation();
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // Only append PDF manually, others are already in <input name="">
    if (pdfFile) {
      data.append("floorPlanPDF", pdfFile);
    }

    try {
      const res = await updateFloor({
        id: invoice._id,
        data,
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
              <Label htmlFor="floorPlan">Project Name</Label>
              <Input
                id="floorPlan"
                name="floorPlan"
                defaultValue={invoice.floorPlan}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" defaultValue={invoice.price} />
            </div>
            <div>
              <Label htmlFor="floorPlanPDF" className="text-black">
                Floor Plan (PDF)
              </Label>
              <input
                id="floorPlanPDF"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
                onClick={() => document.getElementById("floorPlanPDF")?.click()}
              >
                {pdfFile ? (
                  <span className="text-red-600">{pdfFile.name}</span>
                ) : invoice?.floorPlanPDF ? (
                  <a
                    href={
                      invoice.floorPlanPDF.startsWith("http")
                        ? invoice.floorPlanPDF
                        : `${imageUrl}${invoice.floorPlanPDF}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="text-4xl">+</span>
                )}
              </div>
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
