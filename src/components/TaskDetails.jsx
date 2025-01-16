import { useEffect, useState } from 'react';
import { Bell, Calendar, Plus, RefreshCw, Star, Trash2, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import "react-day-picker/style.css";

import { 
  toggleTaskDetail, 
  selectTaskDetail,
  selectSelectedTask,
  deleteTask, 
  toggleComplete, 
  toggleStar 
} from '../utils/TaskSlice';
import { DayPicker } from 'react-day-picker';

export default function TaskDetails() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // New state to toggle date picker

  const isOpen = useSelector(selectTaskDetail);
  const selectedTask = useSelector(selectSelectedTask);
  const [selected, setSelected] = useState();

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

  const handleToggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  if (!isOpen || !selectedTask) return null;
  console.log(selected)

  return (
    <div className="md:w-80 w-full text-sm bg-green-50 shadow-md  flex flex-col relative">
      {/* Task Header */}
      <div className="flex items-center justify-between border-b px-4 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleComplete}
            className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className={`text-sm ${isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {selectedTask.text}
          </span>
        </div>
        <button onClick={handleToggleStar}>
          <Star className={`h-5 w-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
        </button>
      </div>

      {/* Task Actions */}
      <div className="mt-3 space-y-2">
        <button className="w-full flex px-4 items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100">
          <Plus className="h-5 w-5" /> <span>Add Step</span>
        </button>
        <button className="w-full flex px-4  items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100">
          <Bell className="h-5 w-5" /> <span>Set Reminder</span>
        </button>
        <button
          onClick={handleToggleDatePicker}
          className="w-full flex px-4  items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <Calendar className="h-5 w-5" /> <span>Add Due Date</span>
        </button>

        {/* Conditionally show Date Picker */}
        {showDatePicker && (
  <div className="border rounded-lg w-fit px-1  bg-white shadow-md ">
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="text-sm"  // Adjust text size
    />
  </div>
)}


        <button className="w-full px-4  flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100">
          <RefreshCw className="h-5 w-5" /> <span>Repeat</span>
        </button>
      </div>

      {/* Task Notes */}
      <div className="mt-3 border-t px-4  pt-3 text-gray-400 text-sm">Add Notes</div>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-center text-gray-500 text-sm border-t pt-3">
        <button
          onClick={handleClose}
          className="top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        <span>Created Today</span>
        <button onClick={handleDeleteTask} className="text-red-500 hover:bg-red-100 p-2 rounded-lg">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
