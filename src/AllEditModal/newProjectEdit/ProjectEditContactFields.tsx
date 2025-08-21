import React from "react";
import { ContactProjectEdit } from "./ContactProjectEdit";
// import { ContactProjectEdit } from "./ContactProjectEdit";

interface Props {
  contactAddress: any;
  setContactAddress: React.Dispatch<any>;
  contactFields: {
    id: string;
    label: string;
    placeholder: string;
    type: string;
  }[];
}

export default function ProjectEditContactFields({
  contactAddress,
  setContactAddress,
  contactFields,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactAddress({
      ...contactAddress,
      name: {
        ...contactAddress.name,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div>
      {contactFields.map((field) => (
        <ContactProjectEdit
          key={field.id}
          type={field.type}
          name={field.id}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          contactAddress={contactAddress?.name?.[field.id]}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
