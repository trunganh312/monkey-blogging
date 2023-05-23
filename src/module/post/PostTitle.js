import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostTitleStyle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  margin: 10px 0;
`;
const PostTitle = ({ children, className, to = "" }) => {
  return (
    <PostTitleStyle className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyle>
  );
};

export default PostTitle;
