import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserModal from "@/modal/ApartmentModal";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/redux/apiSlice/apartments/apartments";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import AddPhaseModal from "@/modal/AddPhaseModal";
import ApartmentCreateModal from "@/modal/AddFloorModal";
import { imageUrl } from "@/redux/api/baseApi";

interface ApartmentData {
  _id: string;
  apartmentImage: string;
  apartmentName: string;
  commission: string;
  price: number;
  paymentPlanPDF: string;
  qualitySpecificationPDF: string;
  location: string;
  CompletionDate: string;
  contact: {
    location: string;
  };
}

export default function Projects() {
  const { data, isFetching, isError, isLoading } =
    useGetProjectsQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<ApartmentData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(
    null
  );

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this apartment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProject(id);

        Swal.fire("Deleted!", "The deleteProject has been deleted.", "success");
      }
    });
  };

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <div className="flex justify-end mb-3">
        <button
          className="bg-[#fcebd9] rounded-[10px] px-5 py-2 flex items-center text-sm font-medium text-[#1f1f1f] cursor-pointer"
          onClick={() => navigate("/projectForm")}
        >
          <span className="text-lg font-bold mr-2">+</span> Add Project
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead>Serial ID</TableHead>
            <TableHead>Projects Name</TableHead>
            <TableHead>Payment Plan</TableHead>
            <TableHead>Quality Specification</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Completion Year</TableHead>
            <TableHead>Add Floor</TableHead>
            <TableHead>Add Phase</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium pl-4">{index + 1}</TableCell>
              <TableCell>{invoice.apartmentName}</TableCell>
              <TableCell>
                <a
                  href={
                    invoice.paymentPlanPDF?.startsWith("http")
                      ? invoice.paymentPlanPDF
                      : `${imageUrl}${invoice.paymentPlanPDF}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  View PDF
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={
                    invoice.qualitySpecificationPDF?.[0]?.startsWith("http")
                      ? invoice.qualitySpecificationPDF?.[0]
                      : `${imageUrl}${invoice.qualitySpecificationPDF?.[0]}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  View PDF
                </a>
              </TableCell>
              <TableCell>{invoice.location}</TableCell>
              <TableCell className="pl-9">{invoice.commission}%</TableCell>
              <TableCell>€{invoice.price}</TableCell>
              <TableCell className="">
                {invoice.CompletionDate
                  ? new Date(invoice.CompletionDate).toISOString().split("T")[0]
                  : null}
              </TableCell>
              <TableCell>
                <button
                  className="border border-gray-300 px-4 py-2 rounded-2xl cursor-pointer"
                  onClick={() => {
                    setSelectedApartmentId(invoice._id);
                    setOpenModal(true);
                  }}
                >
                  Add floor
                </button>
              </TableCell>
              <TableCell>
                <AddPhaseModal apartment={invoice._id} />
              </TableCell>
              <TableCell>
                <button
                  className="mr-3"
                  onClick={() =>
                    navigate(`/projects-details?id=${invoice?._id}`)
                  }
                >
                  <MdOutlineRemoveRedEye
                    size={22}
                    className="text-[#6CA0DC] cursor-pointer"
                  />
                </button>
                <button onClick={() => handleDelete(invoice._id)}>
                  <RiDeleteBin6Line className="text-[22px] text-red-400 cursor-pointer" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userDetails && (
        <UserModal
          isOpen={!!userDetails}
          data={userDetails}
          onClose={() => setUserDetails(null)}
        />
      )}

      {openModal && selectedApartmentId && (
        <ApartmentCreateModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          apartmentId={selectedApartmentId}
        />
      )}
    </>
  );
}
