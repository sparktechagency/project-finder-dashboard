// "use client";
// import { useEffect, useState } from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// export default function LocationPicker({
//   locations,
// }: {
//   locations: { lat: number; lng: number }[];
// }) {
//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [markerPosition, setMarkerPosition] = useState<{
//     lat: number;
//     lng: number;
//   }>({
//     lat: 23.8041,
//     lng: 90.4152,
//   });

//   useEffect(() => {
//     if (locations?.length > 0) {
//       setMarkerPosition(locations[0]);
//     }
//   }, [locations]);

//   useEffect(() => {
//     if (map) {
//       map.panTo(markerPosition);
//     }
//   }, [markerPosition, map]);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
//   });

//   if (loadError) return <div>Error loading map</div>;
//   if (!isLoaded) return <div>Loading map...</div>;

//   return (
//     <div className="my-4">
//       <div style={{ height: "200px", width: "100%" }}>
//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           center={markerPosition}
//           zoom={10}
//           onLoad={(map) => setMap(map)}
//         >
//           {/* For single marker */}
//           {markerPosition && <Marker position={markerPosition} />}

//           {/* For multiple markers */}
//           {/* {locations.map(({ lat, lng }) => (
//             <Marker key={`${lat}-${lng}`} position={{ lat, lng }} />
//           ))} */}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface LocationPickerProps {
  locations?: { lat: number; lng: number }[];
  onSelectLocation?: (
    latLng: { lat: number; lng: number },
    city?: string
  ) => void;
}

export default function LocationPicker({
  locations,
  onSelectLocation,
}: LocationPickerProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 23.8041,
    lng: 90.4152,
  });

  // Update marker if parent sends coordinates
  useEffect(() => {
    if (locations && locations.length > 0) {
      setMarkerPosition(locations[0]);
    }
  }, [locations]);

  // Pan map when marker changes
  useEffect(() => {
    if (map) map.panTo(markerPosition);
  }, [markerPosition, map]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_API_KEY ||
      "AIzaSyBr0c6xuLTeqbSqCi5FlFm_7LuJ9KSVoUo",
  });

  // Reverse geocode to get city name
  const getCityFromLatLng = (lat: number, lng: number) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results) {
        const city = results[0].address_components.find((c) =>
          c.types.includes("locality")
        )?.long_name;

        if (city) {
          // Update URL param
          const params = new URLSearchParams(window.location.search);
          params.set("location", city);
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${params.toString()}`
          );

          // Send to parent
          if (onSelectLocation) onSelectLocation({ lat, lng }, city);
        }
      }
    });
  };

  // Handle map click
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setMarkerPosition({ lat, lng });
    getCityFromLatLng(lat, lng);
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="my-4">
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={markerPosition}
          zoom={13}
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
    </div>
  );
}
