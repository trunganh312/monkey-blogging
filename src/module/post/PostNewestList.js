import React from "react";
import styled from "styled-components";
import PostNewestItem from "./PostNewestItem";

const PostNewestListStyle = styled.div`
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PostNewestList = () => {
  return (
    <PostNewestListStyle>
      <PostNewestItem></PostNewestItem>
      <PostNewestItem></PostNewestItem>
      <PostNewestItem></PostNewestItem>
    </PostNewestListStyle>
  );
};

export default PostNewestList;
