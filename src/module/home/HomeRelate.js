import Heading from "components/heading/Heading";
import PostRelate from "module/post/PostRelate";
import React from "react";
import styled from "styled-components";

const HomeRelateStyle = styled.div`
  margin-top: 50px;
`;

const HomeRelate = () => {
  return (
    <HomeRelateStyle>
      <Heading>Bài viết liên quan</Heading>
      <PostRelate></PostRelate>
    </HomeRelateStyle>
  );
};

export default HomeRelate;
