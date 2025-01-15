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
} from "lucide-react";

export default function TodoList({ toggleSidebar }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false, starred: false },
    { id: 2, text: "Finish project report", completed: false, starred: true },
    { id: 3, text: "Call the bank", completed: false, starred: false },
    { id: 4, text: "Schedule dentist appointment", completed: false, starred: false },
    { id: 5, text: "Plan weekend trip", completed: false, starred: false },
    { id: 6, text: "Read a book", completed: true, starred: false },
    { id: 7, text: "Clean the house", completed: true, starred: false },
    { id: 8, text: "Prepare presentation", completed: true, starred: false },
    { id: 9, text: "Update blog", completed: true, starred: false },
  ]);

  const [newTask, setNewTask] = useState("");

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
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu
              className="h-6 w-6 text-gray-500 cursor-pointer"
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
            <Search className="h-5 w-5 text-gray-500" />
            <Grid className="h-5 w-5 text-gray-500" />
            <Moon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <select className="mb-4 text-sm text-gray-600 border-none focus:ring-0">
            <option>To Do</option>
          </select>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <input
              type="text"
              placeholder="Add A Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full bg-transparent border-none text-lg placeholder:text-gray-400 outline-none focus-visible:ring-0 p-2"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-gray-400" />
                <RefreshCw className="h-5 w-5 text-gray-400" />
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={addTask}
                className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-1 text-sm"
              >
                ADD TASK
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="form-checkbox"
                    />
                    <span className="text-gray-700">{task.text}</span>
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
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">Completed</h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="form-checkbox"
                    />
                    <span className="text-gray-400 line-through">
                      {task.text}
                    </span>
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
      </main>
    </div>
  );
}
