import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLargeStyle = styled.div`
  .img {
    width: 570px;
    height: 430px;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .meta {
    width: 100%;
    max-width: 157px;
  }

  .color {
    color: #b1b5c3;
  }

  .desc {
    font-size: 18px;
  }

  .content {
    line-height: 30px;
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyle>
      <div className="img">
        <img
          src="https://cdn.dribbble.com/userupload/6915879/file/original-a4b827c7de6bddb14ca74402dba35a05.png?compress=1&resize=1024x768"
          alt=""
        />
      </div>
      <div className="content">
        <PostCategory>Kiến thức</PostCategory>
        <PostTitle className="desc">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <div className="meta">
          <PostMeta date="Mar 23" name="Andiez Le" className="color"></PostMeta>
        </div>
      </div>
    </PostNewestLargeStyle>
  );
};

export default PostNewestLarge;
