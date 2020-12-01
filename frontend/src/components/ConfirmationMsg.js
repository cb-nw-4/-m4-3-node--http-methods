import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({formData}) => {
return <Wrapper>
<Text>Thanks for ordering {formData.givenName}!</Text>
<Text>Your order of {formData.order} will be sent to your home in {formData.province}, Canada. Thank you for participating!</Text>
</Wrapper>;
};

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

const Text = styled.p`
  width: 1000px;
`;

export default ConfirmationMsg;
