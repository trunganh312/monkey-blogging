import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyle = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
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

const PostItem = ({ post = {} }) => {
  if (!post) return;
  const date = post?.createdAt?.seconds ? new Date(post?.createdAt?.seconds * 1000) : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <Link to={`/${post.slug}`}>
      <PostItemStyle>
        <PostImage className='img flex-0 flex-[300px]' url={post.image} to={post.slug}></PostImage>
        <div className='pattent'>
          <PostCategory to={post.category?.slug}>{post.category?.name}</PostCategory>
          <PostTitle className='title' to={`/${post.slug}`}>
            {post.title}
          </PostTitle>
        </div>
        <PostMeta
          className='meta'
          date={formatDate}
          name={post?.user?.fullname}
          to={post?.user?.username}
        ></PostMeta>
      </PostItemStyle>
    </Link>
  );
};

export default PostItem;
