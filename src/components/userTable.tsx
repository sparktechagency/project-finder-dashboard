import { useGetAllUserQuery } from "@/redux/apiSlice/usersTable/usersTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { GetProfileImageUrl } from "./layout/shared/GetProfileImageUrl";
import Pagination from "./layout/shared/Pagination";
import { useState } from "react";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users = [], isLoading } = useGetAllUserQuery({
    page: currentPage,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  const usersData = users.data || [];

  return (
    <>
      {" "}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Account Open</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((users: any) => (
            <TableRow key={users._id}>
              <TableCell>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={GetProfileImageUrl(users.profile || "N/A")}
                  alt="Profile Picture"
                />
              </TableCell>
              <TableCell>{users.name || "N/A"}</TableCell>
              <TableCell>{users.role || "N/A"}</TableCell>
              <TableCell>{users.email || "N/A"}</TableCell>
              <TableCell className="pl-8">
                {users.isSubscribe === true ? "Yes" : "No"}
              </TableCell>
              <TableCell>{users.contact || "N/A"}</TableCell>
              <TableCell>{users.verified ? "Yes" : "No"}</TableCell>
              <TableCell>
                {new Date(users.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
      <p>sssssss</p>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          pagination={users?.pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default UserTable;
