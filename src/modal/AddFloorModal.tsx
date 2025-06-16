import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateProjectFloorMutation,
  useGetProjectsFloorQuery,
} from "@/redux/apiSlice/apartments/apartments";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apartmentId: string;
}

export default function AddFloorModal({ isOpen, onClose, apartmentId }: Props) {
  const [createProjectFloor] = useCreateProjectFloorMutation();
  const { refetch } = useGetProjectsFloorQuery(undefined);

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files?.[0];
    if (file?.type === "application/pdf") setPdfFile(file);
    else toast.error("Only PDF files are allowed");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (isNaN(Number(formData.get("price"))))
      return toast.error("Price must be a number");
    if (isNaN(Number(formData.get("badSize"))))
      return toast.error("Bed size must be a number");

    // const badSize = formData.get("badSize");

    if (apartmentId) {
      formData.append("apartmentId", apartmentId);
    }

    // if (badSize) {
    //   formData.append("badSize", Number(badSize).toString());
    // }

    if (pdfFile) formData.append("floorPlanPDF", pdfFile);

    try {
      const res = await createProjectFloor(formData).unwrap();
      if (res?.success) {
        toast.success(res.message || "Created Successfully");
        setPdfFile(null);
        onClose();
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create apartment details");
    }
  };

  const fields = [
    {
      id: "floorPlan",
      label: "Unit Name",
      type: "text",
      placeholder: "Select Unit Name",
    },
    {
      id: "badSize",
      label: "Number of Bedroom",
      type: "number",
      placeholder: "Enter Number of Bedrooms",
    },
    { id: "price", label: "Price", type: "number", placeholder: "Enter Price" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Project Floor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {fields.map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <Label htmlFor={id} className="text-black mb-2">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            <div>
              <Label htmlFor="pdf-upload" className="text-black">
                Floor Plan (PDF)
              </Label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer"
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                {pdfFile ? (
                  <span className="text-red-600 py-2">{pdfFile.name}</span>
                ) : (
                  <span className="text-4xl py-2">+</span>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl cursor-pointer"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
