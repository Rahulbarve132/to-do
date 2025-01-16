import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleGridView, selectIsGridView, selectIsDarkMode } from "../utils/TaskSlice";
import { Menu, Search, Grid, List, Sun, Moon } from "lucide-react";

export default function Header({ toggleSidebar }) {
  const dispatch = useDispatch();
  
  // Get values from Redux store
  const isGridView = useSelector(selectIsGridView);
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <header className={`w-full ${isDarkMode ? "bg-[#242424] text-white" : "bg-white text-black"}`}>
      <div className="mx-auto w-full px-4 py-2 flex items-center justify-between">
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
            <List className="h-5 w-5 cursor-pointer" onClick={() => dispatch(toggleGridView())} />
          ) : (
            <Grid className="h-5 w-5 cursor-pointer" onClick={() => dispatch(toggleGridView())} />
          )}

          {isDarkMode ? (
            <Sun className="h-5 w-5 cursor-pointer text-yellow-400" onClick={() => dispatch(toggleDarkMode())} />
          ) : (
            <Moon className="h-5 w-5 cursor-pointer text-gray-600" onClick={() => dispatch(toggleDarkMode())} />
          )}
        </div>
      </div>
    </header>
  );
}
