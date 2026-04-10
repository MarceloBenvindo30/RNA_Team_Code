import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Grid, Search, Menu, Moon, Sun, LogOut } from 'lucide-react';
import adminMale from '../assets/admin_male.png';
import { useAuth } from '../contexts/AuthContext';

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {onMenuClick && (
          <button className="mobile-menu-btn" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
        )}
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Pesquisar no RNA..." className="search-input" />
        </div>
      </div>

      <div className="top-bar-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="switch-company-btn"
        >
          <Grid size={16} />
          <span>Switch Company</span>
        </motion.button>

        <div className="icon-group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={20} className="text-warning" /> : <Moon size={20} />}
          </motion.div>
          <motion.div whileHover={{ filter: 'brightness(1.2)' }} className="icon-btn">
            <Bell size={20} />
            <div className="notification-dot" />
          </motion.div>
          <motion.div whileHover={{ filter: 'brightness(1.2)' }} className="icon-btn">
            <Grid size={20} />
          </motion.div>
        </div>

        <div className="user-profile">
          <div className="user-details">
            <p className="user-name">{user?.name ?? 'Usuário'}</p>
            <p className="user-role">{user ? user.roles.join(' • ') : 'Não autenticado'}</p>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} />
          </button>
          <div className="avatar">
            <img src={adminMale} alt={user?.name ?? 'Usuário'} />
          </div>
        </div>
      </div>

      <style>{`
        .top-bar {
          height: var(--topbar-h);
          background: var(--bg-card);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: fixed;
          top: 0;
          left: var(--sidebar-w);
          right: 0;
          z-index: 90;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu-btn {
          display: none;
          color: var(--text-main);
          padding: 8px;
          margin-right: 8px;
          border-radius: 8px;
        }
        .mobile-menu-btn:hover { background: rgba(0,0,0,0.05); }

        @media (max-width: 1024px) {
          .top-bar { left: 0; padding: 0 16px; }
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
          .search-wrapper { display: none; }
          .switch-company-btn span { display: none; }
          .switch-company-btn { padding: 8px; }
          .user-role { display: none; }
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-wrapper {
            background: var(--bg-light);
            border-radius: 12px;
            display: flex;
            align-items: center;
            padding: 8px 16px;
            gap: 10px;
            width: 320px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid var(--gray-200);
            backdrop-filter: blur(5px);
        }

        .search-wrapper:focus-within {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px var(--primary-light);
        }

        .search-icon {
            color: var(--text-muted);
        }

        .search-input {
            background: transparent;
            border: none;
            outline: none;
            font-size: 14px;
            width: 100%;
            font-weight: 600;
            color: var(--text-main);
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .switch-company-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-light);
          border: 1px solid var(--gray-200);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .switch-company-btn:hover { background: var(--white); border-color: var(--primary); color: var(--primary); }

        .icon-group {
          display: flex;
          gap: 12px;
          padding: 0 12px;
          border-left: 1px solid var(--gray-200);
          border-right: 1px solid var(--gray-200);
        }

        .icon-btn {
          position: relative;
          color: var(--text-muted);
          padding: 6px;
          cursor: pointer;
        }

        .logout-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.16);
          color: #ef4444;
          cursor: pointer;
          margin-left: 10px;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.16);
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          background: #EF4444;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          background: var(--bg-card);
          padding: 4px 4px 4px 12px;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          transition: all 0.2s;
        }

        .user-profile:hover {
            border-color: var(--primary);
        }

        .user-details {
            text-align: right;
        }

        .user-name {
            font-weight: 700;
            font-size: 13px;
            color: var(--text-main);
            margin-bottom: 0;
            line-height: 1.2;
        }

        .user-role {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: 600;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
