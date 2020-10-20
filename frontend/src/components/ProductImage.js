import React from "react";
import styled from "styled-components";

import { imgFiles } from "../settings";

const ProductImage = ({ image }) => (
  <Wrapper imageUrl={`images/${imgFiles[image]}`}></Wrapper>
);

const Wrapper = styled.div`
  background: url(${(props) => props.imageUrl}) no-repeat center;
  background-size: 340px;
  border-radius: 4px 4px 0 0;
  height: 220px;
  width: 100%;
  overflow: hidden;
`;

export default ProductImage;
