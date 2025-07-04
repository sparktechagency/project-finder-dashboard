import { useNavigate, useLocation } from "react-router-dom";

export const useUpdateSearchParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateSearchParams = (key: string, value: string | null) => {
    const searchParams = new URLSearchParams(location.search);

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    const newPath = `${location.pathname}?${searchParams.toString()}`;
    navigate(newPath);
  };

  return updateSearchParams;
};
