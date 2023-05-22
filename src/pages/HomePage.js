import Layout from "components/layout/Layout";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import HomeRelate from "module/home/HomeRelate";
import { useEffect } from "react";
import styled from "styled-components";

const HomePageStyle = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px;
`;

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  });
  return (
    <HomePageStyle>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
        <HomeRelate></HomeRelate>
      </Layout>
    </HomePageStyle>
  );
};

export default HomePage;
