import React, { useEffect, useState } from "react";
import { boardService } from "../../services/BoardService";
import { Board } from "../../libs/types/board";
import { Stack, Button, TextField, Typography, Box } from "@mui/material";
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
    <Box sx={{ padding: 4, backgroundColor: "#f4f7fc", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center">
        My Boards
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        marginBottom={3}
      >
        <TextField
          variant="outlined"
          label="New Board Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create
        </Button>
      </Stack>

      <Stack spacing={2} alignItems="center">
        {boards.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No boards found
          </Typography>
        ) : (
          boards.map((board) => (
            <Stack
              key={board._id}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: 1,
                width: "100%",
                maxWidth: "500px",
              }}
            >
              {editingBoardId === board._id ? (
                <>
                  <TextField
                    variant="outlined"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setEditingBoardId(null)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      navigate(`/task/getMyTasks?boardId=${board._id}`)
                    }
                  >
                    {board.boardTitle}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(board)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(board._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default BoardsScreen;
