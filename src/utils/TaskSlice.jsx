import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: [
    {
      id: 1,
      text: "Complete the Redux tutorial",
      completed: false,
      starred: true,
      reminder: null,
      repeat: false,
      dueDate: null,
    },
    {
      id: 2,
      text: "Buy groceries",
      completed: true,
      starred: false,
      reminder: null,
      repeat: false,
      dueDate: null,
    },
    {
      id: 3,
      text: "Prepare for the meeting",
      completed: false,
      starred: false,
      reminder: "3:00 PM",
      repeat: false,
      dueDate: new Date().toISOString().split("T")[0],
    },
  ],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload); // Add a new task
    },
    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleStar: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.starred = !task.starred;
      }
    },
    setReminder: (state, action) => {
      const { id, reminder } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.reminder = reminder;
      }
    },
    toggleRepeat: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.repeat = !task.repeat;
      }
    },
    setDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.dueDate = dueDate;
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

// Selectors
export const selectTotalTasks = (state) => state.task.length;
export const selectCompletedTasks = (state) =>
  state.task.filter((task) => task.completed).length;
export const selectIncompleteTasks = (state) =>
  state.task.filter((task) => !task.completed).length;

export const {
  addTask,
  toggleComplete,
  toggleStar,
  setReminder,
  toggleRepeat,
  setDueDate,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
