import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid #00000050;
  font-size: 1.25rem;
  margin: auto;
`;

export default function Header() {
  return <HeaderContainer>Header</HeaderContainer>;
}
