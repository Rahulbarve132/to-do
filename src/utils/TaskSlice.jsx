// taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
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
      {
        id: 4,
        text: "Prepare for the Class",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 5,
        text: "Read Books",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 6,
        text: "Take Lunch",
        completed: false,
        starred: true,
        reminder: "3:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 7,
        text: "Call the bank",
        completed: false,
        starred: false,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 8,
        text: "Plan Weekend Trip",
        completed: false,
        starred: false,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 9,
        text: "Update Blogs",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
    ],
    importantTasks: [
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
        id: 5,
        text: "Read Books",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
     
      {
        id: 7,
        text: "Call the bank",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      
      {
        id: 9,
        text: "Update Blogs",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },

      {
        id: 4,
        text: "Prepare for the Class",
        completed: false,
        starred: true,
        reminder: "4:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
      {
        id: 6,
        text: "Take Lunch",
        completed: false,
        starred: true,
        reminder: "3:00 PM",
        repeat: false,
        dueDate: new Date().toISOString().split("T")[0],
      },
    ],
    isGridView: false,
    isDarkMode: false,
    isAllTasks: true,
    isToday: false,
    isImportant: false,
    isPlanned: false,
    isAssignedToMe: false,
    taskDetail: false,
    selectedTask: null,
    isSidebarOpen: false,
  },
  
  reducers: {
    toggleOpen: (state) => {
        state.isSidebarOpen = !state.isSidebarOpen; // Toggle the value
      },
    toggleTaskDetail: (state) => {
      state.taskDetail = !state.taskDetail;
    },
    
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      if (action.payload.starred) {
        state.importantTasks.push(action.payload);
      }
    },
   
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        // Update the task in importantTasks if it exists there
        const importantTask = state.importantTasks.find((t) => t.id === action.payload);
        if (importantTask) {
          importantTask.completed = task.completed;
        }
      }
    },

    toggleStar: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.starred = !task.starred;
        if (task.starred) {
          // Add to importantTasks if not already present
          if (!state.importantTasks.some(t => t.id === task.id)) {
            state.importantTasks.push({ ...task });
          }
        } else {
          // Remove from importantTasks
          state.importantTasks = state.importantTasks.filter(
            (t) => t.id !== action.payload
          );
        }
      }
    },

    setReminder: (state, action) => {
      const { id, reminder } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.reminder = reminder;
        // Update in importantTasks if present
        const importantTask = state.importantTasks.find((t) => t.id === id);
        if (importantTask) {
          importantTask.reminder = reminder;
        }
      }
    },

    toggleRepeat: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.repeat = !task.repeat;
        // Update in importantTasks if present
        const importantTask = state.importantTasks.find((t) => t.id === action.payload);
        if (importantTask) {
          importantTask.repeat = task.repeat;
        }
      }
    },

    setDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.dueDate = dueDate;
        // Update in importantTasks if present
        const importantTask = state.importantTasks.find((t) => t.id === id);
        if (importantTask) {
          importantTask.dueDate = dueDate;
        }
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.importantTasks = state.importantTasks.filter(
        (task) => task.id !== action.payload
      );
    },

    toggleGridView: (state) => {
      state.isGridView = !state.isGridView;
    },

    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    setActiveTask: (state, action) => {
      state.isAllTasks = action.payload === "all";
      state.isToday = action.payload === "today";
      state.isImportant = action.payload === "important";
      state.isPlanned = action.payload === "planned";
      state.isAssignedToMe = action.payload === "assigned";
    },

    toggleSidebar: (state) => {
      // Update importantTasks to match starred tasks from main tasks array
      state.importantTasks = state.tasks.filter((task) => task.starred);
    },
  },
});

// Selectors
export const selectIsSidebarOpen = (state) => state.task.isSidebarOpen;
export const selectTotalTasks = (state) => state.task.tasks.length;
export const selectCompletedTasks = (state) => state.task.tasks.filter((task) => task.completed).length;
export const selectIncompleteTasks = (state) => state.task.tasks.filter((task) => !task.completed).length;
export const selectIsGridView = (state) => state.task.isGridView;
export const selectIsDarkMode = (state) => state.task.isDarkMode;
export const selectIsAllTasks = (state) => state.task.isAllTasks;
export const selectIsToday = (state) => state.task.isToday;
export const selectIsImportant = (state) => state.task.isImportant;
export const selectIsPlanned = (state) => state.task.isPlanned;
export const selectIsAssignedToMe = (state) => state.task.isAssignedToMe;
export const selectImportantTasks = (state) => state.task.importantTasks;
export const selectTaskDetail = (state) => state.task.taskDetail;
export const selectSelectedTask = (state) => state.task.selectedTask;

export const {
  addTask,
  toggleComplete,
  toggleStar,
  setReminder,
  toggleRepeat,
  setDueDate,
  deleteTask,
  toggleGridView,
  toggleDarkMode,
  setActiveTask,
  toggleSidebar,
  toggleTaskDetail,
  setSelectedTask,
  toggleOpen,
  
} = taskSlice.actions;

export default taskSlice.reducer;