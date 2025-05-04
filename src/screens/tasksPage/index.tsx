import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Task, TaskInput, TaskUpdate } from "../../libs/types/task";
import { taskService } from "../../services/TaskService";
import { TaskStatus, TaskPriority } from "../../libs/enums/task.enum";

const Tasks: React.FC = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, setTaskDueDate] = useState<Date | null>(null);
  const [taskPriority, setTaskPriority] = useState<TaskPriority>(
    TaskPriority.LOW_PRIORITY
  );
  const [taskTitle, setTaskTitle] = useState("");

  const getTasks = async () => {
    console.log("+boardId", boardId);

    try {
      if (boardId) {
        const fetchedTasks = await taskService.getTasksByBoardId(boardId);
        setTasks(fetchedTasks);
      }
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  const createTaskInput = {
    boardId: boardId,
    taskPriority: taskPriority,
    taskDesc: taskDesc,
    taskDueDate: taskDueDate,
    taskTitle: taskTitle,
  };
  const handleCreateTask = async () => {
    if (!taskDesc || !taskDueDate) return;
    await taskService.createTask(createTaskInput);
    setTaskTitle("");
    setTaskDesc("");
    setTaskDueDate(null);
    setTaskPriority(TaskPriority.LOW_PRIORITY);
    getTasks();
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const input: TaskUpdate = { _id: taskId, taskStatus: newStatus };
    console.log(input);

    await taskService.updateTask(input);
    getTasks();
  };

  const handlePriorityChange = async (
    taskId: string,
    newPriority: TaskPriority
  ) => {
    // await taskService.updateTask(taskId, { taskPriority: newPriority });
    getTasks();
  };

  const handleDeleteTask = async (taskId: string) => {
    await taskService.deleteTask(taskId);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, [boardId]);

  const groupedTasks = {
    TODO: tasks.filter((t) => t.taskStatus === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.taskStatus === "IN_PROGRESS"),
    COMPLETED: tasks.filter((t) => t.taskStatus === "COMPLETED"),
  };

  const renderCard = (task: Task) => {
    const priorityColors: Record<string, string> = {
      low: "#4CAF50",
      medium: "#FFC107",
      high: "#FF5722",
      highest: "#F44336",
    };

    return (
      <div>
        <div>
          <div
            key={task._id}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{
                background: priorityColors[task.taskPriority],
                color: "#fff",
                padding: "2px 6px",
                fontSize: 12,
                borderRadius: 4,
                marginBottom: 6,
                display: "inline-block",
              }}
            >
              {task.taskPriority} priority
            </span>
            <h2 style={{ margin: "8px 0" }}>{task.taskTitle}</h2>
            <p style={{ margin: "8px 0" }}>{task.taskDesc}</p>

            <div style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
              📅 {new Date(task.taskDueDate).toLocaleDateString()} &nbsp; ⏰{" "}
              {new Date(task.taskDueDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={task.taskStatus}
                onChange={(e) =>
                  handleStatusChange(task._id, e.target.value as TaskStatus)
                }
              >
                <option value={TaskStatus.TODO}>TODO</option>
                <option value={TaskStatus.IN_PROGRESS}>IN PROGRESS</option>
                <option value={TaskStatus.COMPLETED}>COMPLETED</option>
              </select>
              <select
                value={task.taskPriority}
                onChange={(e) =>
                  handlePriorityChange(task._id, e.target.value as TaskPriority)
                }
              >
                <option value={TaskPriority.LOW_PRIORITY}>low</option>
                <option value={TaskPriority.MEDIUM_PRIORITY}>medium</option>
                <option value={TaskPriority.HIGH_PRIORITY}>high</option>
                <option value={TaskPriority.HIGHEST_PRIORITY}>highest</option>
              </select>
              <button onClick={() => handleDeleteTask(task._id)}>🗑️</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderColumn = (status: keyof typeof groupedTasks, title: string) => (
    <div
      style={{ flex: 1, background: "#f3f4f6", borderRadius: 8, padding: 16 }}
    >
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {groupedTasks[status].map(renderCard)}
    </div>
  );

  return (
    <div>
      {boardId && (
        <div style={{ padding: 20 }}>
          <h2>Create New Task</h2>
          <input
            placeholder="Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <input
            placeholder="Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <input
            type="datetime-local"
            value={taskDueDate ? taskDueDate.toISOString().slice(0, 16) : ""}
            onChange={(e) => setTaskDueDate(new Date(e.target.value))}
            style={{ marginRight: 8 }}
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
          >
            <option value={TaskPriority.LOW_PRIORITY}>low</option>
            <option value={TaskPriority.MEDIUM_PRIORITY}>medium</option>
            <option value={TaskPriority.HIGH_PRIORITY}>high</option>
            <option value={TaskPriority.HIGHEST_PRIORITY}>highest</option>
          </select>
          <button onClick={handleCreateTask} style={{ marginLeft: 8 }}>
            Create Task
          </button>
        </div>
      )}
      <div style={{ display: "flex", gap: 20, padding: 24 }}>
        {renderColumn("TODO", "TO DO")}
        {renderColumn("IN_PROGRESS", "IN PROGRESS")}
        {renderColumn("COMPLETED", "COMPLETED")}
      </div>
    </div>
  );
};

export default Tasks;
