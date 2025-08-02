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
import {
  useDeletePhaseMutation,
  useGetSinglePhaseQuery,
} from "@/redux/apiSlice/phase/phase";
import PhaseEditModal from "@/AllEditModal/PhaseEditModal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "@/components/layout/shared/Pagination";

interface ApartmentData {
  _id: string;
  isSold: boolean;
  phase: string;
  date: string;
  apartmentId: string;
  apartment: string;
}

export default function AddPhase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletePhase] = useDeletePhaseMutation(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");
  const {
    data: singlePhaseData,
    refetch,
    isFetching,
    isError,
    isLoading,
  } = useGetSinglePhaseQuery({ id: apartmentId, page: currentPage });
  const phaseData = singlePhaseData?.data;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const handleDeletePhase = async (id: string) => {
    const res = await deletePhase(id).unwrap();
    try {
      if (res?.success) {
        toast.success(res?.message || "delete successfully");
        refetch();
      } else {
        toast.error(res?.message || "delete failed ");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-2xl">Phase</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className=" rounded-tl-lg">Serial ID</TableHead>
            <TableHead className="">Sold</TableHead>
            <TableHead className="">Quater</TableHead>
            <TableHead className="">Year</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phaseData?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">
                {(currentPage - 1) * singlePhaseData.pagination.limit +
                  index +
                  1}
              </TableCell>
              <TableCell>
                {invoice.isSold === true ? "Sold" : "Not Sold"}
              </TableCell>
              <TableCell className="flex items-center gap-2 pl-5">
                {invoice.phase}
              </TableCell>

              <TableCell className="">
                {new Date(invoice.date).getFullYear()}
              </TableCell>

              <TableCell className="pl-3 flex items-center gap-3">
                <PhaseEditModal invoice={invoice} refetch={refetch} />
                <Trash
                  className="cursor-pointer  text-red-400"
                  onClick={() => handleDeletePhase(invoice?._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          pagination={singlePhaseData?.pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
