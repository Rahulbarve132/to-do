import { useState, useEffect } from "react";
import { Sidebar } from "./components/SideBar";
import TodoList from "./components/todo-list";
import TaskDetail from "./components/TaskDetails";
import Header from "./components/Header";
import MobileSidebar from "./components/mobileSideBar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle window resizing for mobile vs desktop view
  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth < 768); // Tailwind's default mobile breakpoint
    };
    window.addEventListener("resize", updateView);
    updateView(); // Initial check

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full">
      {/* Conditionally render MobileSidebar with transitions only on mobile view */}
      {isMobileView && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-700 ease-in-out">
          <MobileSidebar toggleSidebar={toggleSidebar} />
        </div>
      )}

      {/* Render Sidebar on desktop with transition */}
      {!isMobileView && (
        <Sidebar className="transition-transform duration-300 ease-in-out transform translate-x-0" />
      )}

      <div className="w-full">
        {/* Pass toggleSidebar to Header */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex w-full h-full md:flex-row flex-col">
          <div className="flex-1">
            <TodoList toggleSidebar={toggleSidebar} />
          </div>
          <TaskDetail />
        </div>
      </div>
    </div>
  );
}

export default App;
