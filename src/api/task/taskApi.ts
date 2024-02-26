import axios from "axios";
import { TaskType } from "../../pages/task/Task";

const API_URL = "http://localhost:3001/tasks";

export const setTask = async () => {
  const res = await axios.get(API_URL);
  const tasks = await res.data;
  return tasks as TaskType[];
};

export const addTask = async (data: TaskType) => {
  await axios.post(API_URL, data);
};

export const switchTask = async (data: TaskType) => {
  await axios.patch(`${API_URL}/${data.id}`, { isDone: !data.isDone }, {});
};
