import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectItems from "./SelectItem";
import { company, completionYear, location } from "./Allname";
import LocationPicker from "../map/Map";
import { useCreateProjectMutation } from "@/redux/apiSlice/apartments/apartments";
import toast from "react-hot-toast";

interface ApartmentFormProps {
  // images: Record<string, string>;
  files: {
    [key: string]: {
      url: string;
      type?: string;
    };
  };
  setFiles: any;
  setImageSections: any;
  imageSections: File[];
  qualitySpecs: { [key: string]: string };
  setQualitySpecs: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;

  handleFileChange: (
    key: "payment" | "quality" | "floor"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

  addImageSection: () => void;
  handleQualityChange: (value: string, key: string) => void;
  handleInputAdd: (key: string) => void;
  handleRemove: (key: string) => void;
}

export default function AddCreateProject({
  // images,
  files,
  setFiles,
  imageSections,
  setImageSections,
  qualitySpecs,
  setQualitySpecs,
  handleFileChange,
  handleImageChange,
  addImageSection,
  handleQualityChange,
  handleInputAdd,
  handleRemove,
}: ApartmentFormProps) {
  const [createProject] = useCreateProjectMutation();
  const [right, setRight] = useState(true);
  const [selectValues, setSelectValues] = useState({
    propertyType: "",
    location: "",
    salesCompany: "",
    completionYear: "",
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSelectChange = (field: string, value: string) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    const formData = new FormData();

    ["apartmentName", "commission", "price"].forEach((key) => {
      const val = values[key];
      if (val) formData.append(key, val as string);
    });

    // company name
    const companyName = data.get("companyName") as string;
    formData.append("companyName", companyName);
    // Append payment plan image
    const paymentFile = data.get("paymentPlanPDF");
    if (paymentFile && paymentFile instanceof File) {
      formData.append("paymentPlanPDF", paymentFile);
    }

    imageSections.forEach((file) => {
      if (file instanceof File) {
        formData.append("apartmentImage", file);
      }
    });

    if (!imageSections || imageSections.length === 0) {
      toast.error("Please upload at least one apartment image.");
      return;
    }

    // Append quality specification PDF
    const quality = data.get("quality");
    if (quality && quality instanceof File) {
      formData.append("qualitySpecificationPDF", quality);
    }

    // Append nested contact
    const contactData = {
      phone: values.contact,
      email: values.email,
      companyName: values.companyName,
    };

    formData.append("contact", JSON.stringify(contactData));

    const featuresArray = Object.values(qualitySpecs).filter(
      (value) => value.trim() !== ""
    );

    featuresArray.forEach((feature) => {
      formData.append("features", feature);
    });

    // Append coordinates
    if (markerPosition) {
      formData.append("latitude", markerPosition.lat.toString());
      formData.append("longitude", markerPosition.lng.toString());
    }

    // Append select values
    formData.append("propertyType", selectValues.propertyType);
    formData.append("location", selectValues.location);
    formData.append("salesCompany", selectValues.salesCompany);
    formData.append(
      "CompletionDate",
      new Date(selectValues.completionYear).toISOString()
    );

    try {
      const res = await createProject(formData).unwrap();

      if (res.message) {
        toast.success("Project created successfully");
        form.reset();
        // reset features
        setQualitySpecs({ category: "" });

        // Reset file input
        setFiles((prev: any) => ({
          ...prev,
          payment: { url: "", type: "" },
          quality: { url: "", type: "" },
        }));

        // Reset image sections
        setImageSections([null]);

        // map marker position
        setMarkerPosition({ lat: 0, lng: 0 });
      } else {
        toast.error(res?.message || "Failed to create project");
      }
    } catch (error: any) {
      toast.error("Error submitting form:", error);

      const messages = error?.data?.errorMessages;

      if (Array.isArray(messages)) {
        messages.forEach((err: any) => {
          toast.error(`${err.path}: ${err.message}`);
        });
      } else {
        toast.error(
          error?.data?.message || error?.message || "Something went wrong"
        );
      }
    }
  };

  return (
    <form className=" p-4 space-y-6" onSubmit={handleSubmit}>
      {/* Apartment Images */}
      <div>
        <Label className="block mb-2 text-black font-medium ">
          Projects Images
        </Label>
        <div className="flex items-center space-x-4">
          {(imageSections.length > 0 ? imageSections : [null]).map(
            (file, idx) => (
              <div
                key={idx}
                className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center relative cursor-pointer"
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`upload-${idx}`}
                    className="h-full w-full object-cover rounded-md"
                    onLoad={(e) =>
                      URL.revokeObjectURL((e.target as HTMLImageElement).src)
                    } // revoke to avoid memory leaks
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => handleImageChange(e, idx)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple={false}
                />
              </div>
            )
          )}

          <button
            type="button"
            onClick={addImageSection}
            className="flex h-24 w-24 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
            aria-label="Add new image upload section"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* company name */}

          <FormField
            type="text"
            id="apartmentName"
            label="Project Name"
            placeholder="Enter Project Name"
          />
          <FormField
            type="number"
            id="commission"
            label="Commission Percentage"
            placeholder="Enter Commission"
          />

          <ImageUpload
            id="paymentPlanPDF"
            fileUrl={files.payment?.url || ""}
            fileType={files.payment?.type}
            onChange={handleFileChange("payment")}
            label="Payment Plan"
            accept="application/pdf"
          />

          <ImageUpload
            id="quality"
            fileUrl={files.quality?.url || ""}
            fileType={files.quality?.type}
            onChange={handleFileChange("quality")}
            label="Quality Specification"
            accept="application/pdf"
          />

          <div className="flex justify-between items-center cursor-pointer text-black">
            <span>Sales Contact Info</span>
            <span onClick={() => setRight((prev) => !prev)}>
              {right ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
          </div>

          {right && (
            <div>
              <FormField
                type="text"
                id="contact"
                label="Contact Number"
                placeholder="Enter Contact Number"
              />
              <FormField
                type="text"
                id="email"
                label="Email"
                placeholder="Enter Your Email"
              />
              <FormField
                type="text"
                id="companyName"
                label="Developer Name"
                placeholder="Enter Developer name"
              />
            </div>
          )}
        </div>

        {/* Right Column */}

        {/* price */}
        <div>
          <FormField
            type="number"
            id="price"
            label="Price"
            placeholder="Enter Price"
          />

          {/* map */}
          <LocationPicker
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />

          {/* property type */}
          <SelectItems
            options={["Apartment", "Villa", "Townhouse"]}
            title="Property Type"
            placeholder="Select Property Type"
            value={selectValues.propertyType}
            onSelect={(value) => handleSelectChange("propertyType", value)}
          />
          {/* location */}
          <SelectItems
            options={location}
            title="Location"
            placeholder="Select location"
            value={selectValues.location}
            onSelect={(value) => handleSelectChange("location", value)}
          />
          {/* sales company */}
          <SelectItems
            options={company}
            title="Sales Company Name"
            placeholder="Select company Name"
            value={selectValues.salesCompany}
            onSelect={(value) => handleSelectChange("salesCompany", value)}
          />
          {/* completion year */}
          <SelectItems
            options={completionYear}
            title="Completion Year"
            placeholder="Select year"
            value={selectValues.completionYear}
            onSelect={(value) => handleSelectChange("completionYear", value)}
          />

          <QualitySpecsInput
            specs={qualitySpecs}
            onChange={handleQualityChange}
            onAdd={() => handleInputAdd("")}
            onRemove={handleRemove}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl mb-24"
      >
        Submit
      </Button>
    </form>
  );
}
