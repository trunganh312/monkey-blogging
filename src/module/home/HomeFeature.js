import Heading from "components/heading/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeatureStyle = styled.div`
  margin-top: 50px;

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media only screen and (max-width: 739px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 10px;
    }

    @media only screen and (min-width: 740px) and (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
`;

const HomeFeature = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("status", "==", 1), orderBy("createdAt"), limit(12));
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
      <Heading>Tổng hợp blog mới nhất </Heading>
      <div className='grid-layout'>
        {data?.map((item) => {
          return <PostFeatureItem data={item} key={item.id}></PostFeatureItem>;
        })}
      </div>
    </HomeFeatureStyle>
  );
};

export default HomeFeature;
