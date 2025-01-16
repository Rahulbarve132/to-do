
import { useState } from "react";
import { Bell, Calendar, RefreshCw, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  addTask,
  toggleComplete,
  toggleStar,
  selectIsDarkMode,
  selectIsGridView,
  selectIsAllTasks,
  selectIsToday,
  selectIsImportant,
  selectImportantTasks,
  selectIsPlanned,
  selectIsAssignedToMe,
  toggleTaskDetail,
  setSelectedTask,
} from "../utils/TaskSlice";

export default function TodoList({ toggleSidebar }) {
  const dispatch = useDispatch();

  // Get values from Redux
  const tasks = useSelector((state) => state.task.tasks);
  const importantTasks = useSelector(selectImportantTasks);
  const isGridView = useSelector(selectIsGridView);
  const isDarkMode = useSelector(selectIsDarkMode);
  const isAllTask = useSelector(selectIsAllTasks);
  const isToday = useSelector(selectIsToday);
  const isImportant = useSelector(selectIsImportant);
  const isPlanned = useSelector(selectIsPlanned);
  const isAssignedToMe = useSelector(selectIsAssignedToMe);

  const [newTask, setNewTask] = useState("");
  const [reminder, setReminder] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [dueDate, setDueDate] = useState(null);

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


  function handleTaskSelected(task) {
    dispatch(setSelectedTask(task));
    dispatch(toggleTaskDetail());
  }

  // Function to render task list
  const renderTaskList = (taskList, isCompleted = false) => (
    <div className={`${isGridView ? "grid gap-4 grid-cols-2 sm:grid-cols-3" : "space-y-4"}`}>
      {taskList.map((task) => (
        <div 
          key={task.id} 
          className={`py-2 flex items-center justify-between ${
            isGridView ? "border px-4 py-8" : "border-t-2"
          } ${isDarkMode ? "border-[#252525]" : "border-[#9b9b9b]"}`}
        >
          <div 
            onClick={() => handleTaskSelected(task)} 
            className="flex items-center gap-3 cursor-pointer"
          >
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggleComplete(task.id)}
              onClick={(e) => e.stopPropagation()}
              className="accent-green-600 w-5 h-5"
            />
            <span className={isCompleted ? "line-through" : ""}>{task.text}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStar(task.id);
            }}
          >
            <Star 
              className={`h-5 w-5 ${
                task.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`} 
            />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`h-full w-full text-sm ${isDarkMode ? "bg-[#1F1F1F] text-white" : "bg-white text-black"}`}>
      <main className="h-full w-full mx-auto   px-4 py-6">
        <div className="mb-8">
          <div className={`mb-4 text-sm pb-4 border-b-2 ${isDarkMode? "border-[#323232]" :"border-[#adadad]"}`} >To Do</div>

          <div className={`${isDarkMode ? "bg-[#2E2E2E]" : "bg-green-50"} rounded-lg p-4 mb-6`}>
            <input
              type="text"
              placeholder="Add A Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="w-full bg-transparent border-none text-lg placeholder:text-gray-700 outline-none focus-visible:ring-0 p-2"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 cursor-pointer" />
                <RefreshCw className="h-5 w-5 cursor-pointer"  />
                <Calendar className="h-5 w-5 cursor-pointer" />
              </div>
              <button 
                onClick={handleAddTask} 
                className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-1 text-sm"
              >
                ADD TASK
              </button>
            </div>
          </div>

          {/* Important Tasks Section */}
          {isImportant && (
            <div>
              <h2 className="text-sm font-medium mb-4">Important Tasks</h2>
              {renderTaskList(importantTasks)}
            </div>
          )}

          {isToday &&(
            <div>
              <h2 className="text-sm font-medium mb-4">Todays Tasks</h2>
              {renderTaskList(tasks)}
            </div>
          )}

          {/* All Tasks Section */}
          {isAllTask && (
            <>
              <div>
                <h2 className="text-sm font-medium mb-4">Incomplete Tasks</h2>
                {renderTaskList(tasks.filter((task) => !task.completed))}
              </div>

              <div className="mt-8">
                <h2 className="text-sm font-medium mb-4">Completed Tasks</h2>
                {renderTaskList(tasks.filter((task) => task.completed), true)}
              </div>
            </>
          )}

          {/* Assigned Tasks Section */}
          {isAssignedToMe && (
            <div>
              <h2 className="text-sm font-medium mb-4">Assigned Tasks</h2>
              {renderTaskList(tasks.filter((task) => !task.completed))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}