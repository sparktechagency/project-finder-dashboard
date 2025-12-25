"use client";
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function LocationPicker({
  locations,
}: {
  locations: { lat: number; lng: number }[];
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 23.8041,
    lng: 90.4152,
  });

  useEffect(() => {
    if (locations?.length > 0) {
      setMarkerPosition(locations[0]);
    }
  }, [locations]);

  useEffect(() => {
    if (map) {
      map.panTo(markerPosition);
    }
  }, [markerPosition, map]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="my-4">
      <div style={{ height: "200px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={markerPosition}
          zoom={10}
          onLoad={(map) => setMap(map)}
        >
          {/* For single marker */}
          {markerPosition && <Marker position={markerPosition} />}

          {/* For multiple markers */}
          {/* {locations.map(({ lat, lng }) => (
            <Marker key={`${lat}-${lng}`} position={{ lat, lng }} />
          ))} */}
        </GoogleMap>
      </div>
    </div>
  );
}
