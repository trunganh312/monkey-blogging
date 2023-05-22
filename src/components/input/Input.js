import React from "react";
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
    padding-right: ${(props) => (props.hasIcon ? "40px" : "15px")};
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

const Input = ({ name, control, children, ...props }) => {
  const { field } = useController({
    defaultValue: "",
    name,
    control,
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input {...props} {...field} id={name} />

      {children ? children : null}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Input;
