import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const RadioStyle = styled.label`
  font-family: system-ui, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  margin-right: 20px;
`;

const Radio = ({ control, name, children, checked, value, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <RadioStyle>
      <input
        type="radio"
        name={name}
        id={name}
        {...field}
        {...props}
        checked={checked}
        value={value}
      />
      {children}
    </RadioStyle>
  );
};

export default Radio;
