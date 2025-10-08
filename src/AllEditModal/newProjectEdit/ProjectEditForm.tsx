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
import ProjectEditFiles from "./ProjectEditFiles";
import ProjectEditLocation from "./ProjectEditLocation";
import ProjectEditContactFields from "./ProjectEditContactFields";
import { EditFeatures } from "./EditFeatures";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProjectsImagesEditModal from "./ProjectImagesEditModal";
import SelectYear from "./SelectYear";
import ProjectEditSelectFields from "./ProjectEditSelectFields";
import { EditSeeViews } from "./EditSeeViews";

export default function ProjectEditForm({ invoice }: { invoice: any }) {
  const [updateProject] = useUpdateProjectMutation();
  const [qualityFile, setQualityFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [priceFile, setPriceFile] = useState<File | null>(null);
  const [apartmentFile, setApartmentFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(invoice?.features || []);
  const [seaViews, setSeaViews] = useState<string[]>(invoice?.seaView || []);
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

  // images state
  const [imageSections, setImageSections] = useState<File[]>([]);
  const imageLinks = imageSections
    ?.filter((item: any) => {
      if (item?.url?.startsWith("/")) return item?.url;
    })
    .map((item: any) => item.url);

  const imageFiles = imageSections?.filter((item: any) => item instanceof File);

  useEffect(() => {
    if (invoice?.apartmentImage) {
      const imageFiles = invoice.apartmentImage.map((image: string) => ({
        url: image,
      }));
      setImageSections(imageFiles);
    }
  }, [invoice]);

  // handle add more features
  const handleAddFeature = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  // handle remove feature
  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index: number) => {
    setImageSections((prev: File[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    setImageSections((prev) => [...prev, ...selectedFiles]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!markerPosition) {
    //   toast.error("Please select a location on the map before submitting.");
    //   return;
    // }

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    // append image files
    if (imageFiles?.length > 0) {
      imageFiles.forEach((item) => {
        formData.append("apartmentImage", item);
      });
    }

    // append image links
    if (imageLinks?.length > 0) {
      formData.append("existImage", JSON.stringify(imageLinks));
    }

    const fileFields = [
      { key: "qualitySpecificationPDF", file: qualityFile },
      { key: "paymentPlanPDF", file: paymentFile },
      { key: "pricePdf", file: priceFile },
      { key: "apartmentImagesPdf", file: apartmentFile },
    ];

    fileFields.forEach(({ key, file }) => {
      if (file) formData.append(key, file);
    });

    if (selectedYear) formData.append("CompletionDate", `${selectedYear}`);
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

    // seaviews
    seaViews.forEach((item) => {
      if (item.trim()) formData.append("seaView", item);
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

  // handle seaview
  const handleAddSeeView = () => {
    setSeaViews((prev) => [...prev, ""]);
  };

  const handleRemoveSeeView = (index: number) => {
    setSeaViews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 lg:mt-6">
        <ProjectsImagesEditModal
          imageSections={imageSections}
          handleRemoveImage={handleRemoveImage}
          handleAddImage={handleAddImage}
        />

        <div className="grid gap-3">
          <Label htmlFor="apartmentName">Project Name</Label>
          <Input
            id="apartmentName"
            name="apartmentName"
            defaultValue={invoice.apartmentName}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="relevantLink">RelevantLink</Label>
          <Input
            id="relevantLink"
            name="relevantLink"
            defaultValue={invoice.relevantLink}
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
          setSelected={setSelected}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        <SelectYear
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
        />

        <EditFeatures
          features={features}
          onChange={(i, v) => {
            const newFeatures = [...features];
            newFeatures[i] = v;
            setFeatures(newFeatures);
          }}
          onAdd={handleAddFeature}
          onRemove={handleRemoveFeature}
        />

        <EditSeeViews
          seaViews={seaViews}
          onChange={(i, v) => {
            const newSeaView = [...seaViews];
            newSeaView[i] = v;
            setSeaViews(newSeaView);
          }}
          onAdd={handleAddSeeView}
          onRemove={handleRemoveSeeView}
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
