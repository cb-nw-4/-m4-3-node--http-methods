import React from "react";
import styled from "styled-components";

const ErrorMsg = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 75px;
  width: 80%;
  justify-content: center;
  text-align: center;
  color: red;
  font-size: 14px;
  font-weight: bold;
`;

export default ErrorMsg;