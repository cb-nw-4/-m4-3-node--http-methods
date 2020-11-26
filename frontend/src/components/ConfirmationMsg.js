import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({formData}) => {
  return(  
    <Wrapper> 
      <p>Thanks for ordering, {formData.givenName}!</p> 
      <p>Your order of {formData.order} will be sent to your home in {formData.province}, Canada. Thank you for participating!</p> 
    </Wrapper> 
  )
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
