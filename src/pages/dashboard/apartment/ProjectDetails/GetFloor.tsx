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
import { useState } from "react";
import Pagination from "@/components/layout/shared/Pagination";
import { useGetProjectsFloorQuery } from "@/redux/apiSlice/apartments/apartments";

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
  const { data, isFetching, isError, isLoading } =
    useGetProjectsFloorQuery(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");

  const details =
    data?.data?.apartments?.find(
      (apt: ApartmentData) => apt._id === apartmentId
    )?.floorPlans || [];

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(details.length / itemsPerPage);
  const paginatedItems = details.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium p-3">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell className="flex items-center gap-2 pl-12">
                {invoice.floorPlan}
              </TableCell>
              <TableCell>
                <a
                  href={
                    invoice.floorPlanPDF?.startsWith("http")
                      ? invoice.floorPlanPDF
                      : `${imageUrl}${invoice.floorPlanPDF}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  View PDF
                </a>
              </TableCell>
              <TableCell>€{invoice.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
