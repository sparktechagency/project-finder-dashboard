import { useGetPrivacyQuery } from "@/redux/apiSlice/settings/settings";
import Loading from "../layout/shared/Loading";

export default function Policy() {
  const { data, isLoading } = useGetPrivacyQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto p-20 h-[800px] overflow-y-auto">
      <h1 className="text-xl font-medium text-gray-900">Privacy Policy</h1>
      <p
        className="whitespace-pre-line mb-5"
        dangerouslySetInnerHTML={{ __html: data?.data?.text || "" }}
      />
    </div>
  );
}
