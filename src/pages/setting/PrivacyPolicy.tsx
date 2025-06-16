import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  useCreatePolicyMutation,
  useGetPrivacyQuery,
} from "@/redux/apiSlice/settings/settings";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const { data, isError, isLoading, refetch } = useGetPrivacyQuery(undefined);
  const [createPolicy] = useCreatePolicyMutation();
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
  if (isError) {
    return <span>data not found ....</span>;
  }

  const handleOnSave = async () => {
    const data = { text: content };
    await createPolicy(data);
    refetch();
  };
  return (
    <>
      <div className="">
        <div className="">
          <JoditEditor
            className="border-none"
            ref={editor}
            value={content}
            config={{ height: 550, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <Button
        onClick={handleOnSave}
        type="submit"
        className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10"
      >
        Save
      </Button>
    </>
  );
}
