// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { useApprovedUserMutation } from "@/redux/apiSlice/usersTable/usersTable";
// import { useState } from "react";
// import toast from "react-hot-toast";

// interface UserApproveModalProps {
//   trigger: React.ReactNode;
//   data: any;
// }

// export default function UserApproveModal({
//   trigger,
//   data,
// }: UserApproveModalProps) {
//   const [approvedUser] = useApprovedUserMutation();
//   const [open, setOpen] = useState(false);

//   const handleApproved = async (tag: boolean) => {
//     try {
//       const res = await approvedUser({
//         userId: data?._id,
//         isAdminVerified: tag,
//       }).unwrap();

//       if (res.success) {
//         toast.success(res.message);
//       } else {
//         toast.error((res as any)?.error[0].message);
//       }
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "something went wrong",
//       );
//     } finally {
//       setOpen(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger>{trigger}</DialogTrigger>

//       <DialogContent className="space-y-4">
//         <p className="text-xl">Do you want to approve this user?</p>
//         <div className="grid grid-cols-2 gap-4">
//           <Button
//             disabled={!data?.isAdminVerified}
//             className="bg-red-700"
//             onClick={() => handleApproved(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             disabled={data?.isAdminVerified}
//             className="bg-green-800"
//             onClick={() => handleApproved(true)}
//           >
//             Approve
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useApprovedUserMutation } from "@/redux/apiSlice/usersTable/usersTable";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface UserApproveModalProps {
  trigger: React.ReactNode;
  data: any;
}

export default function UserApproveModal({
  trigger,
  data,
}: UserApproveModalProps) {
  const [approvedUser] = useApprovedUserMutation();

  const handleOpenSwal = async () => {
    const result = await Swal.fire({
      title: "Approve user?",
      text: "Do you want to approve this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#166534", // green-800
      cancelButtonColor: "#991b1b", // red-700
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await approvedUser({
        userId: data?._id,
        isAdminVerified: true,
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.error?.[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <span onClick={handleOpenSwal} className="inline-block cursor-pointer">
      {trigger}
    </span>
  );
}
