"use client";
import Button from "@/components/layout/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePushNotificationMutation } from "@/redux/apiSlice/pushNofification/pushNotification";
import toast from "react-hot-toast";

export default function PushNotification() {
  const [pushNotification] = useCreatePushNotificationMutation();
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [, setFile] = useState<File | null>(null);
  // const inputRef = useRef<HTMLInputElement>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   const validTypes = ["image/jpeg", "image/png", "image/jpg"];

  //   if (!validTypes.includes(file?.type as string)) {
  //     alert("Invalid file type. Please upload a JPEG, PNG, or JPG file.");
  //   }
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //     setFile(file);
  //   }
  // };

  // const handleClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Sending notification...", { id: "notification" });
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    // const image = formData.get("image");

    const payload = {
      title,
      description,
    };

    try {
      const res = await pushNotification(payload).unwrap();
      if (res.success) {
        toast.success(res.message || "Notification sent successfully", {
          id: "notification",
        });
        // e.currentTarget.reset();
      } else {
        toast.error(res.message || "Failed to send notification", {
          id: "notification",
        });
      }
    } catch (error) {
      toast.error((error as any)?.message || "Failed to send notification");
    }
  };
  return (
    <div className="max-w-md mx-auto  mt-[4%]">
      <h1 className="text-2xl font-semibold text-gray-700">
        Push Notification
      </h1>
      <div className="border border-gray-500 p-5 rounded mt-4">
        <form className=" text-white" onSubmit={handleSubmit}>
          <div className="mb-5">
            <Label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter notification title"
              className="w-full px-4 h-11  border border-gray-400  placeholder-gray-400 text-black"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 h-32  border border-gray-400  placeholder-gray-400 text-black"
            />
          </div>
          {/* image upload */}
          {/* <div>
            <Label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Image
            </Label>
            <div className="border rounded p-4" onClick={handleClick}>
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-[150px]" alt="" />
              ) : (
                <span className="text-gray-700">No Image</span>
              )}
            </div>
            <Input
              onChange={handleImageChange}
              type="file"
              id="image"
              className="w-full px-4 h-11  border border-gray-400  placeholder-gray-400 hidden"
              ref={inputRef}
            />
          </div> */}

          <Button
            className="w-full py-3 text-black cursor-pointer"
            htmlType="submit"
            style={{ backgroundColor: "#F79535", borderColor: "#188754" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
