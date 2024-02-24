import React, { useState } from "react";
import Container from "../../common/Container";
import styled from "styled-components";
import AddButton from "../../components/AddButton/AddButton";

const AddFormWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  display: flex;
  gap: 1rem;
`;

const AddButtonWrapper = styled.div``;

type FormProps = {
  $activeForm: boolean;
};

const TaskForm = styled.form<FormProps>`
  width: 100%;
  padding: 0 1rem;
  border-radius: 12px;
  background-color: #378b8b;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$activeForm ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: 0%;
`;

export default function Task() {
  const [activeForm, setActiveForm] = useState<boolean>(false);

  const handleActiveForm = () => {
    setActiveForm((prev) => !prev);
  };

  return (
    <Container>
      <AddFormWrapper>
        <AddButtonWrapper onClick={handleActiveForm}>
          <AddButton />
        </AddButtonWrapper>
        <TaskForm $activeForm={activeForm}>a</TaskForm>
      </AddFormWrapper>
    </Container>
  );
}
