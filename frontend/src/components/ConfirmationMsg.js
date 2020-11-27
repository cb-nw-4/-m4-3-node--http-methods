import React from "react";
import styled from "styled-components";


const ConfirmationMsg = ({formData}) => 

<Wrapper>
  
  <div className='order'>
    {`Thanks for ordering, ${formData.surname} ${formData.givenName}!`}
  </div>
  
  <div>
    {`Your order of ${formData.order} will be sent to your home 
    in ${formData.province}, Canada. Thank you for participating!`}
  </div>


</Wrapper>;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;


  & div{
    color: #B3B6B7;
    margin: 20px;
    padding-left: 20px;
  }
  .order{
    color: gray
  }
`;

export default ConfirmationMsg;
