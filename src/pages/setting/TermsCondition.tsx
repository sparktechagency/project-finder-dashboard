import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Button from "@/components/layout/shared/Button";

export default function TermsCondition() {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const handleOnSave = (value: string) => {
    value;
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
        onClick={() => handleOnSave(content)}
        htmlType="submit"
        className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10"
      >
        Save
      </Button>
    </>
  );
}
