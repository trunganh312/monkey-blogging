import IconArrowDown from "components/icon/IconArrowDown";
import IconArrowUp from "components/icon/IconArrowUp";
import useClickOutSide from "hooks/useClickOutSide";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({
  placeholderDropdown = " Select your job",
  children,
  ...props
}) => {
  const handleShowDropdown = () => {
    setShow(!show);
  };

  const { nodeRef, show, setShow } = useClickOutSide();

  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full select-none ">
        <div
          className="flex items-center justify-between bg-[#E7ECF3] p-3 border rounded-lg cursor-pointer placeholder border-slate-200"
          onClick={handleShowDropdown}
          ref={nodeRef}
        >
          {placeholderDropdown}
          {show ? <IconArrowDown></IconArrowDown> : <IconArrowUp></IconArrowUp>}
        </div>
        {show && children}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
