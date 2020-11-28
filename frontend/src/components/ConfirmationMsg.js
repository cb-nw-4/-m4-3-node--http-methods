import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({formData}) => ( 
  <Wrapper>
    {console.log(formData)}
    <h1>Thanks for ordering, {formData.givenName}!</h1>
    <p>Your order of {formData.order} will be sent to your home in {formData.province}, Canada.</p>
    <p>Thank you for participating!</p>
  </Wrapper>);

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  //align-items: center;
  font-weight: 700;
  z-index: 4; 
  & h1 {
    font-size: 45px;
  }

  & p {
    font-size: 30px;
  }
`;

export default ConfirmationMsg;
