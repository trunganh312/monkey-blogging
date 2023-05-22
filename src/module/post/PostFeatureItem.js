import { withErrorBoundary } from "react-error-boundary";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyle = styled.div`
  background-image: url("https://cdn.dribbble.com/userupload/6915879/file/original-a4b827c7de6bddb14ca74402dba35a05.png?compress=1&resize=1024x768");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px 35px;
  border-radius: 15px;
  min-height: 270px;
  margin-top: 30px;
  cursor: pointer;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tag {
    padding: 4px;
    border-radius: 9px;
    background-color: ${(props) => props.theme.grayF3};
    color: ${(props) => props.theme.gray6B};
    font-size: 14px;
  }

  .frame {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #ffff;
    margin: 0 5px;
  }
`;
const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const { category, user } = data;
  return (
    <PostFeatureItemStyle
      style={{
        backgroundImage: ` url(${data.image})`,
      }}
    >
      <div className="header">
        {category?.name && (
          <PostCategory to={category.slug}>{category.name}</PostCategory>
        )}
        <PostMeta
          to={slugify(user?.fullname || "", { lower: true })}
          name={user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
      <PostTitle to={data?.slug}>{data?.title}</PostTitle>
    </PostFeatureItemStyle>
  );
};
// Example of error boundary
export default withErrorBoundary(PostFeatureItem, {
  FallbackComponent: (
    <p className="p-3 text-red-500 bg-red-100">
      Look like this component error
    </p>
  ),
});
