
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="h-16 border-b border-border bg-white shadow-sm px-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">TGI Pos</h1>
        </div>
        
        <div>
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AppLayout;
