import { IoIosCheckmark } from "react-icons/io";
import { useState } from "react";

import { RiEditLine } from "react-icons/ri";
import { useGetSubscriptionsQuery } from "@/redux/subscriptions/subscriptions";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import DublicateSubscribeEditModal from "@/modal/DublicateSubscribeEditModal";

interface cardData {
  _id: string;
  title: string;
  price: number;
  month: string;
  description: string[];
  paymentType: string;
  duration?: string | number;
}
export default function Premium() {
  const { data, isLoading, isError } = useGetSubscriptionsQuery(undefined);
  const [edit, setEdit] = useState<{
    _id?: string;
    title: string;
    price?: number;
    description?: string[];
    paymentType?: string;
    duration?: string | number;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="grid grid-cols-4 space-x-6 space-y-5">
        {data?.data?.map((item: cardData) => (
          <div
            key={item._id}
            className="bg-[#F4F4F4] rounded-lg shadow-lg px-5 pt-4 border border-[#B1B1FF] flex flex-col w-[362px] h-[520px]"
          >
            <div className="flex items-center justify-between text-[#1A1E25] ">
              <h2 className="text-xl font-semibold text-center">
                {item.title === "Starter Plan" ? "Standard Plan" : item.title}
              </h2>
              <button onClick={() => setEdit(item)}>
                <RiEditLine size={22} className="cursor-pointer" />
              </button>
            </div>
            <div className="mt-8">
              <span className="text-2xl font-medium text-[#F79535]">
                € {item?.price}
              </span>
              <span className="text-sm text-[#1A1E25]">
                / {item.paymentType}
              </span>
            </div>
            <div className="mt-6 space-y-3 text-[#1A1E25] flex-grow">
              {item?.description?.map(
                (contentItem, index) =>
                  contentItem && (
                    <div key={index} className="flex items-center">
                      <span className="bg-[#484B51] h-4 w-4 mr-2 rounded-full">
                        <IoIosCheckmark className="text-white" />
                      </span>
                      <p className="text-sm text-[#81888C]">{contentItem}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <DublicateSubscribeEditModal
          edit={edit}
          isOpen={!!edit}
          onClose={() => setEdit(null)}
        />
      )}
    </>
  );
}
