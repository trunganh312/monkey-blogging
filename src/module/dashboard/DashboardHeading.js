import React from "react";
import styled from "styled-components";

const DashboardHeadingStyle = styled.h1`
  color: ${(props) => props.theme.primary};
`;

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <DashboardHeadingStyle className="dashboard-heading">
          {title}
        </DashboardHeadingStyle>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
