import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostTitleStyle = styled.h3`
  display: block;
  display: -webkit-box;
  line-height: 1.3;
  -webkit-line-clamp: 2; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;

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
