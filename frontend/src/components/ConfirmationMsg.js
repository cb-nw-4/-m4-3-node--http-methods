import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({data}) => <Wrapper>
  
 <h1>Order Confirmed!</h1> 
 <h2> Thank you for ordering with us, {data.givenName}! </h2>
<Info>Your order of {data.order} will be sent to {data.province}, Canada. </Info> 
 </Wrapper>;

const Wrapper = styled.div`
  
  padding-top: 200px;
  left: 0;
  height: 100vh;
  display: flex;
flex-direction:column;
  align-items: center;
  text-align:center;
  z-index: 4;
`;

const Info = styled.p`
padding:10px;
`

export default ConfirmationMsg;
