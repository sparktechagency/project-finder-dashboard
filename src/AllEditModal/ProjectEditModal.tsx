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
import EditMap from "@/pages/dashboard/map/EditMap";

import { imageUrl } from "@/redux/api/baseApi";
import { useUpdateProjectMutation } from "@/redux/apiSlice/apartments/apartments";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { BiSolidEditAlt } from "react-icons/bi";
import ProjectsImagesEditModal from "./ProjectImagesEditModal";

export default function ProjectEditModal({ invoice }: { invoice: any }) {
  const [updateProject] = useUpdateProjectMutation();
  const [qualityFile, setQualityFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [priceFile, setPriceFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [address, setAddress] = useState(invoice.location || "");

  // images state
  const [imageSections, setImageSections] = useState<File[]>([]);
  const imageLinks = imageSections
    ?.filter((item: any) => {
      if (item?.url?.startsWith("/")) return item?.url;
    })
    .map((item: any) => item.url);

  const imageFiles = imageSections?.filter((item: any) => item instanceof File);

  useEffect(() => {
    if (invoice?.apartmentImage) {
      const imageFiles = invoice.apartmentImage.map((image: string) => ({
        url: image,
      }));
      setImageSections(imageFiles);
    }
  }, [invoice]);

  const handleRemoveImage = (index: number) => {
    setImageSections((prev: File[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    setImageSections((prev) => [...prev, ...selectedFiles]);
  };

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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
    const formData = new FormData(form);

    if (qualityFile) {
      formData.append("qualitySpecificationPDF", qualityFile);
    }
    if (paymentFile) {
      formData.append("paymentPlanPDF", paymentFile);
    }
    if (priceFile) {
      formData.append("pricePdf", priceFile);
    }

    if (selectedDate) {
      formData.append("CompletionDate", selectedDate);
    }

    // map
    if (address) {
      formData.append("location", address);
    }

    // append image files
    if (imageFiles?.length > 0) {
      imageFiles.forEach((item) => {
        formData.append("apartmentImage", item);
      });
    }

    // append image links
    if (imageLinks?.length > 0) {
      formData.append("existImage", JSON.stringify(imageLinks));
    }

    try {
      const res = await updateProject({
        id: invoice?._id,
        data: formData,
      }).unwrap();
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

      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 lg:mt-6">
            <div>
              <Label htmlFor="apartmentName"></Label>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <ProjectsImagesEditModal
                  imageSections={imageSections}
                  handleRemoveImage={handleRemoveImage}
                  handleAddImage={handleAddImage}
                />
              </div>
            </div>
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
              <Label htmlFor="location">Commission</Label>
              <Input
                id="commission"
                name="commission"
                defaultValue={invoice.commission}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="CompletionDate">CompletionDate</Label>

              <div className="grid gap-3">
                <input
                  type="date"
                  name="date"
                  onChange={(e) => {
                    const date = e.target.value;
                    if (date) {
                      setSelectedDate(date);
                    } else {
                      setSelectedDate(undefined);
                    }
                  }}
                  value={selectedDate ? selectedDate : ""}
                  style={{
                    height: 45,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "100%",
                  }}
                />
              </div>
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
              <Label htmlFor="paymentPlanPDF" className="text-black mt-2">
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
              <Label htmlFor="pricePdf" className="text-black mt-2">
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

            <div className="grid gap-3">
              <EditMap
                address={address}
                setAddress={setAddress}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
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
