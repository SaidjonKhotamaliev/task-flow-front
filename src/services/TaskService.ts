import axios from "axios";
import { Task, TaskInput, TaskUpdate } from "../libs/types/task";

class TaskService {
  public async getTasksByBoardId(boardId: string): Promise<Task[]> {
    try {
      const url = `http://localhost:3001/task/getMyTasks?boardId=${encodeURIComponent(
        boardId
      )}`;

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }

  public async createTask(input: TaskInput) {
    console.log("+", input);

    const url = `http://localhost:3001/task/createTask`;

    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(url, input, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  }

  public async updateTask(input: TaskUpdate) {
    const url = `http://localhost:3001/task/updateTask`;

    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(url, input, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  }

  public async deleteTask(taskId: string) {
    const url = `http://localhost:3001/task/deleteTask/${taskId}`;

    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  }
}
export const taskService = new TaskService();
