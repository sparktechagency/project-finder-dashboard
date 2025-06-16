import React, { useState } from "react";
import AddCreateProject from "./AddCreateProject";

export default function ProjectForm() {
  // const [images, setImages] = useState<{
  //   payment?: string;
  //   quality?: string;
  //   floor?: string;
  // }>({});
  const [imageSections, setImageSections] = useState<(File | null)[]>([]);
  const [qualitySpecs, setQualitySpecs] = useState<{ [key: string]: string }>({
    category: "",
    generalAmenites: "",
    connectivity: "",
    ecoFriendly: "",
    parking: "",
    receational: "",
    accessiblity: "",
    nearbyFacilities: "",
  });

  // const handleFileChange =
  //   (key: keyof typeof images) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;
  //     setImages((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  //   };

  type FileData = {
    url: string;
    type: string;
  };

  const [files, setFiles] = React.useState<Record<string, FileData>>({});

  const handleFileChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFiles((prev) => ({
        ...prev,
        [key]: {
          url: URL.createObjectURL(file),
          type: file.type,
        },
      }));
    };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    setImageSections((prev) => {
      const newArr = [...prev];
      newArr[index] = file;
      return newArr;
    });
  };

  const addImageSection = () => {
    setImageSections((prev) => [...prev, null]);
  };

  const handleQualityChange = (key: string, value: string) => {
    setQualitySpecs((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleInputAdd = () => {
    const newKey = `feature_${Date.now()}`;
    setQualitySpecs((prev) => ({ ...prev, [newKey]: "" }));
  };

  const handleRemove = (key: string) => {
    setQualitySpecs((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AddCreateProject
      // images={images}
      // @ts-expect-error imageSections prop type mismatch with ApartmentFormChild, intentional for now
      imageSections={imageSections}
      qualitySpecs={qualitySpecs}
      handleFileChange={handleFileChange}
      handleImageChange={handleImageChange}
      addImageSection={addImageSection}
      handleQualityChange={handleQualityChange}
      handleInputAdd={handleInputAdd}
      handleRemove={handleRemove}
      files={files}
    />
  );
}
