import { Label } from "@/components/ui/label";
import { IoMdClose } from "react-icons/io";

interface ApartmentImagesProps {
  imageSections: File[];
  handleImageChange: any;
  handleRemoveImage: (idx: number) => void;
}

export default function ProjectsImages({
  imageSections,
  handleImageChange,
  handleRemoveImage,
}: ApartmentImagesProps) {
  return (
    <div>
      <Label className="block mb-2 text-black font-medium ">
        Projects Images
      </Label>
      <div className="flex items-center space-x-4">
        {imageSections.map((file, idx) => (
          <div
            key={idx}
            className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center relative group"
          >
            {file ? (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`upload-${idx}`}
                  className="h-full w-full object-cover rounded-md"
                  onLoad={(e) =>
                    URL.revokeObjectURL((e.target as HTMLImageElement).src)
                  }
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
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}

            {/* Hidden file input for replacement */}
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleImageChange(e, idx)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple
            />
          </div>
        ))}

        <label className="w-24 h-24 border border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer text-xl text-gray-500 hover:bg-gray-100">
          +
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </label>
      </div>
    </div>
  );
}
