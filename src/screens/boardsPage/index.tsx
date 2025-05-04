import React, { useEffect, useState } from "react";
import { boardService } from "../../services/BoardService";
import { Board } from "../../libs/types/board";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BoardsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");

  const fetchBoards = async () => {
    try {
      const data = await boardService.getMyBoards();
      setBoards(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleCreate = async () => {
    try {
      const board = await boardService.createBoard(newTitle);
      setBoards((prev) => [...prev, board]);
      setNewTitle("");
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const handleEditClick = (board: Board) => {
    setEditingBoardId(board._id);
    setNewBoardTitle(board.boardTitle);
  };

  const handleUpdate = async () => {
    if (!editingBoardId || !newBoardTitle.trim()) return;

    try {
      const updatedBoard = await boardService.updateBoard(
        editingBoardId,
        newBoardTitle.trim()
      );
      setBoards((prev) =>
        prev.map((b) =>
          b._id === editingBoardId
            ? { ...b, boardTitle: updatedBoard.boardTitle }
            : b
        )
      );
      setEditingBoardId(null);
      setNewBoardTitle("");
    } catch (err) {
      console.error("Update error:", err);
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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/user/login");
    }
    fetchBoards();
  }, [navigate]);

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
              {editingBoardId === board._id ? (
                <>
                  <input
                    type="text"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingBoardId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginRight: "10px",
                    }}
                    onClick={() =>
                      navigate(`/task/getMyTasks?boardId=${board._id}`)
                    }
                  >
                    {board.boardTitle}
                  </span>
                  <button onClick={() => handleEditClick(board)}>Edit</button>
                  <button onClick={() => handleDelete(board._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BoardsScreen;
