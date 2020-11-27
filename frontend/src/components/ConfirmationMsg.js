import React from "react";
import styled from "styled-components";

const ConfirmationMsg = (props) => {
  return (
    <Wrapper>
      <Smiley>😃</Smiley>
      <Thanks>Thanks for ordering {props.givenName}</Thanks>
      <OrderDetail>
        Your {props.order} order shipping to {props.province} has been confirmed
      </OrderDetail>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  z-index: 4;
`;

const Smiley = styled.p`
  text-align: center;
  font-size: 70px;
`;

const Thanks = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const OrderDetail = styled.p`
  text-align: center;
  font-size: 20px;
`;

export default ConfirmationMsg;
