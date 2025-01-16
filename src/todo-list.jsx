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
import TimePicker from "react-time-picker";
import CalendarComponent from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleComplete, toggleStar } from "./utils/TaskSlice";
import "react-calendar/dist/Calendar.css";

export default function TodoList({ toggleSidebar }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task);

  const [newTask, setNewTask] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [showClock, setShowClock] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        starred: false,
        reminder,
        repeat,
        dueDate,
      };
      dispatch(addTask(task));
      setNewTask("");
      setReminder(null);
      setRepeat(false);
      setDueDate(null);
    }
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleComplete(taskId));
  };

  const handleToggleStar = (taskId) => {
    dispatch(toggleStar(taskId));
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-[#1F1F1F] text-white" : "bg-white text-black"
      }`}
    >
      <header>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
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
          <div className="mb-4 text-sm">All Tasks</div>

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
                <Bell
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setShowClock((prev) => !prev)}
                />
                <RefreshCw
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setRepeat((prev) => !prev)}
                />
                <Calendar
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setShowCalendar((prev) => !prev)}
                />
              </div>
              <button
                onClick={handleAddTask}
                className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-1 text-sm"
              >
                ADD TASK
              </button>
            </div>
          </div>

          {showClock && (
            <div className="absolute top-0 left-0 bg-white p-4 shadow-lg">
              <TimePicker value={reminder || ""} onChange={setReminder} />
            </div>
          )}
          {showCalendar && (
            <div className="absolute top-0 left-0 bg-white p-4 shadow-lg">
              <CalendarComponent value={dueDate} onChange={handleDateSelect} />
            </div>
          )}

          <div>
            <h2 className="text-sm font-medium mb-4">Incomplete Tasks</h2>
            <div
              className={`${
                isGridView
                  ? "grid gap-4 grid-cols-2 sm:grid-cols-3"
                  : "space-y-4 "
              }`}
            >
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div key={task.id} className={`py-2 flex items-center justify-between ${isGridView ? "border px-4 py-8 border-[#9b9b9b]":" border-t-2"}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                       
                      />
                      <span>{task.text}</span>
                    </div>
                    <button onClick={() => handleToggleStar(task.id)}>
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
            <div
            >
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <div key={task.id} className="py-4 border-t-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                         className="accent-green-700"
                      />
                      <span className="line-through">{task.text}</span>
                    </div>
                    <button onClick={() => handleToggleStar(task.id)}>
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
