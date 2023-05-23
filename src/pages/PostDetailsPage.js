import AuthorBox from "components/author/AuthorBox";
import Heading from "components/heading/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import _ from "lodash";
import PostCategory from "module/post/PostCategory";
import PostContent from "module/post/PostContent";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import PostRelate from "module/post/PostRelate";
import PostTitle from "module/post/PostTitle";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";

const PostDetailsPageStyle = styled.div`
  .meta {
    color: #6b6b6b;
  }
`;

const PostDetailsPage = () => {
  // const params = useParams()
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [postRelate, setPostRelate] = useState([]);
  const [categoryRelate, setCategoryRelate] = useState("");
  useEffect(() => {
    (async () => {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setPostInfo(doc.data());
          setCategoryRelate(doc.data().category.id);
        });
      });
    })();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  useEffect(() => {
    (async () => {
      if (!categoryRelate) return;
      const colRef = query(
        collection(db, "posts"),
        where("category.id", "==", categoryRelate)
      );
      let postRelate = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          postRelate.push(doc.data());
        });

        setPostRelate(postRelate);
      });
    })();
  }, [categoryRelate]);
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!postInfo.title) return <NotFoundPage></NotFoundPage>;
  return (
    <div className="container">
      <PostDetailsPageStyle>
        <Layout>
          <div className="container">
            <div className="flex post-header ">
              <PostImage
                url={postInfo.image}
                className="w-[650px] h-[460px] rounded-xl mb-10 "
              ></PostImage>
              <div className="flex flex-col items-start justify-center ml-6 post-content ">
                <PostCategory to={postInfo.category?.slug}>
                  {postInfo?.category?.name}
                </PostCategory>
                <PostTitle>{postInfo.title}</PostTitle>
                <PostMeta
                  className="meta"
                  date={formatDate}
                  name={postInfo?.user?.fullname}
                  to={postInfo?.user?.username}
                ></PostMeta>
              </div>
            </div>
            <div className="post-content px-[150px]">
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{
                  __html: postInfo.content || "",
                }}
              ></div>
              <AuthorBox user={postInfo?.user}></AuthorBox>
            </div>
            <div className="post-relate">
              <Heading>Bài viết liên quan</Heading>
              <PostRelate postList={_.uniq(postRelate)}></PostRelate>
            </div>
          </div>
        </Layout>
      </PostDetailsPageStyle>
    </div>
  );
};

export default PostDetailsPage;
