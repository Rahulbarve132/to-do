import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Doughnut } from "react-chartjs-2";
import {
  selectTotalTasks,
  selectCompletedTasks,
  selectIsDarkMode,
  selectIsAllTasks,
  selectIsToday,
  selectIsImportant,
  selectIsPlanned,
  selectIsAssignedToMe,
  setActiveTask,
} from "../utils/TaskSlice";
import { Star, Calendar, UserSquare2, Plus, CircleAlert, ClipboardList } from "lucide-react";
import profile from "../assets/Profile.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const totalTasks = useSelector(selectTotalTasks) || 0;
  const completedTasks = useSelector(selectCompletedTasks) || 0;
  const isDarkMode = useSelector(selectIsDarkMode);
  const incompleteTasks = Math.max(totalTasks - completedTasks, 0);

  const isAllTasks = useSelector(selectIsAllTasks);
  const isToday = useSelector(selectIsToday);
  const isImportant = useSelector(selectIsImportant);
  const isPlanned = useSelector(selectIsPlanned);
  const isAssignedToMe = useSelector(selectIsAssignedToMe);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const data = {
    datasets: [
      {
        data: [completedTasks, incompleteTasks],
        backgroundColor: ["rgba(20, 46, 21, 1)", "rgba(63, 145, 66, 1)"],
        hoverOffset: 4,
      },
    ],
  };

  const buttonBaseClass = `flex items-center px-4 py-2 rounded-lg text-sm w-full transition-colors ${
    isDarkMode ? "hover:bg-[#3A3A3A] text-white" : "hover:bg-gray-100 text-black"
  }`;
  const activeClass = `${isDarkMode ? "bg-[#3A3A3A]" : "bg-green-50 text-green-600"}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear any stored user session (optional)
    localStorage.removeItem("userToken"); // Modify as needed

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div
      className={`w-64 h-full p-4 flex flex-col ${
        isDarkMode ? "bg-[#2C2C2C] text-white" : "bg-[#EEF6EF] text-black"
      }`}
    >
      {/* Profile Image with Dropdown */}
      <div className="flex flex-col items-center gap-3 mb-6 relative" ref={dropdownRef}>
        <div
          className="w-24 h-24 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={profile} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <p className="font-medium">Hey, ABCD</p>

        {dropdownOpen && (
          <div
            className={`absolute top-28 bg-white shadow-md rounded-md overflow-hidden w-40 ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200">My Profile</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div>
        <nav className={`space-y-1 flex-1 py-6 rounded-md ${isDarkMode ? "bg-[#1F1F1F]" : "bg-white"}`}>
          <button onClick={() => dispatch(setActiveTask("all"))} className={`${buttonBaseClass} ${isAllTasks ? activeClass : ""}`}>
            <ClipboardList className="h-4 w-4 mr-3" />
            All Tasks
          </button>
          <button onClick={() => dispatch(setActiveTask("today"))} className={`${buttonBaseClass} ${isToday ? activeClass : ""}`}>
            <Calendar className="h-4 w-4 mr-3" />
            Today
          </button>
          <button onClick={() => dispatch(setActiveTask("important"))} className={`${buttonBaseClass} ${isImportant ? activeClass : ""}`}>
            <Star className="h-4 w-4 mr-3" />
            Important
          </button>
          <button onClick={() => dispatch(setActiveTask("planned"))} className={`${buttonBaseClass} ${isPlanned ? activeClass : ""}`}>
            <Calendar className="h-4 w-4 mr-3" />
            Planned
          </button>
          <button onClick={() => dispatch(setActiveTask("assigned"))} className={`${buttonBaseClass} ${isAssignedToMe ? activeClass : ""}`}>
            <UserSquare2 className="h-4 w-4 mr-3" />
            Assigned to me
          </button>
        </nav>

        <button className={`${buttonBaseClass} py-6 mt-4 font-semibold rounded-md ${isDarkMode ? "bg-[#1F1F1F]" : "bg-white"}`}>
          <Plus className="h-4 w-4 mr-3 " />
          Add list
        </button>
      </div>

      {/* Today Task Section */}
      <div className={`Today Task flex flex-col py-6 rounded-md my-4 px-4 ${isDarkMode ? "bg-[#1F1F1F]" : "bg-white"}`}>
        <div className="upper-div">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Today Task</div>
              <div>
                <CircleAlert color="#BDBDBD" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold">{totalTasks}</div>
          </div>
        </div>
        {/* Doughnut Chart */}
        <div className="mt-4">
          <Doughnut data={data} />
        </div>
        <div className="bottom-div flex gap-4 text-sm my-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#3F9142]"></div>
            <div>Pending</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#142E15]"></div>
            <div>Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
