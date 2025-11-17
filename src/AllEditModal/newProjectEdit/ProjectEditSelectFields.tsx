import React from "react";

import {
  company,
  location,
  propertyType,
} from "@/components/layout/shared/AllName";
import EditSelectItems from "./EditSelectitem";

interface Props {
  invoice: any;
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function ProjectEditSelectFields({
  invoice,
  setSelected,
}: Props) {
  const handleSelectChange = (key: string, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <EditSelectItems
        options={propertyType}
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
        title="Location Costa Del Sol"
        placeholder="Select location"
        value={invoice?.location || ""}
        onSelect={(value) => handleSelectChange("location", value)}
      />
      <EditSelectItems
        options={location}
        title="Location Costa Blanca (Optional and Beta)"
        placeholder="Select location"
        value={invoice?.locationTwo || ""}
        onSelect={(value) => handleSelectChange("locationTwo", value)}
      />
    </>
  );
}
