import Loading from "@/components/layout/shared/Loading";

import { useGetProfileQuery } from "@/redux/apiSlice/profile/profile";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const {
    data: profile,
    isError,
    isFetching,
    isLoading,
  } = useGetProfileQuery(undefined);

  if (isFetching || isLoading) {
    return <Loading />;
  }

  if (isError || !profile.data) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }

  if (profile?.data.role === "SUPER_ADMIN") {
    return children;
  }

  return <Navigate to="/login" />;
}
