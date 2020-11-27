import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => {
  console.log(formData);
  return (
    <Wrapper>
      <Text>Order Confirmed!</Text>
      <Text>
        Thanks for making an order {formData.givenName} {formData.surname}
      </Text>
      <Text>We will deliver within the hour to: </Text>
      <Text>{formData.address}, {formData.city}, {formData.province} {formData.postcode}  </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const Text = styled.p`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
