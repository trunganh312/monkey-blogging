import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyle = styled.div`
  padding: 5px;
  cursor: pointer;
  .img {
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
  }

  .meta {
    color: ${(props) => props.theme.gray6B};
  }
`;

const PostItem = () => {
  return (
    <PostItemStyle>
      <PostImage
        className="img"
        url="https://images.unsplash.com/photo-1683659635689-3df761eddb70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
      ></PostImage>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle className="title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta className="meta"></PostMeta>
    </PostItemStyle>
  );
};

export default PostItem;
