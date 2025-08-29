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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";
import ProjectsImagesEditModal from "./newProjectEdit/ProjectImagesEditModal";
import { ContactProjectEdit } from "./newProjectEdit/ContactProjectEdit";
import { contactFields } from "@/demoData/ProjectEditData";
import EditSelectItems from "./newProjectEdit/EditSelectitem";
import { EditFeatures } from "./newProjectEdit/EditFeatures";
import PdfUploader from "@/pdfUploader/PdfUploader";
import { company, location } from "@/components/layout/shared/AllName";
import EditLocation from "@/pages/dashboard/map/EditMap";
import { getAddressFromLatLng } from "@/helper/mapAddress";

export default function ProjectEditModal({ invoice }: { invoice: any }) {
  const [updateProject] = useUpdateProjectMutation();
  const [qualityFile, setQualityFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [priceFile, setPriceFile] = useState<File | null>(null);
  const [apartmentFile, setApartmentFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = useState<string | null>();
  const [features, setFeatures] = useState<string[]>(invoice?.features || []);
  // update
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (invoice?.updatedDate) {
      const formattedDate = new Date(invoice.updatedDate)
        .toISOString()
        .split("T")[0];
      setDate(formattedDate);
    }
  }, [invoice?.updatedDate]);

  useEffect(() => {
    if (invoice?.CompletionDate) {
      const year = new Date(invoice.CompletionDate).getFullYear().toString();

      setSelectedYear(year);
    }
  }, [invoice?.CompletionDate]);

  const [contactAddress, setContactAddress] = useState({
    name: invoice?.contact || "",
  });

  //  contact info sales
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactAddress({
      ...contactAddress,
      name: {
        ...contactAddress.name,
        [e.target.name]: e.target.value,
      },
    });
  };

  // images state
  const [imageSections, setImageSections] = useState<File[]>([]);
  const imageLinks = imageSections
    ?.filter((item: any) => {
      if (item?.url?.startsWith("/")) return item?.url;
    })
    .map((item: any) => item.url);

  const imageFiles = imageSections?.filter((item: any) => item instanceof File);

  useEffect(() => {
    if (invoice?.apartmentImage || invoice.CompletionDate) {
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
  const handleFileChangeApartment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setApartmentFile(file);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };

  // select change
  const handleSelectChange = (key: string, value: string) => {
    setSelected((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleYearChange = (_key: string, value: string) => {
    setSelectedYear(value);
  };

  // features change
  const handleChangeFeature = (key: number, value: string) => {
    setFeatures((prev: string[]) => {
      const newFeatures = [...prev];
      newFeatures[key] = value;
      return newFeatures;
    });
  };

  const [address, setAddress] = useState("");
  console.log(address, "address");

  useEffect(() => {
    if (invoice?.latitude && invoice?.longitude) {
      const { latitude, longitude } = invoice;
      setMarkerPosition({ lat: latitude, lng: longitude });

      getAddressFromLatLng(
        latitude,
        longitude,
        import.meta.env.VITE_GOOGLE_API_KEY
      ).then((data) => {
        if (data) setAddress(data);
      });
    }
  }, [invoice?.latitude, invoice?.longitude]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!markerPosition) {
      toast.error("Please select a location on the map before submitting.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const fileFields = [
      { key: "qualitySpecificationPDF", file: qualityFile },
      { key: "paymentPlanPDF", file: paymentFile },
      { key: "pricePdf", file: priceFile },
      { key: "apartmentImagesPdf", file: apartmentFile },
    ];

    fileFields.forEach(({ key, file }) => {
      if (file) formData.append(key, file);
    });

    if (selectedYear) formData.append("CompletionDate", `${selectedYear}`);
    // if (address) formData.append("location", address);
    if (selected?.propertyType)
      formData.append("propertyType", selected.propertyType);
    if (selected?.salesCompany)
      formData.append("salesCompany", selected.salesCompany);
    if (selected?.location) {
      formData.append("location", selected.location);
    }

    // append image files
    if (imageFiles?.length > 0) {
      imageFiles.forEach((item) => {
        formData.append("apartmentImage", item);
      });
    }

    // map implement
    formData.append("latitude", markerPosition?.lat?.toString() ?? "");
    formData.append("longitude", markerPosition?.lng?.toString() ?? "");

    // Append nested contact
    const contactData = {
      phone: values.phone,
      email: values.email,
      companyName: values.companyName,
    };

    formData.append("contact", JSON.stringify(contactData));

    // append image links
    if (imageLinks?.length > 0) {
      formData.append("existImage", JSON.stringify(imageLinks));
    }

    // append features
    features.forEach((feature) => {
      if (feature.trim() !== "") {
        formData.append("features", feature);
      }
    });

    // update date
    if (date) {
      formData.append("updatedDate", date);
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
              <Label htmlFor="location">Commission</Label>
              <Input
                id="commission"
                name="commission"
                defaultValue={invoice.commission}
              />
            </div>

            <PdfUploader
              id="qualitySpecificationPDF"
              label="QualitySpecification PDF"
              file={qualityFile}
              invoiceFile={invoice?.qualitySpecificationPDF}
              onChange={handleFileChangeQuality}
              imageUrl={imageUrl}
            />

            <PdfUploader
              id="paymentPlanPDF"
              label="PaymentPlan PDF"
              file={paymentFile}
              invoiceFile={invoice?.paymentPlanPDF}
              onChange={handleFileChangePayment}
              imageUrl={imageUrl}
            />

            <PdfUploader
              id="pricePdf"
              label="Price PDF"
              file={priceFile}
              invoiceFile={invoice?.pricePdf}
              onChange={handleFileChangePrice}
              imageUrl={imageUrl}
            />
            <PdfUploader
              id="apartmentImagesPdf"
              label="apartmentImagesPdf"
              file={apartmentFile}
              invoiceFile={invoice?.apartmentImagesPdf}
              onChange={handleFileChangeApartment}
              imageUrl={imageUrl}
            />

            <div className="grid gap-3">
              <EditLocation
                address={address}
                setAddress={setAddress}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
              />
            </div>

            <div>
              {contactFields.map((field) => (
                <ContactProjectEdit
                  type={field.type}
                  key={field.id}
                  name={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  contactAddress={contactAddress?.name?.[field.id]}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* locaton and completion year --- property type */}
            <div>
              <EditSelectItems
                options={["Apartment", "Villa", "Townhouse"]}
                title="Property Type"
                placeholder="Select Property Type"
                value={invoice?.propertyType || ""}
                onSelect={(value) => handleSelectChange("propertyType", value)}
              />
            </div>
            <div>
              <EditSelectItems
                options={["2025", "2026", "2027", "2028"]}
                title="Completion Year"
                placeholder="Select Completion Year"
                value={selectedYear || ""}
                onSelect={(value) => handleYearChange("CompletionDate", value)}
              />
            </div>
            <div>
              <EditSelectItems
                options={company}
                title="Sales Company Name"
                placeholder="Select Sales Company Name"
                value={invoice?.salesCompany || ""}
                onSelect={(value) => handleSelectChange("salesCompany", value)}
              />
            </div>
            <div>
              <EditSelectItems
                options={location}
                title="Location"
                placeholder="Select location"
                value={invoice?.location || ""}
                onSelect={(value) => handleSelectChange("location", value)}
              />
            </div>

            {/* feature section */}
            <EditFeatures features={features} onChange={handleChangeFeature} />

            <input
              type="date"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
