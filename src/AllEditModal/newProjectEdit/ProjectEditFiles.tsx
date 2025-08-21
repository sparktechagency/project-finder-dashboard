import React from "react";
import PdfUploader from "@/pdfUploader/PdfUploader";
import { imageUrl } from "@/redux/api/baseApi";

interface Props {
  invoice: any;
  qualityFile: File | null;
  setQualityFile: React.Dispatch<React.SetStateAction<File | null>>;
  paymentFile: File | null;
  setPaymentFile: React.Dispatch<React.SetStateAction<File | null>>;
  priceFile: File | null;
  setPriceFile: React.Dispatch<React.SetStateAction<File | null>>;
  apartmentFile: File | null;
  setApartmentFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ProjectEditFiles({
  invoice,
  qualityFile,
  setQualityFile,
  paymentFile,
  setPaymentFile,
  priceFile,
  setPriceFile,
  apartmentFile,
  setApartmentFile,
}: Props) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Only PDF files are allowed");
    }
  };

  return (
    <>
      <PdfUploader
        id="qualitySpecificationPDF"
        label="QualitySpecification PDF"
        file={qualityFile}
        invoiceFile={invoice?.qualitySpecificationPDF}
        onChange={(e) => handleFileChange(e, setQualityFile)}
        imageUrl={imageUrl}
      />
      <PdfUploader
        id="paymentPlanPDF"
        label="PaymentPlan PDF"
        file={paymentFile}
        invoiceFile={invoice?.paymentPlanPDF}
        onChange={(e) => handleFileChange(e, setPaymentFile)}
        imageUrl={imageUrl}
      />
      <PdfUploader
        id="pricePdf"
        label="Price PDF"
        file={priceFile}
        invoiceFile={invoice?.pricePdf}
        onChange={(e) => handleFileChange(e, setPriceFile)}
        imageUrl={imageUrl}
      />
      <PdfUploader
        id="apartmentImagesPdf"
        label="Apartment Images PDF"
        file={apartmentFile}
        invoiceFile={invoice?.apartmentImagesPdf}
        onChange={(e) => handleFileChange(e, setApartmentFile)}
        imageUrl={imageUrl}
      />
    </>
  );
}
