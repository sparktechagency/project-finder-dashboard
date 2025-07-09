// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { FormField } from "./FormField";
// import { ImageUpload } from "./ImageUpload";
// import { QualitySpecsInput } from "./QualitySpecsInput";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import SelectItems from "./SelectItem";
// import LocationPicker from "../map/Map";
// import { useCreateProjectMutation } from "@/redux/apiSlice/apartments/apartments";
// import toast from "react-hot-toast";
// import ProjectsImages from "./ProjectsImage";
// import {
//   company,
//   completionYear,
//   location,
// } from "@/components/layout/shared/AllName";
// // import RelivantLink from "@/pages/relivantLink/RelivantLink";

// interface ApartmentFormProps {
//   files: {
//     [key: string]: {
//       url: string;
//       type?: string;
//     };
//   };
//   setFiles: any;
//   setImageSections: any;
//   imageSections: File[];
//   qualitySpecs: { [key: string]: string };

//   setQualitySpecs: React.Dispatch<
//     React.SetStateAction<{ [key: string]: string }>
//   >;

//   handleFileChange: (
//     key: "payment" | "quality" | "floor" | "pricePdf"
//   ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

//   handleImageChange: (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => void;

//   handleQualityChange: (value: string, key: string) => void;
//   handleInputAdd: (key: string) => void;
//   handleRemove: (key: string) => void;

//   // relivant links
//   relivantLinks: { [key: string]: string };
//   handleRemoveLinks: (key: string) => void;
//   handleAddLinks: (key: string) => void;
//   onChangeRelivantLinks: (value: string, key: string) => void;
// }

// export default function AddCreateProject({
//   // images,
//   files,
//   setFiles,
//   imageSections,
//   setImageSections,
//   qualitySpecs,
//   setQualitySpecs,
//   handleFileChange,
//   handleImageChange,
//   handleQualityChange,
//   handleInputAdd,
//   handleRemove,
//   // relivant links
//   relivantLinks,
//   handleAddLinks,
//   handleRemoveLinks,
//   onChangeRelivantLinks,
// }: ApartmentFormProps) {
//   const [createProject] = useCreateProjectMutation();
//   const [right, setRight] = useState(true);
//   const [selectValues, setSelectValues] = useState({
//     propertyType: "",
//     location: "",
//     salesCompany: "",
//     completionYear: "",
//   });

//   const [markerPosition, setMarkerPosition] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);

//   const handleSelectChange = (field: string, value: string) => {
//     setSelectValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleRemoveImage = (index: number) => {
//     setImageSections((prev: File[]) =>
//       prev.filter((_, i: number) => i !== index)
//     );
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   toast.loading("Processing...", { id: "success" });
//   //   e.stopPropagation();
//   //   e.preventDefault();

//   //   console.log(relivantLinks, "check links");
//   //   console.log(qualitySpecs, "features");
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     toast.loading("Processing...", { id: "success" });
//     e.stopPropagation();
//     e.preventDefault();

//     console.log(relivantLinks, "check links");

//     const form = e.currentTarget as HTMLFormElement;
//     const data = new FormData(form);
//     const values = Object.fromEntries(data.entries());

//     const formData = new FormData();

//     ["apartmentName", "commission"].forEach((key) => {
//       const val = values[key];
//       if (val) formData.append(key, val as string);
//     });

//     // company name
//     const companyName = data.get("companyName") as string;
//     formData.append("companyName", companyName);

//     // Append payment plan image
//     const paymentFile = data.get("paymentPlanPDF");

//     const pricePdf = data.get("pricePdf");
//     if (pricePdf && pricePdf instanceof File) {
//       formData.append("pricePdf", pricePdf);
//     }

//     if (paymentFile && paymentFile instanceof File) {
//       formData.append("paymentPlanPDF", paymentFile);
//     }

//     imageSections.forEach((file) => {
//       if (file instanceof File) {
//         formData.append("apartmentImage", file);
//       }
//     });

//     if (!imageSections || imageSections.length === 0) {
//       toast.error("Please upload at least one apartment image.");
//       return;
//     }

//     // Append quality specification PDF
//     const quality = data.get("quality");
//     if (quality && quality instanceof File) {
//       formData.append("qualitySpecificationPDF", quality);
//     }

//     // Append nested contact
//     const contactData = {
//       phone: values.contact,
//       email: values.email,
//       companyName: values.companyName,
//     };

//     formData.append("contact", JSON.stringify(contactData));

//     // relivant links
//     // const relivantLinksArray = Object.values(relivantLinks).filter(
//     //   (value) => value.trim() !== ""
//     // );

//     // relivantLinksArray.forEach((link) => {
//     //   formData.append("relevantLink", link);
//     // });

//     // feature

//     const featuresArray = Object.values(qualitySpecs).filter(
//       (value) => value.trim() !== ""
//     );

//     featuresArray.forEach((feature) => {
//       formData.append("features", feature);
//     });

//     // Append coordinates
//     if (markerPosition) {
//       formData.append("latitude", markerPosition.lat.toString());
//       formData.append("longitude", markerPosition.lng.toString());
//     }

//     // Append select values
//     formData.append("propertyType", selectValues.propertyType);
//     formData.append("location", selectValues.location);
//     formData.append("salesCompany", selectValues.salesCompany);
//     formData.append(
//       "CompletionDate",
//       new Date(selectValues.completionYear).toISOString()
//     );

//     try {
//       const res = await createProject(formData).unwrap();

