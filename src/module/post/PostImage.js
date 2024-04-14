import { Link } from "react-router-dom";
import styled from "styled-components";
const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  if (to)
    return (
      <PostImageStyles className={`post-image ${className}`}>
        <img src={url} alt={alt} loading='lazy' />
      </PostImageStyles>
    );
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} loading='lazy' />
    </PostImageStyles>
  );
};

export default PostImage;
