import React from "react";
import styled from "styled-components";
const listPostContent = [
  {
    title: "Chương 1",
    postContent:
      "Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment, then slices taco. Minutes undisturbed cuisine lunch magnificent mustard curry. Juicy share baking sheet pork. Meals ramen rarities selection, raw pastries richness magnificent atmosphere. Sweet soften dinners, cover mustard infused skillet, Skewers on culinary experience.Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in meat, excess chef end. sweet effortlessly pork, low heat smoker soy sauce flavor meat, rice fruit fruit. Romantic fall-off-the-bone butternut chuck rice burgers.",
    url: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    descImg: "Gastronomy atmosphere set aside. Slice butternut cooking home.",
  },
  {
    title: "Chương 2",
    postContent:
      "Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment, then slices taco. Minutes undisturbed cuisine lunch magnificent mustard curry. Juicy share baking sheet pork. Meals ramen rarities selection, raw pastries richness magnificent atmosphere. Sweet soften dinners, cover mustard infused skillet, Skewers on culinary experience.",
  },
];
const PostContentStyle = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .post-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .post-title {
    font-size: 18px;
    color: black;
    font-weight: 600;
  }

  .post-descImg {
    text-align: center;
    color: ${(props) => props.theme.gray6B};
    font-size: 14px;
  }

  .post-img {
    border-radius: 10px;
  }
`;

const PostContent = () => {
  return (
    <PostContentStyle>
      {listPostContent.map((item) => {
        return (
          <div className="post-item" key={item.title}>
            <h3 className="post-title">{item.title}</h3>
            <p className="post-content">{item.postContent}</p>
            <img className="post-img" src={item.url} alt="" />
            <span className="post-descImg">{item.descImg}</span>
          </div>
        );
      })}
    </PostContentStyle>
  );
};

export default PostContent;
