import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const PostRelateStyle = styled.div`
  margin-top: 30px;

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const PostRelate = () => {
  return (
    <PostRelateStyle>
      <div className="grid-layout">
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </PostRelateStyle>
  );
};

export default PostRelate;
