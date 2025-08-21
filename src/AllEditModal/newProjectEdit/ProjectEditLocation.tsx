import React from "react";
import EditLocation from "@/pages/dashboard/map/EditMap";

interface Props {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  markerPosition: { lat: number; lng: number } | null;
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

export default function ProjectEditLocation({
  address,
  setAddress,
  markerPosition,
  setMarkerPosition,
}: Props) {
  return (
    <div className="grid gap-3">
      <EditLocation
        address={address}
        setAddress={setAddress}
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
      />
    </div>
  );
}
