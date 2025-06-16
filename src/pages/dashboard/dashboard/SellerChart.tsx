import Loading from "@/components/layout/shared/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubscriberModal from "@/modal/SubscriberModal";

import {
  useDeleteSubscriberMutation,
  useGetSubscriberQuery,
} from "@/redux/apiSlice/subscriber/subscriber";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

type item = {
  user: {
    name: string;
  };
  package: {
    paymentType: string;
    duration: string;
  };
  remaining: string;

  price: string;
  commission: string;
};

export default function SellerChart() {
  const {
    data: subscriber,
    isLoading,
    refetch,
  } = useGetSubscriberQuery(undefined);
  const [deleteSubscriber] = useDeleteSubscriberMutation();
  const [userDetails, setUserDetails] = useState<item | false>(false);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubscriber(id);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Table>
        <TableHeader className="">
          <TableRow className="bg-[#F6F6F6] h-12 font-bold">
            <TableHead className="">Serial ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Plan Type </TableHead>
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Price</TableHead>
            {/* <TableHead className="">Commission</TableHead> */}
            <TableHead className="rounded-tr-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriber?.data?.slice(0, 4).map((item: any) => (
            <TableRow key={item._id} className="">
              <TableCell className="font-medium p-3">
                #{item?._id.slice(0, 4)}
              </TableCell>
              <TableCell>{item?.user?.name}</TableCell>
              <TableCell>{item?.package?.paymentType}</TableCell>
              <TableCell className="">{item?.package?.duration}</TableCell>
              <TableCell className="">€{item.price}</TableCell>
              {/* <TableCell className="">{item.remaining}%</TableCell> */}
              <TableCell
                className=" cursor-pointer "
                onClick={() => setUserDetails(item)}
              >
                <button className="mr-3 cursor-pointer">
                  <MdOutlineRemoveRedEye size={22} className="text-[#6CA0DC]" />
                </button>
                <button onClick={() => handleDelete(item?._id)}>
                  <RiDeleteBin6Line className=" text-[22px] cursor-pointer text-red-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* user details show */}
      {userDetails && (
        <SubscriberModal
          isOpen={!!userDetails}
          data={userDetails}
          onClose={() => setUserDetails(false)}
        />
      )}
    </>
  );
}
