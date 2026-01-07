import { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

type LatLng = { lat: number; lng: number };
type Props = {
  markerPosition: LatLng | null;
  setMarkerPosition: (pos: LatLng) => void;
  address: string;
  setAddress: (address: string) => void;
};

export default function EditLocation({
  markerPosition,
  setMarkerPosition,
  address,
  setAddress,
}: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  //
  //
  // Reverse geocode on marker change
  useEffect(() => {
    if (!markerPosition || !isLoaded) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: markerPosition }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  }, [markerPosition, isLoaded]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng) setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !address.trim()) return;
    e.preventDefault();

    new google.maps.Geocoder().geocode({ address }, (results, status) => {
      if (status !== "OK" || !results?.[0])
        return toast.error("Place not found");
      const loc = results[0].geometry.location;
      setMarkerPosition({ lat: loc.lat(), lng: loc.lng() });
      setAddress(results[0].formatted_address);
    });
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="my-4">
      <Label htmlFor="location" className="mb-2 text-black">
        Map
      </Label>

      <div style={{ height: 200, width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={markerPosition || { lat: 37.7749, lng: -122.4194 }}
          zoom={12}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>

      <Input
        id="location"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter place name and press Enter"
        className="mb-2 mt-4"
      />
    </div>
  );
}
