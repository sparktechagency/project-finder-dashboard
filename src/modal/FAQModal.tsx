import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "@/redux/apiSlice/faq/faq";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

interface FAQModalProps {
  refetch: () => void;
  editFaq: any;
  setEditFaq: (faq: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FAQModal({
  refetch,
  editFaq,
  setEditFaq,
  open,
  setOpen,
}: FAQModalProps) {
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation(); // Assuming updateFaq uses the same mutation as createFaq

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const question = data.get("question");
    const answer = data.get("answer");

    if (question && answer) {
      try {
        if (editFaq?._id) {
          await updateFaq({ id: editFaq._id, data: { question, ans: answer } });
          toast.success("FAQ updated successfully");
        } else {
          await createFaq({ question, ans: answer });
          toast.success("FAQ created successfully");
        }
        form.reset();
        refetch();
        setOpen(false); // Close modal
      } catch {
        toast.error("failed faq");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-[#1D7889] text-white p-2 flex items-center gap-2 rounded-sm cursor-pointer mb-4"
          onClick={() => {
            setEditFaq(null); // Ensure it's cleared
            setOpen(true); // Open in add mode
          }}
        >
          <LuPlus />
          Add FAQ
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle> {editFaq?._id ? "Edit Faq" : " Add FAQ"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 mt-5">
            <Label htmlFor="question">Question</Label>
            <Input
              defaultValue={editFaq?.question || ""}
              id="question"
              name="question"
              placeholder="Enter question"
              required
            />

            <Label htmlFor="answer">Answer</Label>
            <Textarea
              defaultValue={editFaq?.ans || ""}
              id="answer"
              name="answer"
              placeholder="Enter answer"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#1D7889] text-white h-10 hover:bg-[#1D7889] cursor-pointer mt-5"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
