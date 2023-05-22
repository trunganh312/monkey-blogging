import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .post-img {
    width: 180px;
    height: 130px;
    margin-right: 10px;
    border-radius: 8px;
  }

  .content {
    padding: 10px 10px 5px 10px;
  }

  .post-category {
    background-color: white;
    color: ${(props) => props.theme.gray6B};
    font-size: 12px;
  }

  .post-meta {
    color: ${(props) => props.theme.gray6B};
    font-size: 14px;
  }

  .post-title {
    font-size: 15px;
    font-weight: 600;
  }
`;

const PostNewestItem = () => {
  return (
    <PostNewestItemStyle className="post-newest">
      <PostImage
        className="post-img"
        url="https://cdn.dribbble.com/userupload/6915879/file/original-a4b827c7de6bddb14ca74402dba35a05.png?compress=1&resize=1024x768"
      ></PostImage>

      <div className="content">
        <PostCategory className="post-category">Kiến thức</PostCategory>
        <PostTitle className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta className="post-meta"></PostMeta>
      </div>
    </PostNewestItemStyle>
  );
};

export default PostNewestItem;
