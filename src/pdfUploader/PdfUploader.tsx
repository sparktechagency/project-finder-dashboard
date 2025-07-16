import { Label } from "@/components/ui/label";

interface PdfUploaderProps {
  id: string;
  label: string;
  file: File | null;
  invoiceFile?: string | string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}

const PdfUploader = ({
  id,
  label,
  file,
  invoiceFile,
  onChange,
  imageUrl,
}: PdfUploaderProps) => {
  const getInvoiceLink = () => {
    const url =
      typeof invoiceFile === "string" ? invoiceFile : invoiceFile?.[0] || "";

    return url.startsWith("http") ? url : `${imageUrl}${url}`;
  };

  return (
    <div className="mt-2">
      <Label htmlFor={id} className="text-black">
        {label}
      </Label>
      <input
        id={id}
        type="file"
        accept="application/pdf"
        onChange={onChange}
        className="hidden"
      />
      <div
        className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer px-3 py-2"
        onClick={() => document.getElementById(id)?.click()}
      >
        {file ? (
          <span className="text-red-600">{file.name}</span>
        ) : invoiceFile ? (
          <a
            href={getInvoiceLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Edit PDF
          </a>
        ) : (
          <span className="text-4xl">+</span>
        )}
      </div>
    </div>
  );
};

export default PdfUploader;
