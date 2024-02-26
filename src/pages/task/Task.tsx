import { ChangeEvent, useState } from "react";
import Container from "../../common/Container";
import styled, { keyframes } from "styled-components";
import AddButton from "../../components/AddButton/AddButton";
import { v4 as uuid } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../api/task/taskApi";
import TaskList from "../../components/taskList/TaskList";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 100%;
  }

  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

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
  width: 30%;
  min-width: 350px;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background-color: #378b8b;
  animation: ${fadeIn} 0.3s forwards;
`;

const TaskInput = styled.input.attrs({
  placeholder: "할 일을 입력하세요",
  maxLength: 30,
})`
  width: 100%;
  padding: 0.6rem;
  border: none;
  outline: none;
  background-color: #eee;
  margin-block: 0.6rem;
  border-radius: 4px;
`;

const TaskTextArea = styled.textarea.attrs({
  placeholder: "내용을 입력하세요",
  maxLength: 150,
})`
  width: 100%;
  padding: 0.6rem;
  border: none;
  outline: none;
  background-color: #eee;
  margin-block: 0.6rem;
  border-radius: 4px;
  resize: none;
`;

const LabelEl = styled.label`
  color: white;
  font-weight: 600;
`;

export interface TaskType {
  id: string;
  title: string;
  desc: string;
  createdAt: string;
  isDone: boolean;
}

export default function Task() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      console.log("something is broken");
    },
  });

  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [task, setTask] = useState<TaskType>({
    id: uuid(),
    title: "",
    desc: "",
    createdAt: new Date().toLocaleTimeString("kr-KO", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
    isDone: false,
  });

  const handleActiveForm = () => {
    setActiveForm((prev) => !prev);
  };

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === "title" && setTask((prev) => ({ ...prev, title: value }));
  };

  const handleDescInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    name === "desc" && setTask((prev) => ({ ...prev, desc: value }));
  };

  const resetTaskInput = () => {
    setTask({
      id: uuid(),
      title: "",
      desc: "",
      createdAt: new Date().toLocaleTimeString("kr-KO", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
      isDone: false,
    });
  };

  return (
    <Container>
      <AddFormWrapper>
        <AddButtonWrapper onClick={handleActiveForm}>
          <AddButton />
        </AddButtonWrapper>
        {activeForm && (
          <TaskForm
            $activeForm={activeForm}
            onSubmit={(e) => {
              e.preventDefault();
              addMutation.mutate(task);
              resetTaskInput();
            }}>
            <LabelEl htmlFor="task">할 일</LabelEl>
            <TaskInput
              id="task"
              name="title"
              value={task.title}
              onChange={handleTitleInput}
            />
            <LabelEl htmlFor="desc">상세 내용</LabelEl>
            <TaskTextArea
              id="desc"
              name="desc"
              value={task.desc}
              onChange={handleDescInput}
            />
            <button>Add Task</button>
          </TaskForm>
        )}
      </AddFormWrapper>
      <TaskList />
    </Container>
  );
}
