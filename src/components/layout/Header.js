import { Button } from "components/button";
import { IconSearch } from "components/icon";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
const menuLink = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
  {
    url: "/dashboard",
    title: "Dashboard",
  },
];

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    flex: 1;
  }
  .logo {
    width: 50px;
    margin-right: 23px;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: 500;
    align-items: center;
  }

  .menu-item {
    list-style-type: none;
    padding: 0 20px;
  }
  .menu-link {
    text-decoration: none;
    color: #000000;
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .search {
    position: relative;
    display: flex;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    overflow: hidden;
    height: 54px;
    input {
      width: 100%;
      padding: 10px 30px;
      padding-left: 20px;
    }

    input::-webkit-input-placeholder {
      color: #999999;
    }
    input::-moz-input-placeholder {
      color: #999999;
    }
  }
  .search-icon {
    position: absolute;
    width: 15px;
    font-weight: 400;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn {
    font-size: 16px;
    padding: 15px 30px;
    width: auto;
    margin: 0;
    margin-left: 20px;
    max-height: 54px;
  }

  .title {
    display: block;
    display: -webkit-box;
    height: 16px * 1.3 * 3;
    font-size: 16px;
    line-height: 1.3;
    -webkit-line-clamp: 1; /* số dòng hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    max-width: 170px;
    margin-left: 5px;
    span {
      color: ${(props) => props.theme.primary};
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const isLogin = !!userInfo?.email;
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HeaderStyle>
      <div className="header-left">
        <NavLink to="/">
          <div className="logo">
            <img alt="monkey-blogging" srcSet="/monkey.png 2x" />
          </div>
        </NavLink>
        <ul className="menu">
          {menuLink.map((menu) => {
            return (
              <li key={menu.title} className="menu-item">
                <NavLink to={menu.url} className="menu-link">
                  {menu.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="header-right">
        {isLogin ? (
          <>
            <Button type="button" className="btn" onClick={handleSignOut}>
              Sign Out
            </Button>
            <p className="title">
              Wellcome, <span>{userInfo?.displayName}</span>
            </p>
          </>
        ) : (
          <>
            <Button
              type="button"
              className="btn"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              className="btn"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </HeaderStyle>
  );
};

export default Header;
