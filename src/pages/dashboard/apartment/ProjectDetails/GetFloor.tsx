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
import { useGetFloorQuery } from "@/redux/apiSlice/floor/floor";

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
  const { data, isFetching, isError, isLoading } = useGetFloorQuery(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");

  const details =
    data?.data?.apartments?.find(
      (apt: ApartmentData) => apt._id === apartmentId
    )?.floorPlans || [];

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <ErrorPage />;

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
          {details.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium p-3">{index + 1}</TableCell>
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
              <TableCell className="pl-3">
                <EditFloorModal invoice={invoice} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
