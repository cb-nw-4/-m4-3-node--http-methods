import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ name, product, province }) => (
  <Wrapper>
    <TopText>{`Thank you for ordering, ${name}!`}</TopText>
    <BottomText>{`Your order of ${product} will be sent to your home in ${province}, Canada. Thank you for participating!`}</BottomText>
  </Wrapper>
);
const Wrapper = styled.div`
  /* position: fixed; */
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

const TopText = styled.p`
display: flex;
justify-content: center;
padding: 1rem;
`;

const BottomText = styled.p`
display: flex;
justify-content: center;
padding: 1rem;
`;

export default ConfirmationMsg;
