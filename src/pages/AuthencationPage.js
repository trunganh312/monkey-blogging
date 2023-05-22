import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthencationStyles = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  .logo {
    margin: 0 auto;
  }
  .title {
    color: ${(props) => props.theme.primary};
    text-align: center;
    margin-top: 27px;
    font-size: 20px;
    font-weight: 600;
  }

  .form {
    width: 100%;
    max-width: 500px;
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  .have-account {
    font-weight: 500;
    margin-bottom: 20px;
    a {
      text-decoration: none;
      margin-left: 10px;
      color: ${(props) => props.theme.primary};
    }
  }
`;

const AuthencationPage = ({ children }) => {
  return (
    <AuthencationStyles>
      <div className="container">
        <NavLink to="/">
          <img
            srcSet="./monkey.png 5x"
            alt="monkey-blogging"
            className="logo"
          />
        </NavLink>
        <h3 className="title">Monkey Blogging</h3>
        {children}
      </div>
    </AuthencationStyles>
  );
};

export default AuthencationPage;
