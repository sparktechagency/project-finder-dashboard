import React, { useState } from "react";
import AddCreateProject from "./AddCreateProject";

export default function ProjectForm() {
  const [imageSections, setImageSections] = useState<File[]>([]);

  const [qualitySpecs, setQualitySpecs] = useState<{ [key: string]: string }>({
    category: "",
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    setImageSections((prev) => [...prev, ...selectedFiles]);
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
      imageSections={imageSections}
      qualitySpecs={qualitySpecs}
      setQualitySpecs={setQualitySpecs}
      handleFileChange={handleFileChange}
      handleImageChange={handleImageChange}
      setImageSections={setImageSections}
      handleQualityChange={handleQualityChange}
      handleInputAdd={handleInputAdd}
      handleRemove={handleRemove}
      files={files}
      setFiles={setFiles}
    />
  );
}
