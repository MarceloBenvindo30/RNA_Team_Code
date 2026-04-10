import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      <div className="bg-mesh" />
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
      <main className="main-content">
        {children}
      </main>

      <style>{`
        .layout-container {
          min-height: 100vh;
          background: var(--bg-light);
          position: relative;
          overflow-x: hidden;
          transition: background 0.4s ease;
        }

        .bg-mesh {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
          background-color: var(--bg-light);
          background-image: 
            radial-gradient(at 0% 0%, hsla(0, 0%, 85%, 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(0, 0%, 75%, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 50%, hsla(0, 0%, 65%, 0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(0, 0%, 85%, 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(0, 0%, 75%, 0.1) 0px, transparent 50%);
          filter: blur(80px);
          opacity: 0.6;
          pointer-events: none;
          animation: mesh-movement 20s ease-in-out infinite alternate;
        }

        @keyframes mesh-movement {
          0% { transform: scale(1); }
          50% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(-2deg); }
        }

        .main-content {
          margin-left: 260px;
          padding-top: 72px;
          min-height: calc(100vh - 72px);
          position: relative;
          z-index: 1;
          transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.45);
          backdrop-filter: blur(4px);
          z-index: 95;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0;
          }
        }

      `}</style>
    </div>
  );
};

export default MainLayout;
