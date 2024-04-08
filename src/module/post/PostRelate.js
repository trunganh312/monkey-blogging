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
    @media not all and (min-width: 640px) {
      grid-template-columns: repeat(1, 1fr);
    }
    @media only screen and (min-width: 740px) and (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const PostRelate = ({ postList = [] }) => {
  return (
    <PostRelateStyle>
      <div className='grid-layout'>
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
