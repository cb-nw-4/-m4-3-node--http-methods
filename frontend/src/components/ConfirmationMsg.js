import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => (
<Wrapper>
  <p>Thanks for ordering {formData.givenName}!</p>
  <h1>Your order of {formData.order} will be sent to your home in {formData.province}, Canada. Thank you for participating!</h1>
</Wrapper>
);

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;


export default ConfirmationMsg;
