import Heading from "components/heading/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HomeNewestStyle = styled.div`
  margin-top: 50px;
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
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

const HomeNewest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, limit(3), where("status", "==", 1), where("hot", "==", true));
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
    <HomeNewestStyle>
      <Heading>Newest update</Heading>
      <div className='grid-layout'>
        {data?.map((item) => {
          return <PostFeatureItem data={item} key={item.id}></PostFeatureItem>;
        })}
      </div>
    </HomeNewestStyle>
  );
};

export default HomeNewest;
