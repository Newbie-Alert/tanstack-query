import React, { useEffect, useState } from "react";
import styled from "styled-components";

type StAddButtonProps = {
  $isFocus: boolean;
};

const AddFormToggleBtn = styled.button<StAddButtonProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: none;
  background-color: #3fd984;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.$isFocus ? "rotateZ(135deg)" : "rotateZ(0deg)"};

  p {
    font-weight: 600;
    text-align: center;
    font-size: 2rem;
  }
`;

export default function AddButton() {
  const [isAdding, setIsAdding] = useState(false);
  const handleIsAdding = () => {
    setIsAdding((prev) => !prev);
  };

  return (
    <AddFormToggleBtn onClick={handleIsAdding} $isFocus={isAdding}>
      <p>+</p>
    </AddFormToggleBtn>
  );
}
