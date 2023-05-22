import { createContext, useContext } from "react";

const DropdownContext = createContext();

const DropdownProvider = ({ children, ...props }) => {
  return (
    <DropdownContext.Provider value={props}>
      {children}
    </DropdownContext.Provider>
  );
};

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("DropdownProvider must be defined");

  return context;
};

export { useDropdown, DropdownProvider };
