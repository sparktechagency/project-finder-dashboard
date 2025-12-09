import { useGetSupportQuery } from "@/redux/apiSlice/faq/faq";

export default function Support() {
  const { data, isLoading } = useGetSupportQuery(undefined);
  console.log("data", data);

  if (isLoading) {
    return <h1 className="flex item-center justtify-center">Loading...</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 h-[800px] overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Support</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg text-gray-700 mb-4">
          If you need assistance, feel free to reach out to us:
        </p>

        <div>
          <p className="text-sm text-gray-600">
            <strong>Email :</strong>{" "}
            <a
              href="mailto:jueylrana@gmail.com"
              className="text-blue-500 hover:underline"
            >
              {data?.data?.email}
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Phone :</strong>{" "}
            <a
              href="tel:+009080945498590"
              className="text-blue-500 hover:underline"
            >
              {data?.data?.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
