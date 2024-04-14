import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .header-left {
    display: flex;
    flex: 1;
    @media only screen and (max-width: 739px) {
      justify-content: space-between;
    }
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
    & li {
      @media only screen and (max-width: 739px) {
        display: none;
      }
    }
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
    @media only screen and (max-width: 739px) {
      display: none;
    }

    @media only screen and (min-width: 900px) and (max-width: 1023px) {
      display: none;
    }
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
  .sidebar {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    height: 500px;
    border-radius: 10px;
    padding: 10px 20px;
  }
`;

const Header = () => {
  const { userInfo } = useAuth();
  const isLogin = !!userInfo?.email;
  const menuLink = [
    {
      show: true,
      url: "/",
      title: "Home",
    },
    {
      show: true,
      url: "/blog",
      title: "Blog",
    },
    {
      show: true,
      url: "/contact",
      title: "Contact",
    },
    {
      show: isLogin ? true : false,
      url: "/dashboard",
      title: "Dashboard",
    },
  ];
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HeaderStyle>
      <div className={`sidebar duration-200 ${show ? " translate-x-0" : " translate-x-[200%]"}`}>
        <div className='leading-10'>
          {menuLink.map((menu) => {
            return (
              <li key={menu.title} className={`${menu?.show ? "block" : "hidden"} menu-item`}>
                <NavLink to={menu.url} className='menu-link'>
                  {menu.title}
                </NavLink>
              </li>
            );
          })}
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          {isLogin ? (
            <>
              <Button type='button' className='btn ' onClick={handleSignOut}>
                Sign Out
              </Button>
              <p className='title'>
                Wellcome, <span>{userInfo?.displayName}</span>
              </p>
            </>
          ) : (
            <>
              <Button type='button' className='btn ' onClick={() => navigate("/sign-up")}>
                Sign Up
              </Button>
              <Button type='button' className='btn' onClick={() => navigate("/sign-in")}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='header-left'>
        <NavLink to='/'>
          <div className='logo'>
            <img alt='monkey-blogging' srcSet='/monkey.png 2x' />
          </div>
        </NavLink>
        <ul className='menu '>
          {menuLink.map((menu) => {
            return (
              <li key={menu.title} className={`${menu?.show ? "" : "hidden"} menu-item`}>
                <NavLink to={menu.url} className='menu-link'>
                  {menu.title}
                </NavLink>
              </li>
            );
          })}
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400'
            aria-controls='navbar-default'
            aria-expanded='false'
            onClick={() => setShow(!show)}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </ul>
      </div>
      <div className='header-right'>
        {isLogin ? (
          <>
            <Button type='button ' className='btn max-sm:hidden' onClick={handleSignOut}>
              Sign Out
            </Button>
            <div className='title !max-sm:hidden'>
              Wellcome, <span>{userInfo?.displayName}</span>
            </div>
          </>
        ) : (
          <>
            <Button
              type='button'
              className='btn max-sm:hidden '
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
            <Button
              type='button'
              className='btn max-md:hidden'
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
