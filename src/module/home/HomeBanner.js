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
    @media only screen and (max-width: 739px) {
      width: 200px;
    }
  }

  .btn {
    background: white;
    color: ${(props) => props.theme.primary};
    @media only screen and (max-width: 739px) {
      display: none;
    }
  }
`;

const HomeBanner = () => {
  return (
    <BannerStyle>
      <div className='container'>
        <div className='banner'>
          <div className='content'>
            <h1 className='title'>Monkey Blogging</h1>
            <p className='description'>
              Monkey blogging là một trang web hoặc nền tảng trực tuyến nơi người dùng có thể đọc và
              cập nhật thông tin mới nhất về các sự kiện, tin tức, xu hướng và các chủ đề quan trọng
              khác. Với sự phát triển của công nghệ và internet, blog tin tức đã trở thành một nguồn
              thông tin quan trọng và phổ biến, cung cấp cho người đọc những thông tin chính xác,
              đáng tin cậy và đa dạng trong nhiều lĩnh vực như chính trị, kinh tế, văn hóa, giải
              trí, thể thao và nhiều lĩnh vực khác
            </p>
          </div>
          <div className='logo'>
            <IconBanner></IconBanner>
          </div>
        </div>
      </div>
    </BannerStyle>
  );
};

export default HomeBanner;
