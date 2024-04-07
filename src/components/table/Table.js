import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 10px 20px;
  }
  tbody {
  }
  @media only screen and (max-width: 739px) {
    overflow-x: scroll;
  }

  @media only screen and (min-width: 740px) and (max-width: 1023px) {
    overflow-x: scroll;
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
