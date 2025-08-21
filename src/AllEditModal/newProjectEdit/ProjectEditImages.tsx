// import React, { useEffect, useState } from "react";
// import ProjectsImagesEditModal from "../ProjectImagesEditModal";
// // import ProjectsImagesEditModal from "./ProjectImagesEditModal";

// interface Props {
//   invoice: any;
// }

// export default function ProjectEditImages({ invoice }: Props) {
// const [imageSections, setImageSections] = useState<
//   (File | { url: string })[]
// >([]);

// useEffect(() => {
//   if (invoice?.apartmentImage) {
//     const imageFiles = invoice.apartmentImage.map((image: string) => ({
//       url: image,
//     }));
//     setImageSections(imageFiles);
//   }
// }, [invoice]);

// const handleRemoveImage = (index: number) => {
//   setImageSections((prev) => prev.filter((_, i) => i !== index));
// };

// const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (!files) return;

//   const selectedFiles = Array.from(files);
//   setImageSections((prev) => [...prev, ...selectedFiles]);
// };

// images state
// const [imageSections, setImageSections] = useState<File[]>([]);
// const imageLinks = imageSections
//   ?.filter((item: any) => {
//     if (item?.url?.startsWith("/")) return item?.url;
//   })
//   .map((item: any) => item.url);

// const imageFiles = imageSections?.filter((item: any) => item instanceof File);

// useEffect(() => {
//   if (invoice?.apartmentImage || invoice.CompletionDate) {
//     const imageFiles = invoice.apartmentImage.map((image: string) => ({
//       url: image,
//     }));
//     setImageSections(imageFiles);
//   }
// }, [invoice]);

// const handleRemoveImage = (index: number) => {
//   setImageSections((prev: File[]) =>
//     prev.filter((_, i: number) => i !== index)
//   );
// };

// const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (!files) return;

//   const selectedFiles = Array.from(files);
//   setImageSections((prev) => [...prev, ...selectedFiles]);
// };

//   return (
//     <ProjectsImagesEditModal
//       imageSections={imageSections}
//       handleRemoveImage={handleRemoveImage}
//       handleAddImage={handleAddImage}
//     />
//   );
// }
