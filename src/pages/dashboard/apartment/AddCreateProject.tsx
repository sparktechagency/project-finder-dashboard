import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import SelectItems from "./SelectItem";
import LocationPicker from "../map/Map";
import { useCreateProjectMutation } from "@/redux/apiSlice/apartments/apartments";
import toast from "react-hot-toast";
import ProjectsImages from "./ProjectsImage";
import {
  company,
  completionYear,
  location,
} from "@/components/layout/shared/AllName";
import { apartmentDetailsData } from "@/demoData/AllDemoData";
import SeaView from "./seaView";

interface ApartmentFormProps {
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
    key: "payment" | "quality" | "floor" | "pricePdf" | "apartmentImagesPdf"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

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
  handleQualityChange,
  handleInputAdd,
  handleRemove,
}: ApartmentFormProps) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [selectValues, setSelectValues] = useState({
    propertyType: "",
    location: "",
    salesCompany: "",
    completionYear: "",
  });

  // ✅ Sea View state
  const [seaViewSpecs, setSeaViewSpecs] = useState<{ [key: string]: string }>({
    seaView1: "",
  });

  // ✅ Sea View handlers
  const handleSeaViewChange = (key: string, value: string) => {
    setSeaViewSpecs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSeaViewAdd = () => {
    const newKey = `seaView${Object.keys(seaViewSpecs).length + 1}`;
    setSeaViewSpecs((prev) => ({
      ...prev,
      [newKey]: "",
    }));
  };

  const handleSeaViewRemove = (key: string) => {
    setSeaViewSpecs((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSelectChange = (field: string, value: string) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    const formData = new FormData();

    // Basic fields
    ["apartmentName", "commission", "companyName", "relevantLink"].forEach(
      (key) => {
        const val = values[key];

        if (val) formData.append(key, val as string);
      }
    );

    // Files
    const filesToAppend: [string, any][] = [
      ["pricePdf", data.get("pricePdf")],
      ["paymentPlanPDF", data.get("paymentPlanPDF")],
      ["apartmentImagesPdf", data.get("apartmentImages")],
      ["qualitySpecificationPDF", data.get("quality")],
    ];

    filesToAppend.forEach(([key, file]) => {
      if (file instanceof File) formData.append(key, file);
    });

    // Images
    if (!imageSections?.length) {
      toast.error("Please upload at least one apartment image.");
      console.error("No apartment images provided.");
      return;
    }
    imageSections.forEach(
      (file) => file instanceof File && formData.append("apartmentImage", file)
    );

    // Contact
    formData.append(
      "contact",
      JSON.stringify({
        phone: values.contact,
        email: values.email,
        companyName: values.companyName,
      })
    );

    // Features
    Object.values(qualitySpecs)
      .filter((v) => v.trim() !== "")
      .forEach((feature) => formData.append("features", feature));
    // sea view
    Object.values(seaViewSpecs)
      .filter((v) => v.trim() !== "")
      .forEach((feature) => formData.append("seaView", feature));

    // Location
    if (!markerPosition) {
      toast.error("Please select a location on the map.");
      console.error("No marker position selected.");
      return;
    }
    formData.append("latitude", markerPosition.lat.toString());
    formData.append("longitude", markerPosition.lng.toString());

    // Selects
    Object.entries(selectValues).forEach(([key, val]) => {
      if (key === "completionYear") {
        formData.append("CompletionDate", val);
      } else {
        formData.append(key, val);
      }
    });

    try {
      const res = await createProject(formData).unwrap();

      if (res.message) {
        toast.success("Project created successfully", { id: "apartment" });
        form.reset();

        // Reset state
        setQualitySpecs({ category: "" });
        setFiles((prev: any) => ({
          ...prev,
          payment: { url: "", type: "" },
          quality: { url: "", type: "" },
          pricePdf: { url: "", type: "" },
          apartmentImagesPdf: { url: "", type: "" },
        }));
        setImageSections([null]);
        setMarkerPosition({ lat: 0, lng: 0 });
      } else {
        toast.error(res?.message || "Failed to create project", {
          id: "apartment",
        });
        console.error("API error response:", res);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred", {
        id: "apartment",
      });
      console.error("Mutation error:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageSections((prev: File[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  return (
    <form className=" p-4 space-y-6" onSubmit={handleSubmit}>
      {/* Apartment component */}
      <ProjectsImages
        imageSections={imageSections}
        handleRemoveImage={handleRemoveImage}
        handleImageChange={handleImageChange}
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Contact info */}
          {apartmentDetailsData.map((field) => (
            <FormField
              key={field.id}
              type={field.type}
              step={field?.step}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
            />
          ))}

          {/* <div className="grid gap-3">
            <Label htmlFor="relevantLink">RelevantLink</Label>
            <Input
              id="relevantLink"
              name="relevantLink"
              defaultValue={invoice.relevantLink}
            />
          </div> */}

          <ImageUpload
            id="pricePdf"
            fileUrl={files.pricePdf?.url || ""}
            fileType={files.pricePdf?.type}
            onChange={handleFileChange("pricePdf")}
            label="Price Pdf"
            accept="application/pdf"
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
          <ImageUpload
            id="apartmentImages"
            fileUrl={files.apartmentImagesPdf?.url || ""}
            fileType={files.apartmentImagesPdf?.type}
            onChange={handleFileChange("apartmentImagesPdf")}
            label="ApartmentImages"
            accept="application/pdf"
          />
        </div>

        {/* Right Column */}
        <div>
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
            title="Sales Company Names"
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
            title="Features"
            specs={qualitySpecs}
            onChange={handleQualityChange}
            onAdd={() => handleInputAdd("")}
            onRemove={handleRemove}
          />
          {/* Sea View */}
          <SeaView
            specs={seaViewSpecs}
            onChange={handleSeaViewChange}
            onAdd={handleSeaViewAdd}
            onRemove={handleSeaViewRemove}
            title="Sea View Units"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl mb-24"
      >
        {isLoading ? "Processing..." : "Submit"}
      </Button>
    </form>
  );
}
