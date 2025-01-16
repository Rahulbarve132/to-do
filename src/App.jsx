import { useState } from "react";
import { Sidebar } from "./components/SideBar";
import TodoList from "./todo-list";
import TaskDetail from "./components/TaskDetails";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1">
        <TodoList toggleSidebar={toggleSidebar} />
      </div>

      <TaskDetail/>
    </div>
  );
}

export default App;
