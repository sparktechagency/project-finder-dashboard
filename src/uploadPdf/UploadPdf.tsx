import { Label } from "@/components/ui/label";
import { useRef } from "react";

interface UploadPdfProps {
  inputId: string; // ✅ New
  pdfFile: File | null;
  onFileChange: (file: File | null) => void;
  existingPdfUrl?: string;
  imageUrlPrefix?: string;
  label?: string;
}

export default function UploadPdf({
  inputId,
  pdfFile,
  onFileChange,
  existingPdfUrl,
  imageUrlPrefix = "",
  label = "Floor Plan (PDF)",
}: UploadPdfProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    onFileChange(file);
  };

  const computedPdfUrl =
    existingPdfUrl && !existingPdfUrl.startsWith("http")
      ? `${imageUrlPrefix}${existingPdfUrl}`
      : existingPdfUrl;

  return (
    <div>
      <Label htmlFor={inputId} className="text-black">
        {label}
      </Label>
      <input
        id={inputId}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      <div
        className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
        onClick={() => inputRef.current?.click()}
      >
        {pdfFile ? (
          <span className="text-red-600">{pdfFile.name}</span>
        ) : computedPdfUrl ? (
          <a
            href={computedPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
            onClick={(e) => e.stopPropagation()}
          >
            View PDF
          </a>
        ) : (
          <span className="text-4xl">+</span>
        )}
      </div>
    </div>
  );
}
