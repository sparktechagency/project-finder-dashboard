import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProjectMutation } from "@/redux/apiSlice/apartments/apartments";
import { getAddressFromLatLng } from "@/helper/mapAddress";
import { contactFields } from "@/demoData/ProjectEditData";
import ProjectEditImages from "./ProjectEditImages";
import ProjectEditFiles from "./ProjectEditFiles";
import ProjectEditLocation from "./ProjectEditLocation";
import ProjectEditContactFields from "./ProjectEditContactFields";
import ProjectEditSelectFields from "./ProjectEditSelectFields";
import { EditFeatures } from "../EditFeatures";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProjectEditForm({ invoice }: { invoice: any }) {
  const [updateProject] = useUpdateProjectMutation();
  const [qualityFile, setQualityFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [priceFile, setPriceFile] = useState<File | null>(null);
  const [apartmentFile, setApartmentFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(invoice?.features || []);
  const [date, setDate] = useState<string>("");
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [contactAddress, setContactAddress] = useState({
    name: invoice?.contact || "",
  });

  useEffect(() => {
    if (invoice?.latitude && invoice?.longitude) {
      const { latitude, longitude } = invoice;
      setMarkerPosition({ lat: latitude, lng: longitude });
      getAddressFromLatLng(
        latitude,
        longitude,
        import.meta.env.VITE_GOOGLE_API_KEY
      ).then((data) => {
        if (data) setAddress(data);
      });
    }
  }, [invoice?.latitude, invoice?.longitude]);

  useEffect(() => {
    if (invoice?.updatedDate) {
      const formattedDate = new Date(invoice.updatedDate)
        .toISOString()
        .split("T")[0];
      setDate(formattedDate);
    }
  }, [invoice?.updatedDate]);

  useEffect(() => {
    if (invoice?.CompletionDate) {
      const year = new Date(invoice.CompletionDate).getFullYear().toString();
      setSelectedYear(year);
    }
  }, [invoice?.CompletionDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!markerPosition) {
    //   toast.error("Please select a location on the map before submitting.");
    //   return;
    // }

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const fileFields = [
      { key: "qualitySpecificationPDF", file: qualityFile },
      { key: "paymentPlanPDF", file: paymentFile },
      { key: "pricePdf", file: priceFile },
      { key: "apartmentImagesPdf", file: apartmentFile },
    ];

    fileFields.forEach(({ key, file }) => {
      if (file) formData.append(key, file);
    });

    if (selectedYear)
      formData.append("CompletionDate", `${selectedYear}-01-01`);
    if (selected.propertyType)
      formData.append("propertyType", selected.propertyType);
    if (selected.salesCompany)
      formData.append("salesCompany", selected.salesCompany);
    if (selected.location) formData.append("location", selected.location);

    formData.append("latitude", markerPosition?.lat?.toString() ?? "");
    formData.append("longitude", markerPosition?.lng?.toString() ?? "");

    const contactData = {
      phone: values.phone,
      email: values.email,
      companyName: values.companyName,
    };
    formData.append("contact", JSON.stringify(contactData));

    features.forEach((feature) => {
      if (feature.trim()) formData.append("features", feature);
    });

    if (date) formData.append("updatedDate", date);

    try {
      const res = await updateProject({
        id: invoice._id,
        data: formData,
      }).unwrap();
      if (res?.success) toast.success("Successfully updated project");
      else toast.error("Failed to update project");
    } catch (error) {
      toast.error("Error updating project");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 lg:mt-6">
        <ProjectEditImages invoice={invoice} />

        <div className="grid gap-3">
          <Label htmlFor="apartmentName">Project Name</Label>
          <Input
            id="apartmentName"
            name="apartmentName"
            defaultValue={invoice.apartmentName}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="location">Commission</Label>
          <Input
            id="commission"
            name="commission"
            defaultValue={invoice.commission}
          />
        </div>

        <ProjectEditFiles
          invoice={invoice}
          qualityFile={qualityFile}
          setQualityFile={setQualityFile}
          paymentFile={paymentFile}
          setPaymentFile={setPaymentFile}
          priceFile={priceFile}
          setPriceFile={setPriceFile}
          apartmentFile={apartmentFile}
          setApartmentFile={setApartmentFile}
        />

        <ProjectEditLocation
          address={address}
          setAddress={setAddress}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />

        <ProjectEditContactFields
          contactAddress={contactAddress}
          setContactAddress={setContactAddress}
          contactFields={contactFields}
        />
        <ProjectEditSelectFields
          invoice={invoice}
          selected={selected}
          setSelected={setSelected}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <EditFeatures
          features={features}
          onChange={(i, v) => {
            const newFeatures = [...features];
            newFeatures[i] = v;
            setFeatures(newFeatures);
          }}
        />

        <input
          type="date"
          className="px-4 py-2 rounded-md border border-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
  );
}
