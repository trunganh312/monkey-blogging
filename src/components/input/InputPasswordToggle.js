import { IconEyeClose, IconEyeOpen } from "components/icon";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding: 15px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 10px;
    border: 1px solid transparent;
    font-weight: 500;
    transition: all 0.2s linear;
    padding-right: 40px;
  }

  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }

  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
`;

const InputPasswordToggle = ({ name, control, children, ...props }) => {
  const { field } = useController({
    defaultValue: "",
    name,
    control,
  });
  const [show, setShow] = useState(false);
  return (
    <InputStyles>
      <input
        {...props}
        {...field}
        id={name}
        type={show ? "text" : "password"}
      />

      {show ? (
        <IconEyeOpen onClick={() => setShow(!show)}></IconEyeOpen>
      ) : (
        <IconEyeClose onClick={() => setShow(!show)}></IconEyeClose>
      )}
    </InputStyles>
  );
};

InputPasswordToggle.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  control: PropTypes.object.isRequired,
};

export default InputPasswordToggle;
