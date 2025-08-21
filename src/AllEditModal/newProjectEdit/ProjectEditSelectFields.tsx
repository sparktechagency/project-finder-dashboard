import React from "react";

import { company, location } from "@/components/layout/shared/AllName";
import EditSelectItems from "./EditSelectitem";

interface Props {
  invoice: any;
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  selectedYear: string | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ProjectEditSelectFields({
  invoice,
  setSelected,
}: Props) {
  const handleSelectChange = (key: string, value: string) => {
    console.log(value);
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <EditSelectItems
        options={["Apartment", "Villa", "Townhouse"]}
        title="Property Type"
        placeholder="Select Property Type"
        value={invoice?.propertyType || ""}
        onSelect={(value) => handleSelectChange("propertyType", value)}
      />

      <EditSelectItems
        options={company}
        title="Sales Company Name"
        placeholder="Select Sales Company Name"
        value={invoice?.salesCompany || ""}
        onSelect={(value) => handleSelectChange("salesCompany", value)}
      />
      <EditSelectItems
        options={location}
        title="Location"
        placeholder="Select location"
        value={invoice?.location || ""}
        onSelect={(value) => handleSelectChange("location", value)}
      />
    </>
  );
}
