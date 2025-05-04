import axios from "axios";
import { Task, TaskInput, TaskUpdate } from "../libs/types/task";

class TaskService {
  public async getTasksByBoardId(boardId: string): Promise<Task[]> {
    try {
      console.log("Requesting tasks for boardId:", boardId);

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

  public async updateTask(taskId: string, input: TaskUpdate) {
    const response = await axios.post(`/task/updateTask/${taskId}`, input, {
      withCredentials: true,
    });
    return response.data;
  }

  public async deleteTask(taskId: string) {
    const response = await axios.delete(`/task/deleteTask/${taskId}`, {
      withCredentials: true,
    });
    return response.data;
  }
}
export const taskService = new TaskService();
