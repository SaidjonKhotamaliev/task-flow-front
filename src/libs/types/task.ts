import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface TaskInput {
  taskTitle: string;
  taskDesc: string;
  taskStatus?: TaskStatus;
  taskPriority: TaskPriority;
  taskDueDate: Date | null;
  boardId: string | null;
}

export interface TaskUpdate {
  taskTitle?: string;
  taskDesc?: string;
  taskStatus?: TaskStatus;
  taskPriority?: TaskPriority;
  taskDueDate?: Date;
  boardId?: string;
}

export interface Task {
  _id: string;
  taskTitle: string;
  taskDesc: string;
  taskStatus: TaskStatus;
  taskPriority: TaskPriority;
  boardId: string;
  taskDueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
