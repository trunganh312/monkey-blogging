import Heading from "components/heading/Heading";
import PostNewestLarge from "module/post/PostNewestLarge";
import PostNewestList from "module/post/PostNewestList";
import React from "react";
import styled from "styled-components";

const HomeNewestStyle = styled.div`
  margin-top: 50px;
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyle>
      <Heading>Newest update</Heading>
      <div className="grid-layout">
        <PostNewestLarge></PostNewestLarge>
        <PostNewestList></PostNewestList>
      </div>
    </HomeNewestStyle>
  );
};

export default HomeNewest;
