import { Button } from "components/button";
import { IconBanner } from "components/icon";
import React from "react";
import styled from "styled-components";

const BannerStyle = styled.div`
  width: 100%;
  height: 520px;
  background: rgb(0, 180, 170);
  background: linear-gradient(155deg, #00b4aa 6.67%, #a4d96c 84.1%);
  margin-top: 40px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    max-width: 500px;
    color: white;
  }
  .title {
    font-size: 40px;
  }
  .description {
    margin: 50px 0;
    letter-spacing: 0.7px;
  }

  .btn {
    background: white;
    color: ${(props) => props.theme.primary};
  }
`;

const HomeBanner = () => {
  return (
    <BannerStyle>
      <div className="container">
        <div className="banner">
          <div className="content">
            <h1 className="title">Monkey Blogging</h1>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button type="button" className="btn">
              Get Started
            </Button>
          </div>
          <div className="logo">
            <IconBanner></IconBanner>
          </div>
        </div>
      </div>
    </BannerStyle>
  );
};

export default HomeBanner;
