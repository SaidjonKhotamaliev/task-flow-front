export interface boardInput {
  boardTitle: string;
  boardOwnerId: string;
}

export interface boardUpdate {
  _id: string;
  boardTitle: string;
  boardOwnerId: string;
}

export interface Board {
  _id: string;
  boardTitle: string;
  boardOwnerId: string;
  boardTasksIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
