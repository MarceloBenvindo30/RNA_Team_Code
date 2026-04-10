import React from 'react';
import {
    Users,
    Shield,
    Settings,
    Database,
    Clock,
    Search,
    UserPlus,
    MoreVertical,
    Activity
} from 'lucide-react';
import MainLayout from '../components/MainLayout';

const userList = [
    { id: 1, name: 'Ricardo Muzila', email: 'ricardo@nossa.ao', role: 'Super Admin', status: 'Ativo', lastSeen: 'Há 5 min' },
    { id: 2, name: 'Ana Paula', email: 'ana.paula@tech.ao', role: 'Gestor Financeiro', status: 'Ativo', lastSeen: 'Há 12 min' },
    { id: 3, name: 'João Carlos', email: 'joao.c@empresa.ao', role: 'Operador POS', status: 'Inativo', lastSeen: 'Ontem' },
    { id: 4, name: 'Maria Silva', email: 'maria.s@nossa.ao', role: 'Admin', status: 'Ativo', lastSeen: 'Agora' },
];

const Admin: React.FC = () => {
    return (
        <MainLayout>
            <div className="admin-page">
                <div className="page-header">
                    <div>
                        <h1 className="header-title">Painel de Administração</h1>
                        <p className="header-subtitle">Controle de acessos, segurança e configurações globais da plataforma RNA.</p>
                    </div>
                    <button className="btn-gradient"><UserPlus size={18} /> Convidar Usuário</button>
                </div>

                <div className="admin-layout">
                    <div className="admin-nav premium-card">
                        <button className="nav-item active"><Users size={18} /> Usuários & Acessos</button>
                        <button className="nav-item"><Shield size={18} /> Permissões (RBAC)</button>
                        <button className="nav-item"><Activity size={18} /> Auditoria de Logs</button>
                        <button className="nav-item"><Database size={18} /> Backup & Dados</button>
                        <div className="nav-divider" />
                        <button className="nav-item"><Settings size={18} /> Preferências</button>
                    </div>

                    <div className="admin-content">
                        <div className="content-toolbar premium-card">
                            <div className="search-box">
                                <Search size={18} />
                                <input type="text" placeholder="Pesquisar por nome ou email..." />
                            </div>
                            <div className="toolbar-actions">
                                <button className="icon-btn"><Clock size={18} /></button>
                                <button className="icon-btn"><Settings size={18} /></button>
                            </div>
                        </div>

                        <div className="user-table-wrapper premium-card">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>USUÁRIO</th>
                                        <th>FUNÇÃO / CARGO</th>
                                        <th>STATUS</th>
                                        <th>ÚLTIMO ACESSO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map(user => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="avatar-admin">{user.name.charAt(0)}</div>
                                                    <div>
                                                        <p className="user-name">{user.name}</p>
                                                        <p className="user-email">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`role-badge ${user.role.toLowerCase().replace(' ', '-')}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${user.status === 'Ativo' ? 'active' : 'inactive'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="last-seen">{user.lastSeen}</td>
                                            <td><button className="icon-btn-sm"><MoreVertical size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .admin-page { padding: 32px; max-width: 1400px; margin: 0 auto; }
        .admin-layout { display: grid; grid-template-columns: 260px 1fr; gap: 32px; margin-top: 32px; }
        .admin-nav { padding: 12px; height: fit-content; border: none !important; }
        .nav-item { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 14px; font-size: 14px; font-weight: 700; color: var(--text-muted); text-align: left; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-bottom: 4px; border: 1px solid transparent; }
        .nav-item:hover { background: rgba(255, 255, 255, 0.5); color: var(--text-main); transform: translateX(4px); }
        .nav-item.active { background: white; color: var(--primary); border-color: rgba(31, 31, 31, 0.2); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
        .nav-divider { height: 1px; background: rgba(0,0,0,0.03); margin: 12px 16px; }
        .admin-content { display: flex; flex-direction: column; gap: 24px; }
        .content-toolbar { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border: none !important; }
        .search-box { display: flex; align-items: center; gap: 12px; flex: 1; }
        .search-box input { background: transparent; border: none; font-size: 14px; font-weight: 600; width: 300px; outline: none; }
        .toolbar-actions { display: flex; gap: 12px; }
        .user-table-wrapper { border: none !important; overflow: hidden; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { text-align: left; padding: 18px 24px; background: rgba(0,0,0,0.02); color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .admin-table tr { transition: all 0.3s ease; }
        .admin-table tr:hover { background: rgba(255, 255, 255, 0.4); }
        .admin-table td { padding: 20px 24px; border-bottom: 1px solid rgba(0,0,0,0.03); }
        .user-cell { display: flex; align-items: center; gap: 12px; }
        .avatar-admin { width: 36px; height: 36px; border-radius: 10px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; }
        .user-name { font-size: 14px; font-weight: 700; color: var(--text-main); }
        .user-email { font-size: 12px; color: var(--text-muted); }
        .role-badge { font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
        .role-badge.super-admin { background: #FEE2E2; color: #991B1B; }
        .role-badge.gestor-financeiro { background: #FEF3C7; color: #92400E; }
        .role-badge.operador-pos { background: #F1F5F9; color: #475569; }
        .role-badge.admin { background: #E0F2FE; color: #075985; }
        .status-pill { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
        .status-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
        .status-pill.active::before { background: #22C55E; }
        .status-pill.inactive::before { background: #94A3B8; }
        .last-seen { font-size: 13px; color: var(--text-muted); font-weight: 600; }
        
        @media (max-width: 1024px) {
            .admin-page { padding: 16px; margin-top: 72px; }
            .admin-layout { grid-template-columns: 1fr; }
            .admin-nav { display: flex; overflow-x: auto; white-space: nowrap; padding-bottom: 4px; border-radius: 12px; }
            .nav-item { width: auto; flex-shrink: 0; }
            .nav-divider { display: none; }
            .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
            .btn-gradient { width: 100%; justify-content: center; }
            .content-toolbar { flex-direction: column; gap: 16px; align-items: stretch; }
            .search-box input { width: 100%; }
            .toolbar-actions { justify-content: space-between; }
            .user-table-wrapper { overflow-x: auto; }
            .admin-table { min-width: 800px; }
        }
      `}</style>
        </MainLayout>
    );
};

export default Admin;
