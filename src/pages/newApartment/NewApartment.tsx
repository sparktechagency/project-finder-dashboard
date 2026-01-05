"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { ChangeEvent } from "react";

interface Contact {
  phone: string;
  email: string;
  companyName: string;
}

interface FormData {
  apartmentName: string;
  commission: string;
  contact: Contact;
  features: { value: string }[];
  seaView: string;
  latitude: string;
  longitude: string;
  propertyType: string;
  location: string;
  locationTwo: string;
  updatedDate: string;
  salesCompany: string;
  completionDate: number[];
  seaViewBoolean: boolean;
  apartmentImage: File | null;
  paymentPlanPDF: File | null;
  qualitySpecificationPDF: File | null;
  apartmentImagesPdf: File | null;
  pricePdf: File | null;
}

export default function NewApartment() {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>({
      defaultValues: {
        apartmentName: "",
        commission: "",
        contact: { phone: "", email: "", companyName: "" },
        features: [{ value: "" }, { value: "" }],
        seaView: "",
        latitude: "",
        longitude: "",
        propertyType: "",
        location: "",
        locationTwo: "",
        salesCompany: "",
        completionDate: [],
        seaViewBoolean: false,
        apartmentImage: null,
        paymentPlanPDF: null,
        qualitySpecificationPDF: null,
        apartmentImagesPdf: null,
        pricePdf: null,
      },
    });

  const { fields } = useFieldArray({
    control,
    name: "features",
  });

  const completionDate = watch("completionDate");

  const handleFileChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setValue(field, file);
    };

  const onSubmit = (data: FormData) => {
    const submitData = {
      ...data,
      updatedDate: new Date().toISOString(),
    };
    console.log("Form Data:", submitData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div>
            <Label>Apartment Name</Label>
            <Input {...register("apartmentName")} />
          </div>

          <div>
            <Label>Commission</Label>
            <Input {...register("commission")} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input {...register("contact.phone")} />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" {...register("contact.email")} />
          </div>

          <div>
            <Label>Company Name</Label>
            <Input {...register("contact.companyName")} />
          </div>

          {/* FEATURES */}
          <div>
            <Label>Features</Label>
            {fields.map((field, index) => (
              <Input
                key={field.id}
                {...register(`features.${index}.value`)}
                className="mb-2"
              />
            ))}
          </div>

          <div>
            <Label>Sea View Description</Label>
            <Input {...register("seaView")} />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <Label>Price PDF</Label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange("pricePdf")}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-56 bg-green-700 flex items-center justify-center">
              <MapPin className="text-white" />
            </div>
          </Card>

          <div>
            <Label>Latitude</Label>
            <Input {...register("latitude")} />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input {...register("longitude")} />
          </div>

          {/* PROPERTY TYPE */}
          <Controller
            control={control}
            name="propertyType"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {/* COMPLETION YEARS */}
          <div>
            <Label>Completion Date</Label>
            <div className="grid grid-cols-4 gap-2">
              {[2024, 2025, 2026, 2027].map((year) => (
                <div key={year} className="flex gap-2 items-center">
                  <Checkbox
                    checked={completionDate?.includes(year)}
                    onCheckedChange={(checked) => {
                      setValue(
                        "completionDate",
                        checked
                          ? [...completionDate, year]
                          : completionDate.filter((y) => y !== year)
                      );
                    }}
                  />
                  <span>{year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SWITCH */}
          <Controller
            control={control}
            name="seaViewBoolean"
            render={({ field }) => (
              <div className="flex justify-between items-center">
                <Label>Sea View</Label>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            Submit Form
          </Button>
        </div>
      </div>
    </form>
  );
}
