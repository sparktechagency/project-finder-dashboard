export async function getAddressFromLatLng(
  lat: number,
  lng: number,
  apikey: string
): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results?.length > 0) {
      return data.results[0].formatted_address;
    }

    return null;
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}
