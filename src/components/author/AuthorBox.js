import PostImage from "module/post/PostImage";
import styled from "styled-components";

const AuthorBoxStyle = styled.div`
  display: flex;
  margin: 50px 0;
  .author-content {
    background-color: #f8f9fa;
    padding: 30px 20px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
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

const AuthorBox = ({ userId = "" }) => {
  return (
    <AuthorBoxStyle>
      <div className="author-image">
        <PostImage
          url="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
          className="w-[150px] h-full rounded-l-xl rounded-bl-xl"
        ></PostImage>
      </div>
      <div className="author-content">
        <h3 className="author-name">Jake Sullivan</h3>
        <p className="author-desc">
          Gastronomy atmosphere set aside. Slice butternut cooking home.
          Delicious romantic undisturbed raw platter will meld. Thick Skewers
          skillet natural, smoker soy sauce wait roux. Gastronomy atmosphere set
          aside. Slice butternut cooking home.
        </p>
      </div>
    </AuthorBoxStyle>
  );
};

export default AuthorBox;
