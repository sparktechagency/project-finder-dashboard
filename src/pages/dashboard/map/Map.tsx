import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

type LocationPickerProps = {
  markerPosition: { lat: number; lng: number } | null;
  setMarkerPosition: (pos: { lat: number; lng: number }) => void;
};

export default function LocationPicker({
  markerPosition,
  setMarkerPosition,
}: LocationPickerProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [address, setAddress] = useState("");
  useEffect(() => {
    if (!markerPosition) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: markerPosition }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  }, [markerPosition]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  // Handle input text change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  // Handle Enter key press to search location
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && address.trim()) {
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ address: address.trim() }, (results, status) => {
  //       if (status === "OK" && results && results[0]) {
  //         const location = results[0].geometry.location;
  //         setMarkerPosition({ lat: location.lat(), lng: location.lng() });
  //         setAddress(results[0].formatted_address);
  //       } else {
  //         alert("Place not found");
  //       }
  //     });
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !address.trim()) return;
    e.preventDefault();
    e.stopPropagation();
    new google.maps.Geocoder().geocode(
      { address: address.trim() },
      (results, status) => {
        if (status !== "OK" || !results?.[0]) {
          toast.error("Place not found");
          return;
        }

        const location = results[0].geometry.location;
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setAddress(results[0].formatted_address);
      }
    );
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="my-4">
      <Label htmlFor="location" className="mb-2 text-black">
        Map
      </Label>

      <Input
        id="location"
        type="text"
        placeholder="Enter place name and press Enter"
        value={address}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="mb-2"
        required
      />

      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={markerPosition || { lat: 37.7749, lng: -122.4194 }}
          zoom={12}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
}
