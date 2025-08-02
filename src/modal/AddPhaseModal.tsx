import { quater } from "@/components/layout/shared/AllName";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSingleFloorQuery } from "@/redux/apiSlice/floor/floor";
import { useCreatePhaseDetailsMutation } from "@/redux/apiSlice/phase/phase";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddPhaseModal({ apartment }: { apartment: string }) {
  const [createPhaseDetails] = useCreatePhaseDetailsMutation();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState("");
  const { refetch } = useGetSingleFloorQuery(apartment);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phase = data.get("phase");
    const isSold = data.get("isSold");

    const formData = {
      apartment,
      phase,
      isSold,
      date: selectedDate,
    };

    //  if (phase && selectedDate) {
    //   const result = {
    //     apartment,
    //     phase,
    //     date: selectedDate,
    //    };

    try {
      const res = await createPhaseDetails(formData).unwrap();
      if (res.success) {
        toast.success("Phase created successfully");
        refetch();
        form.reset();
      } else {
        toast.error("Failed to create phase ");
      }
    } catch {
      toast.error("Error creating phase ");
    } finally {
      setSelectedDate(undefined);
      setIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setSelect(value);
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
          <div className="grid gap-4 my-4">
            <div>
              <Label className="mb-2" htmlFor="isSold">
                Sold
              </Label>
              <Select name="isSold">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Sold</SelectItem>
                    <SelectItem value="false">Not Sold</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="my-4">
              <Label htmlFor="phase" className="mb-2 text-black">
                Quater
              </Label>
              <Select name="phase" value={select} onValueChange={handleSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select quater" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {quater.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label>Date</Label>
              <Input
                id="date"
                name="date"
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="YYYY"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
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
