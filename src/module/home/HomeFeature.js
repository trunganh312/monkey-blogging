import Heading from "components/heading/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeatureStyle = styled.div`
  margin-top: 50px;

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

const HomeFeature = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      limit(3),
      where("status", "==", 1),
      where("hot", "==", true)
    );
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(posts);
    });
  }, []);

  return (
    <HomeFeatureStyle>
      <Heading>Bài viết nổi bật </Heading>
      <div className="grid-layout">
        {data?.map((item) => {
          return <PostFeatureItem data={item} key={item.id}></PostFeatureItem>;
        })}
      </div>
    </HomeFeatureStyle>
  );
};

export default HomeFeature;
