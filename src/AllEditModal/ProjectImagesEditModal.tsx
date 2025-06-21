import { Label } from "@/components/ui/label";
import { imageUrl } from "@/redux/api/baseApi";
import { IoMdClose } from "react-icons/io";

interface ApartmentImagesProps {
  imageSections: any; // This allows for both files and image URLs
  handleAddImage: any;
  handleRemoveImage: (idx: number) => void;
}

export default function ProjectsImagesEditModal({
  imageSections,
  handleAddImage,
  handleRemoveImage,
}: ApartmentImagesProps) {
  return (
    <div>
      <Label className="block mb-2 text-black font-medium ">
        Projects Images
      </Label>
      <div className="flex gap-2">
        <div className="grid grid-cols-3 gap-4 my-2">
          {imageSections.map((file: any, idx: any) => {
            return (
              <div
                key={idx}
                className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center relative group"
              >
                {file && (
                  <>
                    <img
                      src={
                        typeof file.url === "string"
                          ? file.url.startsWith("http")
                            ? file.url
                            : `${imageUrl}${file.url}`
                          : file instanceof File
                          ? URL.createObjectURL(file)
                          : ""
                      }
                      alt={`upload-${idx}`}
                      className="h-full w-full object-cover rounded-md"
                      onLoad={(e) => {
                        if (file instanceof File) {
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          );
                        }
                      }}
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 text-xs rounded-full hidden group-hover:flex items-center justify-center z-10 cursor-pointer"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => handleAddImage(e, idx)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple
                />
              </div>
            );
          })}
        </div>

        <div className="mt-2">
          <label className="w-24 h-24 border border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer text-xl text-gray-500 hover:bg-gray-100">
            +
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              className="hidden"
              multiple
            />
          </label>
        </div>
      </div>
    </div>
  );
}
