import { useState } from "react";
import { Sidebar } from "./components/SideBar";
import TodoList from "./components/todo-list";
import TaskDetail from "./components/TaskDetails";
import Header from "./components/Header";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full ">
      
      {isSidebarOpen && <Sidebar />}
      <div className="w-full">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="flex w-full h-full">
       
      <div className="flex-1">
        <TodoList toggleSidebar={toggleSidebar} />
      </div>

      <TaskDetail/>
      </div>
      </div>
    </div>
  );
}

export default App;
