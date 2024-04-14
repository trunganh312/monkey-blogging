import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import SidebarMB from "./SidebarMB";
import useClickOutSide from "hooks/useClickOutSide";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }
`;
const DashboardLayout = () => {
  const { nodeRef, show, setShow } = useClickOutSide();
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>

      <div className='dashboard-main'>
        <div className='lg:invisible z-40'>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 '
            aria-controls='navbar-default'
            aria-expanded='false'
            onClick={() => setShow(!show)}
            ref={nodeRef}
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
        </div>
        <div
          className={`sidebar duration-200 position-z-99 ${
            show ? " translate-x-0" : " translate-x-[-100%]"
          }`}
          onClick={() => setShow(false)}
        >
          <SidebarMB></SidebarMB>
        </div>
        <Sidebar></Sidebar>
        <div className='dashboard-children'>
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
