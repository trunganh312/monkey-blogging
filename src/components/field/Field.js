import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  margin-bottom: 30px;
`;

const Field = ({ children, className, styles }) => {
  return (
    <FieldStyles style={styles} className={className}>
      {children}
    </FieldStyles>
  );
};

Field.propTypes = {
  children: PropTypes.node,
};

export default Field;
