import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface taskInput {
  taskTitle: string;
  taskDesc: string;
  taskStatus?: TaskStatus;
  taskPriority: TaskPriority;
  taskDueDate: Date;
  boardId: string;
}

export interface taskUpdate {
  _id: string;
  taskTitle?: string;
  taskDesc?: string;
  taskStatus?: TaskStatus;
  taskPriority?: TaskPriority;
  taskDueDate?: Date;
  boardId: string;
}

export interface Task {
  taskTitle: string;
  taskDesc: string;
  taskStatus: TaskStatus;
  taskPriority: TaskPriority;
  boardId: string;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
