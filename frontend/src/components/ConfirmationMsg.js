import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => {
  return (
    <Wrapper>
      <ThankYou>{`Thanks for ordering, ${formData.givenName}!`}</ThankYou>
      <OrderDetails>{`Your order of ${formData.order} will be sent to your home in ${formData.province}, Canada. Thank you for participating!`}</OrderDetails>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThankYou = styled.p`
  font-size: 32px;
  font-weight: 700;
`;

const OrderDetails = styled.p`
  font-size: 28px;
`;

export default ConfirmationMsg;
