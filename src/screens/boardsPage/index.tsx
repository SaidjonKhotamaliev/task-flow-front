import React, { useEffect, useState } from "react";
import { boardService } from "../../services/BoardService";
import { Board } from "../../libs/types/board";
import { Stack } from "@mui/material";

const BoardsScreen: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchBoards = async () => {
    try {
      const data = await boardService.getMyBoards();
      setBoards(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      const board = await boardService.createBoard(newTitle);
      setBoards((prev) => [...prev, board]);
      setNewTitle("");
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await boardService.deleteBoard(id);
      setBoards((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Boards</h2>
      <Stack>
        <input
          type="text"
          placeholder="New board title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </Stack>

      <ul>
        {boards.length === 0 ? (
          <li>No boards found</li>
        ) : (
          boards.map((board) => (
            <li key={board._id}>
              {board.boardTitle}
              <button onClick={() => handleDelete(board._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BoardsScreen;
