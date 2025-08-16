import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  searchParams,
  setSearchParams,
  searchValue,
  setSearchValue,
  data,
  setCurrentPage,
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useDebouncedCallback((value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("apartmentName", value);
      setCurrentPage(1);
    } else {
      newParams.delete("apartmentName");
    }
    setSearchParams(newParams);
  }, 1000);

  useEffect(() => {
    handleInputChange(searchValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [data, searchValue]);
  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        name="project"
        placeholder="Search project name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full pl-10 py-2 pr-4 border rounded-md"
      />
      <SearchIcon
        size={22}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
