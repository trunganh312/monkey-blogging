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
import PostCategory from "module/post/PostCategory";
import PostContent from "module/post/PostContent";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import PostRelate from "module/post/PostRelate";
import PostTitle from "module/post/PostTitle";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostDetailsPageStyle = styled.div`
  .meta {
    color: #6b6b6b;
  }
`;

const PostDetailsPage = () => {
  // const params = useParams()
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    (async () => {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setPostInfo(doc.data());
        });
      });
    })();
  }, [slug]);
  return (
    <div className="container">
      <PostDetailsPageStyle>
        <Layout>
          <div className="container">
            <div className="flex post-header ">
              <PostImage
                url="https://scontent.xx.fbcdn.net/v/t1.15752-9/346104770_180263761266625_6839744468459090538_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=uwmueg9Ul6UAX96FKso&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ9Q0Bk87NBt_bs0wcQrzKuTGTsWtctwKRq8VhrNbRKaw&oe=6485DC03"
                className="w-[650px] h-[460px] rounded-xl mb-10 "
              ></PostImage>
              <div className="flex flex-col items-start justify-center ml-6 post-content ">
                <PostCategory>kiến thức</PostCategory>
                <PostTitle>
                  Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
                </PostTitle>
                <PostMeta className="meta"></PostMeta>
              </div>
            </div>
            <div className="post-content px-[150px]">
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{
                  __html: postInfo.content || "",
                }}
              ></div>
              <AuthorBox></AuthorBox>
            </div>
            <div className="post-relate">
              <Heading>Bài viết liên quan</Heading>
              <PostRelate></PostRelate>
            </div>
          </div>
        </Layout>
      </PostDetailsPageStyle>
    </div>
  );
};

export default PostDetailsPage;
