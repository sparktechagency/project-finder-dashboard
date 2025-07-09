/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AddCreateProject from "./AddCreateProject";
import { v4 as uuidv4 } from "uuid";
export default function ProjectForm() {
  const [imageSections, setImageSections] = useState<File[]>([]);

  const [qualitySpecs, setQualitySpecs] = useState<{ [key: string]: string }>({
    category: "",
  });

  // const [relivantLinks, setRelivantLinks] = useState<{ [key: string]: string }>(
  //   {
  //     links: "",
  //   }
  // );

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

  // project features
  const handleQualityChange = (key: string, value: string) => {
    setQualitySpecs((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleInputAdd = () => {
    const newKey = `feature_${uuidv4()}`;
    setQualitySpecs((prev) => ({ ...prev, [newKey]: "" }));
  };

  const handleRemove = (key: string) => {
    setQualitySpecs((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  // relivant links
  // const handleAddLinks = () => {
  //   const newLinks = `links_${uuidv4()}`;
  //   setRelivantLinks((prev) => ({ ...prev, [newLinks]: "" }));
  // };

  // const handleRemoveLinks = (key: string) => {
  //   setRelivantLinks((prev) => {
  //     const { [key]: _, ...rest } = prev;
  //     return rest;
  //   });
  // };

  // const onChangeRelivantLinks = (key: string, value: string) => {
  //   setRelivantLinks((prev) => {
  //     return {
  //       ...prev,
  //       [key]: value,
  //     };
  //   });
  // };

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
      // relivantLinks={relivantLinks}
      // handleAddLinks={handleAddLinks}
      // handleRemoveLinks={handleRemoveLinks}
      // onChangeRelivantLinks={onChangeRelivantLinks}
    />
  );
}
