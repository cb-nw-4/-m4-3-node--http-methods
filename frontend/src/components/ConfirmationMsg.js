import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({formData}) => 
  <Wrapper>
    <Thanks>
      {`Thank you for ordering, ${formData.givenName}!`} 
    </Thanks>
    <OrderConfirmation>
      {`Your order of ${formData.order} will be sent to your home in ${formData.province}, Canada. Thank you for participating!`}
    </OrderConfirmation>
  </Wrapper>;

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
  font-weight: 700;
  z-index: 4;
`;

const Thanks = styled.p`
  font-size: 32px;
  padding: 20px;
`

const OrderConfirmation = styled.p` 
  font-size: 24px;
  padding: 20px;
`

export default ConfirmationMsg;
