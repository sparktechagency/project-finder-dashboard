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
import { useCreatePhaseDetailsMutation } from "@/redux/apiSlice/phase/phase";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddPhaseModal({ apartment }: { apartment: string }) {
  const [createPhaseDetails] = useCreatePhaseDetailsMutation();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phase = data.get("phase");

    if (phase && selectedDate) {
      const data = {
        apartment,
        phase,
        date: selectedDate,
      };
      try {
        const res = await createPhaseDetails(data).unwrap();
        if (res.success) {
          toast.success("Phase details created successfully");
          form.reset();
        } else {
          toast.error("Failed to create phase details");
        }
      } catch (error) {
        console.error("Error creating phase details:", error);
      } finally {
        setSelectedDate(undefined); // Reset date after submit
        setIsOpen(false); // Close the dialog after submission
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="border border-gray-300 px-4 py-2 rounded-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Add phase
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Phase</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="phase">Phase</Label>
              <Input
                id="phase"
                name="phase"
                placeholder="Enter phase"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label>Date</Label>
              <input
                type="date"
                name="date"
                onChange={(e) => {
                  const date = e.target.value;
                  if (date) {
                    setSelectedDate(date);
                  } else {
                    setSelectedDate(undefined);
                  }
                }}
                value={selectedDate ? selectedDate : ""}
                style={{
                  height: 45,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  width: "100%",
                }}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#1D7889] text-white mt-6 hover:bg-[#1D7889] cursor-pointer"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
