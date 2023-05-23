import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CategoryStyles = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px;
`;

const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    (async () => {
      const qr = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      onSnapshot(qr, (snapshot) => {
        const postList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setPostList(postList);
      });
    })();
  }, [slug]);
  return (
    <CategoryStyles>
      <Layout>
        <h1 className="mt-10 text-2xl ">
          Danh sách các bài viết:
          <span className="ml-2 text-green-400">{slug}</span>
        </h1>
        <div className="!grid-cols-3 form-layout !mt-10">
          {postList &&
            postList.length > 0 &&
            postList.map((post) => {
              return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
      </Layout>
    </CategoryStyles>
  );
};

export default CategoryPage;
