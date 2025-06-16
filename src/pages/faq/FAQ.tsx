import FAQModal from "@/modal/FAQModal";
import { useDeleteFaqMutation, useGetFaqQuery } from "@/redux/apiSlice/faq/faq";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";

export interface FaqItem {
  _id: string;
  question: string;
  ans: string;
}

const Faq = () => {
  const { data, isError, isLoading, refetch } = useGetFaqQuery(undefined);
  const [deleteFaq] = useDeleteFaqMutation();
  const [editFaq, setEditFaq] = useState<FaqItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq(id);
      toast.success("delete successfully");
      refetch();
    } catch {
      toast.error("delete failed");
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading FAQs</div>;
  }

  return (
    <>
      <div className=" bg-transparent duration-500 ">
        <div className="flex justify-end ">
          <FAQModal
            refetch={refetch}
            editFaq={editFaq}
            setEditFaq={setEditFaq}
            open={open}
            setOpen={setOpen}
          />
        </div>
        {data?.data?.map((item: FaqItem) => (
          <div
            key={item?._id}
            className="bg-[#F6F6F6] p-4 rounded-md space-y-2 mb-4"
          >
            {/* Question */}
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="text-[18px] font-normal leading-[30px] text-[#1F1F1F]">
                {item?.question}
              </h3>
              <div className="flex items-center gap-2.5">
                <span
                  onClick={() => {
                    setEditFaq(item);
                    setOpen(true);
                  }}
                >
                  <RiEditLine size={22} />
                </span>
                <span onClick={() => handleDelete(item?._id)}>
                  <MdOutlineClose size={24} className="text-red-500" />
                </span>
              </div>
            </div>

            {/* Answer */}
            <div>
              <p className="text-sm md:text-base text-[#81888C]">{item?.ans}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
