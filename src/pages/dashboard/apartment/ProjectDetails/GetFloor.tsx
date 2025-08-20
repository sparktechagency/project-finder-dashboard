import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import { imageUrl } from "@/redux/api/baseApi";

import EditFloorModal from "@/AllEditModal/EditFloorModal";
import {
  useDeleteFloorMutation,
  // useGetFloorQuery,
  useGetSingleFloorQuery,
} from "@/redux/apiSlice/floor/floor";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "@/components/layout/shared/Pagination";

interface ApartmentData {
  _id: string;
  apartmentImage: string;
  floorPlan: string;
  badSize: string;
  price: number;
  apartmentId: string;
  floorPlanPDF: string;
}

export default function GetFloor() {
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteFloor] = useDeleteFloorMutation(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");
  console.log(apartmentId, currentPage, "check floor");
  const {
    data: singleFloorData,
    isFetching,
    isError,
    isLoading,
  } = useGetSingleFloorQuery({ id: apartmentId, page: currentPage });
  const floorData = singleFloorData?.data;

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <ErrorPage />;

  const handleDeleteFloor = async (id: string) => {
    const res = await deleteFloor(id).unwrap();
    try {
      if (res?.success) {
        toast.success(res?.message || "delete successfully");
      } else {
        toast.error(res?.message || "delete failed ");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-2xl">Floor Plan</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className="rounded-tl-lg">Serial ID</TableHead>
            <TableHead>Projects Name</TableHead>
            <TableHead>floorPlanPDF</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {floorData?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium p-3">
                {(currentPage - 1) * singleFloorData.pagination.limit +
                  index +
                  1}
              </TableCell>
              <TableCell className="flex items-center gap-2 pl-12">
                {invoice.floorPlan}
              </TableCell>
              <TableCell>
                {invoice.floorPlanPDF ? (
                  <a
                    href={
                      invoice.floorPlanPDF.startsWith("http")
                        ? invoice.floorPlanPDF
                        : `${imageUrl}${invoice.floorPlanPDF}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="text-gray-500 italic">No PDF</span>
                )}
              </TableCell>

              <TableCell>€{invoice.price}</TableCell>
              <TableCell className="pl-3 flex items-center gap-3">
                <EditFloorModal invoice={invoice} />
                <Trash
                  className="cursor-pointer text-red-400"
                  onClick={() => handleDeleteFloor(invoice?._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          pagination={singleFloorData?.pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
