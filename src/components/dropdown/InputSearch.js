import React from "react";
import { useDropdown } from "./dropdown-context";

const InputSearch = () => {
  const { placeholderSearch, onChange } = useDropdown();
  return (
    <input
      type="text"
      className="w-full p-2 border rounded-lg outline-none border-slate-300"
      placeholder={placeholderSearch}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputSearch;
