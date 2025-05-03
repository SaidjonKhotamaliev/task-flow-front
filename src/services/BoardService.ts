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

  async getMyBoards(): Promise<Board[]> {
    const response = await axios.get(
      `${this.API_URL}/my-boards`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async createBoard(boardTitle: string): Promise<Board> {
    const response = await axios.post(
      `${this.API_URL}/createBoard`,
      { boardTitle },
      this.getAuthHeaders()
    );
    return response.data;
  }

  async deleteBoard(boardId: string): Promise<void> {
    await axios.delete(
      `${this.API_URL}/deleteBoard/${boardId}`,
      this.getAuthHeaders()
    );
  }
}

export const boardService = new BoardService();
