export interface UserInput {
  userName: string;
  userEmail: string;
  userPassword: string;
}

export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userBoardsIds: string[];
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginInput {
  userName: string;
  userPassword: string;
}
