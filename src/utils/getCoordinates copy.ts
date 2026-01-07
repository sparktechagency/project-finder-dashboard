export const getCoordinates = async (
  location: string
): Promise<{
  success: boolean;
  message: string;
  data?: { lat: number; lng: number }[];
  error?: any;
}> => {
  try {
    if (!location) {
      return {
        success: false,
        message: "Location is empty",
      };
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.length) {
      return {
        success: false,
        message: "No results found for the specified location.",
        data: [],
      };
    }

    const newLocations = data.map((loc: any) => ({
      lat: Number(loc.lat),
      lng: Number(loc.lon),
    }));

    return {
      success: true,
      message: "Coordinates fetched successfully",
      data: newLocations,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching coordinates",
      error,
    };
  }
};
