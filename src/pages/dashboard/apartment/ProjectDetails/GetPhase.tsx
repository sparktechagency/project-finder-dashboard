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
  useGetPhaseDetailsQuery,
} from "@/redux/apiSlice/phase/phase";
import PhaseEditModal from "@/AllEditModal/PhaseEditModal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface ApartmentData {
  _id: string;
  phase: string;
  date: string;
  apartmentId: string;
  apartment: string;
}

export default function AddPhase() {
  const { data, isFetching, isError, isLoading } =
    useGetPhaseDetailsQuery(undefined);
  const [deletePhase] = useDeletePhaseMutation(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");

  const phaseDetails =
    data?.data?.filter((item: ApartmentData) => {
      return item.apartment === apartmentId;
    }) || [];

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
            <TableHead className="">Quater</TableHead>
            <TableHead className="">Year</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phaseDetails?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">{index + 1}</TableCell>
              <TableCell className="flex items-center gap-2 pl-5">
                {invoice.phase}
              </TableCell>

              <TableCell className="">
                {new Date(invoice.date).getFullYear()}
              </TableCell>

              <TableCell className="pl-3 flex items-center gap-3">
                <PhaseEditModal invoice={invoice} />
                <Trash
                  className="cursor-pointer"
                  onClick={() => handleDeletePhase(invoice?._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
