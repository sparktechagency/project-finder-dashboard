import { useGetAllUserQuery } from "@/redux/apiSlice/usersTable/usersTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar } from "./ui/avatar";

const UserTable = () => {
  const { data: users = [], isLoading } = useGetAllUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  const usersData = users.data || [];
  console.log("Users Data:=====>>>>", usersData);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
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
                src={users.profile || "N/A"}
                alt="Profile Picture"
              />
            </TableCell>
            <TableCell>{users.name || "N/A"}</TableCell>
            <TableCell>{users.role || "N/A"}</TableCell>
            <TableCell>{users.email || "N/A"}</TableCell>
            <TableCell>{users.contact || "N/A"}</TableCell>
            <TableCell>{users.verified ? "Yes" : "No"}</TableCell>
            <TableCell>
              {new Date(users.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
