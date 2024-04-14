import PostImage from "module/post/PostImage";
import styled from "styled-components";

const AuthorBoxStyle = styled.div`
  display: flex;
  display: none;
  margin: 50px 0;
  border-radius: 10px;
  overflow: hidden;
  @media not all and (min-width: 640px) {
    flex-direction: column;
  }
  .author-content {
    background-color: #f8f9fa;
    padding: 30px 20px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    flex: 1;
  }
  .author-image {
    width: 300px;
    @media not all and (min-width: 640px) {
      width: auto;
    }
  }

  .author-name {
    color: ${(props) => props.theme.primary};
    font-size: 18px;
    line-height: 30px;
  }

  .author-desc {
    font-size: 14px;
  }
`;

const AuthorBox = ({ user = {} }) => {
  return (
    <AuthorBoxStyle>
      <div className='author-image'>
        <PostImage url={user?.avatar}></PostImage>
      </div>
      <div className='author-content'>
        <h3 className='author-name'>{user?.fullname}</h3>
        <p className='author-desc'>
          {user?.description ||
            "Gastronomy atmosphere set aside. Slice butternut cooking hom, Delicious romantic undisturbed raw platter will meld. Thick Skewersnskillet natural, smoker soy sauce wait roux. Gastronomy atmosphere set aside. Slice butternut cooking home."}
        </p>
      </div>
    </AuthorBoxStyle>
  );
};

export default AuthorBox;
