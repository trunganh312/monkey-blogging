import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.grayDark};
  cursor: pointer;
`;

const Label = ({ children, ...props }) => {
  return <LabelStyles {...props}>{children}</LabelStyles>;
};

Label.propTypes = {
  children: PropTypes.node,
};

export default Label;
