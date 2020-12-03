import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => {
  return (
    <Wrapper>
      <FormContent>
        <Thanks>{`Thanks for ordering, ${formData.givenName}!`}</Thanks>
        <Details>{`Your order of ${formData.order} will be sent to your home in ${formData.province}, Canada. Thank you for participating!`}</Details>
      </FormContent>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  padding: 16px 20px;
`;

const FormContent = styled.div`
  margin: 16px;
`;

const Thanks = styled.h2`
  margin: 16px 0 20px 0;
`;

const Details = styled.h2`
  font-size: 14px;
`;


export default ConfirmationMsg;
