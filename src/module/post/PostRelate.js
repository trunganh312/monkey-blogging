import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const PostRelateStyle = styled.div`
  margin-top: 30px;

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const PostRelate = ({ postList = [] }) => {
  return (
    <PostRelateStyle>
      <div className="grid-layout">
        {postList &&
          postList.length > 0 &&
          _.uniq(postList).map((post) => {
            return <PostItem key={uuidv4()} post={post}></PostItem>;
          })}
      </div>
    </PostRelateStyle>
  );
};

export default PostRelate;
