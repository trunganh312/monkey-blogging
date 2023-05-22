import React from "react";
import styled from "styled-components";

const HeadingStyle = styled.h1`
  color: #3a1097;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 600;
  &::before {
    content: "";
    display: block;
    background-color: #00d1ed;
    border-radius: 2px;
    width: 35px;
    height: 3px;
  }
`;

const Heading = ({ children, className }) => {
  return <HeadingStyle className={className}>{children}</HeadingStyle>;
};

export default Heading;
