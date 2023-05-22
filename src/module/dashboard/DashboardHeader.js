import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .header-button {
    height: 54px;
    width: 200px;
    padding: 10px;
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const colRef = doc(db, "users", userInfo?.uid);
        const docData = await getDoc(colRef);
        setUser(docData.data());
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUser();
  }, [userInfo?.uid]);
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/monkey.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>
      <div className="header-right">
        <Button type="button" to="/manage/add-post" className="header-button">
          Write new post
        </Button>
        <Link to="/profile" className="header-avatar">
          <img src={user?.avatar} alt="" />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
