import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePhaseDetailsMutation } from "@/redux/apiSlice/phase/phase";

import toast from "react-hot-toast";

import { BiSolidEditAlt } from "react-icons/bi";
import { quater } from "@/components/layout/shared/AllName";
import { useEffect, useState } from "react";

export default function PhaseEditModal({
  invoice,
  refetch,
}: {
  invoice: any;
  refetch: any;
}) {
  const [updatePhaseDetails] = useUpdatePhaseDetailsMutation();
  const [select, setSelect] = useState<{
    phase: string;
    isSold: boolean;
  }>({ phase: "", isSold: false });

  const [selectDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (invoice?.date || invoice.phase || invoice.isSold) {
      setSelect({
        phase: invoice.phase || "",
        isSold: invoice.isSold ?? false,
      });
      const year = new Date(invoice.date).getFullYear().toString();
      setSelectedDate(year);
    }
  }, [invoice]);

  const handleSelect = (field: "phase" | "isSold", value: string) => {
    setSelect((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const isSold = data.get("isSold");
    const phase = data.get("phase");
    const date = data.get("date");

    // If your backend expects full date format, convert year to ISO date
    const updatePhase = {
      isSold,
      phase,
      date: date ? `${date}` : undefined,
    };

    try {
      const res = await updatePhaseDetails({
        id: invoice?._id,
        data: updatePhase,
      }).unwrap();
      if (res.success) {
        toast.success("Phase updated successfully");
        refetch();
      } else {
        toast.error(res?.message || "Failed to update phase");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BiSolidEditAlt size={24} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Phase</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div>
              <Label className="mb-2" htmlFor="isSold">
                Sold
              </Label>
              <Select
                name="isSold"
                value={String(select.isSold)}
                onValueChange={(value) => handleSelect("isSold", value)}
              >
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
              <Label htmlFor="phase" className="mb-2 ">
                Quater
              </Label>
              <Select
                name="phase"
                value={select.phase}
                onValueChange={(value) => handleSelect("phase", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quater" />
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
              <Label htmlFor="date">Year</Label>
              <Input
                id="date"
                name="date"
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="YYYY"
                value={selectDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="mt-4 bg-[#1D7889] text-white hover:bg-[#1D7889]"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
