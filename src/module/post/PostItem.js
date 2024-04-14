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
    <PostItemStyle>
      <Link to={`/${post.slug}`}>
        <PostImage className='img' url={post.image} to={post.slug}></PostImage>
        <PostCategory to={post.category?.slug}>{post.category?.name}</PostCategory>
        <PostTitle className='title' to={`/${post.slug}`}>
          {post.title}
        </PostTitle>
        <PostMeta
          className='meta'
          date={formatDate}
          name={post?.user?.fullname}
          to={post?.user?.username}
        ></PostMeta>
      </Link>
    </PostItemStyle>
  );
};

export default PostItem;
