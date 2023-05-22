import React from "react";
import styled from "styled-components";

const LoadingStyle = styled.div`
  border: 3px solid hsla(185, 100%, 62%, 0.2);
  border-top-color: #3cefff;
  border-bottom-color: #3cefff;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpiner = () => {
  return <LoadingStyle></LoadingStyle>;
};

export default LoadingSpiner;
