import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import SelectItems from "./SelectItem";

import { useCreateProjectMutation } from "@/redux/apiSlice/apartments/apartments";
import toast from "react-hot-toast";
import ProjectsImages from "./ProjectsImage";
import {
  company,
  location,
  propertyType,
} from "@/components/layout/shared/AllName";
import { apartmentDetailsData } from "@/demoData/AllDemoData";
import SeaView from "./seaView";
import { Label } from "@/components/ui/label";
import YearMultiSelect from "./YearSelected";
import { useNavigate } from "react-router-dom";
import LocationPicker2 from "../map/NewMap";

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
  const navigate = useNavigate();
  const [selectValues, setSelectValues] = useState({
    propertyType: "",
    location: "",
    locationTwo: "",
    salesCompany: "",
  });
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const [seaViewBoolean, setSeaViewBoolean] = useState(false);

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

    // Location;
    if (!markerPosition) {
      toast.error("Please select a location on the map.");
      console.error("No marker position selected.");
      return;
    }
    formData.append("latitude", markerPosition.lat.toString());
    formData.append("longitude", markerPosition.lng.toString());

    // Selects
    Object.entries(selectValues).forEach(([key, val]) =>
      formData.append(key, val)
    );

    if (selectedYears.length > 0) {
      selectedYears.forEach((year) => formData.append("CompletionDate", year));
    }

    // sea views boolen
    formData.append("seaViewBoolean", JSON.stringify(seaViewBoolean));

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
        setSelectedYears([]);
        navigate("/projects");
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
          <LocationPicker2
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />

          {/* property type */}
          <SelectItems
            options={propertyType}
            title="Property Type"
            placeholder="Select Property Type"
            value={selectValues.propertyType}
            onSelect={(value) => handleSelectChange("propertyType", value)}
          />
          {/* location */}
          <SelectItems
            options={location}
            title="Location Costa Del Sol"
            placeholder="Select location"
            value={selectValues.location}
            onSelect={(value) => handleSelectChange("location", value)}
          />
          {/* location */}
          <SelectItems
            options={location}
            title="Location Costa Blanca (Optional and Beta)"
            placeholder="Select location"
            value={selectValues.locationTwo}
            onSelect={(value) => handleSelectChange("locationTwo", value)}
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
          {/* <SelectItems
            options={completionYear}
            title="Completion Year"
            placeholder="Select completionYear"
            value={selectValues.completionYear}
            onSelect={(value) => handleSelectChange("completionYear", value)}
          /> */}

          {/* <Label className="text-black">Completion Year</Label> */}

          <YearMultiSelect
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
          />

          <Label className="text-gray-900">Sea Views</Label>
          <div
            onClick={() => setSeaViewBoolean(!seaViewBoolean)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer mt-2 ${
              seaViewBoolean ? "bg-[#0288A6]" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full ${
                seaViewBoolean
                  ? "bg-linear-65 from-[#074E5E] to-[#0288A6]"
                  : "bg-[#8CBBC6]"
              } transition-transform ${
                seaViewBoolean ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>

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
