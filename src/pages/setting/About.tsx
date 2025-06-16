import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Button from "@/components/layout/shared/Button";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "@/redux/apiSlice/settings/settings";

export default function AboutUS() {
  const { data, isLoading, refetch } = useGetAboutQuery(undefined);
  const [updateAbout] = useUpdateAboutMutation();

  const editor = useRef(null);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.data?.text) {
      setContent(data?.data?.text || "");
    }
  }, [data]);

  if (isLoading) {
    return <span>Loading ....</span>;
  }
  // if (isError) {
  //   return <span>data not found ....</span>;
  // }

  const handleOnSave = async () => {
    const data = { text: content };
    await updateAbout(data);
    refetch();
  };
  return (
    <>
      <div className="">
        <div className="">
          <JoditEditor
            className="border-none "
            ref={editor}
            value={content}
            config={{ height: 550, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <Button
        onClick={handleOnSave}
        htmlType="submit"
        className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10"
      >
        Save
      </Button>
    </>
  );
}