//       if (res.message) {
//         toast.success("Project created successfully", { id: "success" });
//         form.reset();
//         // reset features
//         setQualitySpecs({ category: "" });

//         // Reset file input
//         setFiles((prev: any) => ({
//           ...prev,
//           payment: { url: "", type: "" },
//           quality: { url: "", type: "" },
//           pricePdf: { url: "", type: "" },
//         }));

//         // Reset image sections
//         setImageSections([null]);

//         // map marker position
//         setMarkerPosition({ lat: 0, lng: 0 });
//       } else {
//         toast.error(res?.message || "Failed to create project", {
//           id: "success",
//         });
//       }
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || "An error occurred";
//       toast.error(errorMessage, { id: "success" });
//     }
//   };

//   return (
//     <form className=" p-4 space-y-6" onSubmit={handleSubmit}>
//       {/* Apartment component */}
//       <ProjectsImages
//         imageSections={imageSections}
//         handleRemoveImage={handleRemoveImage}
//         handleImageChange={handleImageChange}
//       />

//       <div className="grid grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div>
//           {/* company name */}

//           <FormField
//             type="text"
//             id="apartmentName"
//             label="Project Name"
//             placeholder="Enter Project Name"
//           />
//           <FormField
//             type="number"
//             id="commission"
//             label="Commission Percentage"
//             placeholder="Enter Commission"
//           />

//           <ImageUpload
//             id="pricePdf"
//             fileUrl={files.pricePdf?.url || ""}
//             fileType={files.pricePdf?.type}
//             onChange={handleFileChange("pricePdf")}
//             label="Price Pdf"
//             accept="application/pdf"
//           />
//           <ImageUpload
//             id="paymentPlanPDF"
//             fileUrl={files.payment?.url || ""}
//             fileType={files.payment?.type}
//             onChange={handleFileChange("payment")}
//             label="Payment Plan"
//             accept="application/pdf"
//           />

//           <ImageUpload
//             id="quality"
//             fileUrl={files.quality?.url || ""}
//             fileType={files.quality?.type}
//             onChange={handleFileChange("quality")}
//             label="Quality Specification"
//             accept="application/pdf"
//           />

//           <div className="flex justify-between items-center cursor-pointer text-black">
//             <span>Sales Contact Info</span>
//             <span onClick={() => setRight((prev) => !prev)}>
//               {right ? <IoIosArrowDown /> : <IoIosArrowUp />}
//             </span>
//           </div>

//           {/* contact form */}

//           <FormField
//             type="text"
//             id="contact"
//             label="Contact Number"
//             placeholder="Enter Contact Number"
//           />
//           <FormField
//             type="text"
//             id="email"
//             label="Email"
//             placeholder="Enter Your Email"
//           />
//           <FormField
//             type="text"
//             id="companyName"
//             label="Developer Name"
//             placeholder="Enter Developer name"
//           />

//           {/* <RelivantLink
//             links={relivantLinks}
//             onChange={onChangeRelivantLinks}
//             onAdd={() => handleAddLinks("")}
//             onRemove={handleRemoveLinks}
//           /> */}

//         </div>

//         {/* Right Column */}

//         <div>
//           {/* map */}
//           <LocationPicker
//             markerPosition={markerPosition}
//             setMarkerPosition={setMarkerPosition}
//           />

//           {/* property type */}
//           <SelectItems
//             options={["Apartment", "Villa", "Townhouse"]}
//             title="Property Type"
//             placeholder="Select Property Type"
//             value={selectValues.propertyType}
//             onSelect={(value) => handleSelectChange("propertyType", value)}
//           />
//           {/* location */}
//           <SelectItems
//             options={location}
//             title="Location"
//             placeholder="Select location"
//             value={selectValues.location}
//             onSelect={(value) => handleSelectChange("location", value)}
//           />
//           {/* sales company */}
//           <SelectItems
//             options={company}
//             title="Sales Company Names"
//             placeholder="Select company Name"
//             value={selectValues.salesCompany}
//             onSelect={(value) => handleSelectChange("salesCompany", value)}
//           />
//           {/* completion year */}
//           <SelectItems
//             options={completionYear}
//             title="Completion Year"
//             placeholder="Select year"
//             value={selectValues.completionYear}
//             onSelect={(value) => handleSelectChange("completionYear", value)}
//           />

//           <QualitySpecsInput
//             title="Features"
//             specs={qualitySpecs}
//             onChange={handleQualityChange}
//             onAdd={() => handleInputAdd("")}
//             onRemove={handleRemove}
//           />
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl mb-24"
//       >
//         Submit
//       </Button>
//     </form>
//   );
// }

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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
    key: "payment" | "quality" | "floor" | "pricePdf"
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
    toast.loading("Processing...", { id: "success" });
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

    const pricePdf = data.get("pricePdf");
    if (pricePdf && pricePdf instanceof File) {
      formData.append("pricePdf", pricePdf);
    }

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
        toast.success("Project created successfully", { id: "success" });
        form.reset();
        // reset features
        setQualitySpecs({ category: "" });

        // Reset file input
        setFiles((prev: any) => ({
          ...prev,
          payment: { url: "", type: "" },
          quality: { url: "", type: "" },
          pricePdf: { url: "", type: "" },
        }));

        // Reset image sections
        setImageSections([null]);

        // map marker position
        setMarkerPosition({ lat: 0, lng: 0 });
      } else {
        toast.error(res?.message || "Failed to create project", {
          id: "success",
        });
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "An error occurred";
      toast.error(errorMessage, { id: "success" });
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
            title="feature"
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
