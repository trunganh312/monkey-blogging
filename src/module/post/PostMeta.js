import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #f8f9fa;

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: currentColor;
    margin: 0 5px;
  }
`;

const PostMeta = ({
  date = "Mar 23",
  name = "Andiez Le",
  className,
  to = "/",
}) => {
  return (
    <PostMetaStyle className={className}>
      <span className="date">{date}</span>
      <div className="dot"></div>
      <NavLink to={to}>
        <span className="name">{name}</span>
      </NavLink>
    </PostMetaStyle>
  );
};

export default PostMeta;
