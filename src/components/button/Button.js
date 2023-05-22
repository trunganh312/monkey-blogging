import { LoadingSpiner } from "components/loading";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ButtonStyles = styled.button`
  padding: ${(props) => (props.padding ? `${props.padding} ` : "20px 100px")};
  border-radius: 8px;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "20px")};
  font-weight: 600;
  background: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%);
  color: white;
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}` : "350px")};
  margin: auto;
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
`;
/**
 * @param {*} onClick Handle click
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */

const Button = ({
  children,
  type = "button",
  isLoading,
  disabled,
  onClick = () => {},
  to,
  ...props
}) => {
  if (to) {
    return (
      <NavLink to={to}>
        <ButtonStyles
          onClick={onClick}
          type={type}
          disabled={disabled}
          {...props}
        >
          {isLoading ? <LoadingSpiner></LoadingSpiner> : children}
        </ButtonStyles>
      </NavLink>
    );
  }

  return (
    <ButtonStyles onClick={onClick} type={type} disabled={disabled} {...props}>
      {isLoading ? <LoadingSpiner></LoadingSpiner> : children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
