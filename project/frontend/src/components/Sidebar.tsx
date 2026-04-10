import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  ShoppingCart,
  Share2,
  BarChart3,
  ShieldCheck,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import logoRna from '../assets/logo_rna.jpg';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Building2 size={20} />, label: 'Empresas', path: '/companies' },
    { icon: <ShoppingCart size={20} />, label: 'Terminal POS', path: '/pos' },
    { icon: <Share2 size={20} />, label: 'Rede Social', path: '/social' },
    { icon: <BarChart3 size={20} />, label: 'Relatórios', path: '/reports' },
    { icon: <ShieldCheck size={20} />, label: 'Administração', path: '/admin' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">
          <img src={logoRna} alt="Logo RNA" className="sidebar-main-logo" />
          <h3>NOSSA RNA</h3>
          {onClose && (
            <button className="mobile-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>
        <p>Business Ecosystem</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={index}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              whileHover={{ backgroundColor: 'var(--bg-hover)' }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="active-indicator"
                />
              )}
            </motion.div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <motion.button
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.98 }}
          className="upgrade-btn"
        >
          Upgrade Empresa
        </motion.button>

        <div className="nav-item">
          <HelpCircle size={20} />
          <span>Suporte RNA</span>
        </div>

        <div
          className="nav-item logout"
          onClick={() => navigate('/login')}
        >
          <LogOut size={20} />
          <span>Sair</span>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-w);
          height: 100vh;
          background: var(--bg-card);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          padding: 24px;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-close-btn { display: none; margin-left: auto; color: var(--text-muted); }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
            box-shadow: none;
          }
          .sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 48px rgba(0,0,0,0.1);
          }
          .mobile-close-btn { display: block; }
        }

        .sidebar-brand {
          margin-bottom: 40px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .sidebar-main-logo {
          width: 38px;
          height: 38px;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .sidebar-brand h3 {
          font-size: 20px;
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: -0.5px;
          margin: 0;
        }

        .sidebar-brand p {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding-left: 50px;
          margin-top: -4px;
          opacity: 0.7;
        }

        .sidebar-nav {
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          position: relative;
          margin-bottom: 4px;
        }

        .nav-item:hover {
          color: var(--text-main);
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
        }

        .active-indicator {
           position: absolute;
           left: 0;
           width: 4px;
           height: 24px;
           background: rgba(255, 255, 255, 0.9);
           border-radius: 0 4px 4px 0;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid var(--gray-200);
        }

        .upgrade-btn {
          width: 100%;
          background: linear-gradient(135deg, #111111 0%, #2f2f2f 100%);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          border: none;
          cursor: pointer;
        }

        .logout {
          color: #EF4444 !important;
        }

        .logout:hover {
          background: rgba(239, 68, 68, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
