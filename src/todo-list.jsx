import { useState } from "react";
import {
  Bell,
  Calendar,
  Grid,
  Menu,
  Moon,
  RefreshCw,
  Search,
  Star,
  List,
  Sun,
} from "lucide-react";

export default function TodoList({ toggleSidebar }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false, starred: false },
    { id: 2, text: "Finish project report", completed: false, starred: true },
    { id: 3, text: "Call the bank", completed: false, starred: false },
    {
      id: 4,
      text: "Schedule dentist appointment",
      completed: false,
      starred: false,
    },
    { id: 5, text: "Plan weekend trip", completed: false, starred: false },
    { id: 6, text: "Read a book", completed: true, starred: false },
    { id: 7, text: "Clean the house", completed: true, starred: false },
    { id: 8, text: "Prepare presentation", completed: true, starred: false },
    { id: 9, text: "Update blog", completed: true, starred: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, starred: false },
      ]);
      setNewTask("");
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleStar = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, starred: !task.starred } : task
      )
    );
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-[#1F1F1F] text-white" : "bg-white text-black"}`}
    >
      <header className="">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu
              className="h-6 w-6 cursor-pointer"
              onClick={toggleSidebar}
            />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-sm">D</span>
              </div>
              <span className="font-semibold text-green-600">DoIt</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5" />
            {isGridView ? (
              <List
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsGridView((prev) => !prev)}
              />
            ) : (
              <Grid
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsGridView((prev) => !prev)}
              />
            )}

            {isDarkMode ? (
              <Sun
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsDarkMode(false)}
              />
            ) : (
              <Moon
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsDarkMode(true)}
              />
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="mb-4 text-sm ">
            <div className="">All Tasks</div>
          </div>

          <div
            className={`${
              isDarkMode ? "bg-[#2E2E2E]" : "bg-green-50"
            } rounded-lg p-4 mb-6`}
          >
            <input
              type="text"
              placeholder="Add A Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full bg-transparent border-none text-lg placeholder:text-gray-700 outline-none focus-visible:ring-0 p-2"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5" />
                <RefreshCw className="h-5 w-5" />
                <Calendar className="h-5 w-5" />
              </div>
              <button
                onClick={addTask}
                className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-1 text-sm"
              >
                ADD TASK
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-4">Incomplete Tasks</h2>
            <div
              className={`${
                isGridView
                  ? "grid gap-4 grid-cols-2 sm:grid-cols-3"
                  : "space-y-4"
              }`}
            >
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`py-1 flex items-center justify-between ${
                      isGridView
                        ? "border py-8 border-[#808080] px-4"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        className="form-checkbox"
                      />
                      <span>{task.text}</span>
                    </div>
                    <button onClick={() => toggleStar(task.id)}>
                      <Star
                        className={`h-5 w-5 ${
                          task.starred
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium mb-4">Completed Tasks</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-1 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        className="form-checkbox accent-green-600"
                      />
                      <span className="line-through">{task.text}</span>
                    </div>
                    <button onClick={() => toggleStar(task.id)}>
                      <Star
                        className={`h-5 w-5 ${
                          task.starred
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
