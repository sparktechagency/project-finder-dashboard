import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  id: string;
  fileUrl: string;
  fileType?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  accept?: string;
}

export function ImageUpload({
  id,
  fileUrl,
  fileType,
  onChange,
  label,
  accept,
}: ImageUploadProps) {
  const isPdf =
    fileType === "application/pdf" || (fileUrl && fileUrl.endsWith(".pdf"));

  return (
    <div className="my-4">
      <Label htmlFor={id} className="mb-2 text-black">
        {label}
      </Label>
      <label
        htmlFor={id}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
      >
        {fileUrl ? (
          isPdf ? (
            <div className="flex items-center gap-2 px-2 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>{label} (PDF)</span>
            </div>
          ) : (
            <img
              src={fileUrl}
              alt={label}
              className="max-h-full object-contain"
            />
          )
        ) : (
          <span className="text-3xl">+</span>
        )}
      </label>
      <input
        type="file"
        name={id}
        accept={accept}
        onChange={onChange}
        id={id}
        className="hidden"
      />
    </div>
  );
}
