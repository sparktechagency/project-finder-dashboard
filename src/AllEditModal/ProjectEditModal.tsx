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
import { useUpdateProjectMutation } from "@/redux/apiSlice/apartments/apartments";

import { useState } from "react";

import toast from "react-hot-toast";

import { BiSolidEditAlt } from "react-icons/bi";

export default function ProjectEditModal({ invoice }: { invoice: any }) {
  const [updateProject] = useUpdateProjectMutation();
  const [qualityFile, setQualityFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [priceFile, setPriceFile] = useState<File | null>(null);

  const handleFileChangeQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setQualityFile(file);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };
  const handleFileChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setPaymentFile(file);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };
  const handleFileChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setPriceFile(file);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    if (qualityFile) {
      data.append("qualitySpecificationPDF", qualityFile);
    }
    if (paymentFile) {
      data.append("paymentPlanPDF", paymentFile);
    }
    if (priceFile) {
      data.append("pricePdf", priceFile);
    }

    try {
      const res = await updateProject({ id: invoice?._id, data }).unwrap();
      if (res?.success) {
        toast.success("succesfully project update ");
      } else {
        toast.error("Failed to project");
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
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div className="grid gap-3">
              <Label htmlFor="apartmentName">Project Name</Label>
              <Input
                id="apartmentName"
                name="apartmentName"
                defaultValue={invoice.apartmentName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" defaultValue={invoice.price} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={invoice.location}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Commission</Label>
              <Input
                id="commission"
                name="commission"
                defaultValue={invoice.commission}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="CompletionDate">CompletionDate</Label>
              <Input
                id="CompletionDate"
                name="CompletionDate"
                defaultValue={invoice.CompletionDate}
              />
            </div>

            {/* upload image qualitySpecificationPDF*/}
            <div>
              <Label htmlFor="qualitySpecificationPDF" className="text-black">
                QualitySpecification PDF
              </Label>
              <input
                id="qualitySpecificationPDF"
                type="file"
                accept="application/pdf"
                onChange={handleFileChangeQuality}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
                onClick={() =>
                  document.getElementById("qualitySpecificationPDF")?.click()
                }
              >
                {qualityFile ? (
                  <span className="text-red-600">{qualityFile.name}</span>
                ) : invoice?.qualitySpecificationPDF?.[0] ? (
                  <a
                    href={
                      invoice.qualitySpecificationPDF?.[0]?.startsWith("http")
                        ? invoice.qualitySpecificationPDF?.[0]
                        : `${imageUrl}${invoice.qualitySpecificationPDF?.[0]}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="text-4xl">+</span>
                )}
              </div>
            </div>
            {/* upload image payment plan */}
            <div>
              <Label htmlFor="paymentPlanPDF" className="text-black">
                PaymentPlan PDF
              </Label>
              <input
                id="paymentPlanPDF"
                type="file"
                accept="application/pdf"
                onChange={handleFileChangePayment}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
                onClick={() =>
                  document.getElementById("paymentPlanPDF")?.click()
                }
              >
                {paymentFile ? (
                  <span className="text-red-600">{paymentFile.name}</span>
                ) : invoice?.paymentPlanPDF ? (
                  <a
                    href={
                      invoice.paymentPlanPDF?.startsWith("http")
                        ? invoice.paymentPlanPDF
                        : `${imageUrl}${invoice.paymentPlanPDF}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="text-4xl">+</span>
                )}
              </div>
            </div>
            {/* upload image payment plan */}
            <div>
              <Label htmlFor="pricePdf" className="text-black">
                pricePdf PDF
              </Label>
              <input
                id="pricePdf"
                type="file"
                accept="application/pdf"
                onChange={handleFileChangePrice}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
                onClick={() => document.getElementById("pricePdf")?.click()}
              >
                {priceFile ? (
                  <span className="text-red-600">{priceFile.name}</span>
                ) : invoice?.paymentPlanPDF ? (
                  <a
                    href={
                      invoice.pricePdf?.startsWith("http")
                        ? invoice.pricePdf
                        : `${imageUrl}${invoice.pricePdf}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
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
            <Button type="submit" className="mt-4 bg-[#1D7889] text-white">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
