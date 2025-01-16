import { useEffect, useState } from 'react';
import { Bell, Calendar, Plus, RefreshCw, Star, Trash2, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleTaskDetail, 
  selectTaskDetail,
  selectSelectedTask,
  deleteTask, 
  toggleComplete, 
  toggleStar,
  selectIsDarkMode
} from '../utils/TaskSlice';

export default function TaskDetails() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const isOpen = useSelector(selectTaskDetail);
  const selectedTask = useSelector(selectSelectedTask);
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    if (selectedTask) {
      setIsChecked(selectedTask.completed);
      setIsStarred(selectedTask.starred);
    }
  }, [selectedTask]);

  const handleToggleComplete = () => {
    if (selectedTask) {
      dispatch(toggleComplete(selectedTask.id));
      setIsChecked((prev) => !prev);
    }
  };

  const handleToggleStar = () => {
    if (selectedTask) {
      dispatch(toggleStar(selectedTask.id));
      setIsStarred((prev) => !prev);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      dispatch(toggleTaskDetail());
    }
  };

  const handleClose = () => {
    dispatch(toggleTaskDetail());
  };

  if (!isOpen || !selectedTask) return null;

  return (
    <div className={`w-80 text-sm shadow-md p-4 flex flex-col relative ${isDarkMode ? 'bg-[#2C2C2C] text-white' : 'bg-green-50 text-gray-900'}`}>
      {/* Task Header */}
      <div className="flex items-center justify-between border-b pt-3 pb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleComplete}
            className="w-5 h-5 accent-green-600 border-gray-300 rounded"
          />
          <span className={`text-sm ${isChecked ? 'line-through text-gray-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedTask.text}
          </span>
        </div>
        <button onClick={handleToggleStar}>
          <Star className={`h-5 w-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
        </button>
      </div>

      {/* Task Actions */}
      <div className="mt-3 space-y-2">
        <button className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}>
          <Plus className="h-5 w-5" /> <span>Add Step</span>
        </button>
        <button className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}>
          <Bell className="h-5 w-5" /> <span>Set Reminder</span>
        </button>
        <button className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}>
          <Calendar className="h-5 w-5" /> <span>Add Due Date</span>
        </button>
        <button className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}>
          <RefreshCw className="h-5 w-5" /> <span>Repeat</span>
        </button>
      </div>

      {/* Task Notes */}
      <div className={`mt-3 border-t pt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-900'}`}>Add Notes</div>

      {/* Footer */}
      <div className={`mt-auto flex justify-between items-center text-sm border-t pt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <button
          onClick={handleClose}
          className="top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        >
          <X className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
        <span>Created Today</span>
        <button onClick={handleDeleteTask} className="text-red-500 hover:bg-red-100 p-2 rounded-lg">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
