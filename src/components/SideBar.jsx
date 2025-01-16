import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
  selectTotalTasks,
  selectCompletedTasks,
} from "../utils/TaskSlice"; // Adjust the path as needed
import {
  Star,
  Calendar,
  UserSquare2,
  Plus,
  CircleAlert,
  ClipboardList,
} from "lucide-react";

import profile from "../assets/Profile.png";

export function Sidebar() {
  const totalTasks = useSelector(selectTotalTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const incompleteTasks = totalTasks - completedTasks;

  const data = {
    datasets: [
      {
        data: [completedTasks, incompleteTasks],
        backgroundColor: ["rgba(20, 46, 21, 1)", "rgba(63, 145, 66, 1)"],
        hoverOffset: 4,
      },
    ],
  };

  const buttonBaseClass =
    "flex items-center px-4 py-2 rounded-lg text-sm w-full hover:bg-gray-100 transition-colors";

  return (
    <div className="w-64 bg-[#EEF6EF] h-full p-4 flex flex-col">
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">Hey, ABCD</p>
        </div>
      </div>

      <div>
        <nav className="space-y-1 flex-1 bg-white py-6 rounded-md">
          <button className={buttonBaseClass}>
            <ClipboardList className="h-4 w-4 mr-3" />
            All Tasks
          </button>
          <button className={`${buttonBaseClass} bg-green-50 text-green-600`}>
            <Calendar className="h-4 w-4 mr-3" />
            Today
          </button>
          <button className={buttonBaseClass}>
            <Star className="h-4 w-4 mr-3" />
            Important
          </button>
          <button className={buttonBaseClass}>
            <Calendar className="h-4 w-4 mr-3" />
            Planned
          </button>
          <button className={buttonBaseClass}>
            <UserSquare2 className="h-4 w-4 mr-3" />
            Assigned to me
          </button>
        </nav>

        <button
          className={`${buttonBaseClass} py-6 bg-white mt-4 font-semibold rounded-md`}
        >
          <Plus className="h-4 w-4 mr-3 " />
          Add list
        </button>
      </div>

      <div className="Today Task flex flex-col py-6 bg-white rounded-md my-4 px-4">
        <div className="upper-div">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="font-semibold ">Today Task</div>
              <div>
                <CircleAlert color="#BDBDBD" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold">{totalTasks}</div>
          </div>
        </div>
        {/* Doughnut Chart */}
        {/* <div className="">
          <Doughnut data={data} />
        </div> */}
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
