import React from "react";
import styled, { keyframes } from "styled-components";

const Button = ({ handleClick, disabled, subStatus }) => (
  <Wrapper disabled={disabled} onClick={handleClick}>
    {subStatus === "pending" && (
      <Loading>
        <div></div>
        <div></div>
      </Loading>
    )}
    {subStatus === "idle" && <span className="button-label">Submit</span>}
  </Wrapper>
);

const Wrapper = styled.button`
  position: relative;
  background: #363292;
  border-color: transparent;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 16px auto;
  height: 42px;
  width: 90%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const ldsRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  top: -21px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

export default Button;
