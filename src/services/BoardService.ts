import axios from "axios";
import { boardInput, boardUpdate, Board } from "../libs/types/board";

class BoardService {
  private API_URL = "http://localhost:3001/board";

  private getAuthHeaders() {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  public async getMyBoards(): Promise<Board[]> {
    const response = await axios.get(
      `${this.API_URL}/my-boards`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  public async createBoard(boardTitle: string): Promise<Board> {
    const response = await axios.post(
      `${this.API_URL}/createBoard`,
      { boardTitle },
      this.getAuthHeaders()
    );
    return response.data;
  }

  public async deleteBoard(boardId: string): Promise<void> {
    await axios.delete(
      `${this.API_URL}/deleteBoard/${boardId}`,
      this.getAuthHeaders()
    );
  }

  public async updateBoard(boardId: string, newTitle: string): Promise<Board> {
    const response = await axios.post(
      `${this.API_URL}/updateBoard`,
      { _id: boardId, boardTitle: newTitle },
      this.getAuthHeaders()
    );
    return response.data;
  }
}

export const boardService = new BoardService();
