import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setTask, switchTask } from "../../api/task/taskApi";
import Container from "../../common/Container";
import styled from "styled-components";

const TaksListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 6px;
  padding: 1rem;
`;

const TaskListIndex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-between;
  margin-block: 1rem;
  gap: 4rem;
  background-color: #212121;
  padding: 1rem;
  color: white;
  border-radius: 6px;

  p {
    width: 100%;
  }
`;

const TaskListUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  flex: 1;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 6px;
  background-color: aliceblue;
  justify-content: space-between;
  gap: 4rem;
  cursor: pointer;

  &:hover {
    background-color: #2574b9;
    color: white;
  }

  p {
    width: 100%;
  }
`;

export default function TaskList() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: tasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: setTask,
    staleTime: 1000 * 5,
  });

  const indexArr = tasks && Object.keys(tasks[0]);

  const switchMutation = useMutation({
    mutationFn: switchTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      console.log("something is broken");
    },
  });

  isError && <div>Something went wrong</div>;

  isLoading && <div>Loading</div>;

  return (
    <Container>
      <TaksListWrapper>
        <TaskListIndex>
          {tasks &&
            indexArr?.slice(1).map((key) => {
              return <p key={key}>{key}</p>;
            })}
        </TaskListIndex>
        <TaskListUl>
          {tasks?.map((task) => {
            return (
              <ListItem
                key={task.id}
                onClick={() => {
                  switchMutation.mutate(task);
                }}>
                <p>{task.title} </p>
                <p>{task.desc}</p>
                <p>{task.createdAt}</p>
                <p>{task.isDone ? "완료" : "진행 중"}</p>
              </ListItem>
            );
          })}
        </TaskListUl>
      </TaksListWrapper>
    </Container>
  );
}
