import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const PostCategoryStyle = styled.span`
  padding: 4px 10px;
  border-radius: 9px;
  background-color: ${(props) => props.theme.grayF3};
  font-size: 14px;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.gray6B};
  }
`;

const PostCategory = ({ children, className, to = "/" }) => {
  return (
    <PostCategoryStyle className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyle>
  );
};

export default PostCategory;
