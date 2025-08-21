import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BiSolidEditAlt } from "react-icons/bi";
import ProjectEditForm from "./ProjectEditForm";

export default function ProjectEditModal({ invoice }: { invoice: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BiSolidEditAlt size={24} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <ProjectEditForm invoice={invoice} />
      </DialogContent>
    </Dialog>
  );
}
