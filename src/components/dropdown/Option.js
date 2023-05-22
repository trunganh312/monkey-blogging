import React from "react";

const Option = ({ children, onClick }) => {
  return (
    <div
      className="flex justify-between p-3 cursor-pointer option-item"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Option;
