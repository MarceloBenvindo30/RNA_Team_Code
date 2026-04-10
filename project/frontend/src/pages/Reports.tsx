import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Download,
    Filter,
    ChevronRight,
    Calendar,
    ArrowUpRight,
    Search
} from 'lucide-react';
import MainLayout from '../components/MainLayout';

const reportList = [
    { id: 1, title: 'Relatório de Vendas Mensal', type: 'Financeiro', date: '20 Mar 2024', status: 'Gerado', size: '2.4 MB' },
    { id: 2, title: 'Balanço Patrimonial Q1', type: 'Contabilidade', date: '15 Mar 2024', status: 'Pendente', size: '--' },
    { id: 3, title: 'Performance de Colaboradores', type: 'Recursos Humanos', date: '10 Mar 2024', status: 'Gerado', size: '1.2 MB' },
    { id: 4, title: 'Auditoria de Acessos', type: 'Segurança', date: '05 Mar 2024', status: 'Gerado', size: '0.8 MB' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
} as const;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
} as const;

const Reports: React.FC = () => {
    return (
        <MainLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="reports-page"
            >
                <motion.div variants={itemVariants} className="page-header-modern">
                    <div className="header-info-modern">
                        <span className="breadcrumb-modern">INTELIGÊNCIA <ArrowUpRight size={10} style={{ margin: '0 4px' }} /> REPORTS</span>
                        <h1 className="header-title-modern">Relatórios & Inteligência</h1>
                        <p className="header-subtitle-modern">Analise o desempenho de todas as operações e exporte dados estratégicos com precisão extrema.</p>
                    </div>
                    <div className="header-actions-modern">
                        <motion.button whileHover={{ y: -2 }} className="btn-secondary-modern"><Calendar size={18} /> Março 2024</motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-gradient"
                        >
                            <FileText size={18} /> Novo Relatório
                        </motion.button>
                    </div>
                </motion.div>


                <motion.div variants={itemVariants} className="reports-section-modern premium-card">
                    <div className="section-header-modern">
                        <div className="section-title-modern">
                            <h3>Biblioteca de Documentos</h3>
                            <div className="search-box-reports">
                                <Search size={16} />
                                <input type="text" placeholder="Filtrar documentos..." />
                            </div>
                        </div>
                        <button className="filter-btn-modern"><Filter size={16} /> Filtros Avançados</button>
                    </div>

                    <div className="reports-list-modern">
                        <div className="list-header-modern">
                            <span>DOCUMENTO</span>
                            <span>CATEGORIA</span>
                            <span>DATA</span>
                            <span>ESTADO</span>
                            <span>AÇÕES</span>
                        </div>
                        {reportList.map(report => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                                className="list-row-modern"
                            >
                                <div className="name-cell-modern">
                                    <div className="file-icon-modern">
                                        <FileText size={18} />
                                    </div>
                                    <div className="file-info">
                                        <span className="file-name">{report.title}</span>
                                        <span className="file-size">{report.size}</span>
                                    </div>
                                </div>
                                <div className="type-cell-modern"><span className="type-tag">{report.type}</span></div>
                                <div className="date-cell-modern">{report.date}</div>
                                <div className="status-cell-modern">
                                    <div className={`status-pill-modern ${report.status.toLowerCase()}`}>
                                        <span className="dot" />
                                        {report.status}
                                    </div>
                                </div>
                                <div className="actions-cell-modern">
                                    <motion.button whileHover={{ scale: 1.1 }} className="action-btn-modern pulse-on-hover" title="Download"><Download size={16} /></motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} className="action-btn-modern"><ChevronRight size={16} /></motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
        .reports-page { padding: 40px; max-width: 1300px; margin: 0 auto; margin-top: 72px; }
        .page-header-modern { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .breadcrumb-modern { font-size: 11px; font-weight: 800; color: var(--primary); letter-spacing: 1.5px; display: flex; align-items: center; margin-bottom: 8px; }
        .header-title-modern { font-size: 36px; font-weight: 900; color: var(--text-main); margin: 0; letter-spacing: -0.5px; }
        .header-subtitle-modern { font-size: 16px; color: var(--text-muted); margin: 8px 0 0; max-width: 600px; font-weight: 500; }

        .btn-secondary-modern { background: var(--bg-card); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); padding: 12px 24px; border-radius: 14px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
        .btn-secondary-modern:hover { background: var(--white); border-color: var(--primary); color: var(--primary); transform: translateY(-2px); }
        .header-actions-modern { display: flex; gap: 16px; }

        .reports-section-modern { padding: 0; border: 1px solid var(--glass-border); overflow: hidden; border-radius: 28px; background: var(--bg-card); backdrop-filter: blur(20px); }
        .section-header-modern { padding: 28px; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center; }
        .section-title-modern { display: flex; align-items: center; gap: 32px; }
        .section-title-modern h3 { font-size: 18px; font-weight: 900; color: var(--text-main); margin: 0; }
        
        .search-box-reports { position: relative; display: flex; align-items: center; }
        .search-box-reports svg { position: absolute; left: 12px; color: var(--text-muted); z-index: 10; }
        .search-box-reports input { padding: 10px 16px 10px 40px; border: 1px solid var(--gray-200); border-radius: 12px; background: var(--bg-card); backdrop-filter: blur(5px); outline: none; font-size: 13px; font-weight: 600; width: 240px; transition: all 0.3s; color: var(--text-main); }
        .search-box-reports input:focus { border-color: var(--primary); background: var(--white); box-shadow: 0 0 0 4px var(--primary-light); width: 280px; }

        .filter-btn-modern { display: flex; align-items: center; gap: 8px; background: var(--bg-card); backdrop-filter: blur(5px); border: 1px solid var(--glass-border); padding: 10px 18px; border-radius: 12px; font-weight: 700; font-size: 13px; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
        .filter-btn-modern:hover { background: var(--white); border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }

        .reports-list-modern { width: 100%; }
        .list-header-modern { display: grid; grid-template-columns: 2.5fr 1.5fr 1fr 1fr 120px; padding: 20px 28px; background: var(--gray-100); border-bottom: 1px solid var(--gray-200); color: var(--text-muted); font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; }
        .list-row-modern { display: grid; grid-template-columns: 2.5fr 1.5fr 1fr 1fr 120px; padding: 20px 28px; border-bottom: 1px solid var(--gray-200); align-items: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .list-row-modern:hover { background: var(--primary-light); transform: scale(1.005) translateX(4px); }
        
        .name-cell-modern { display: flex; align-items: center; gap: 16px; }
        .file-icon-modern { width: 44px; height: 44px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--primary); transition: all 0.3s; }
        .list-row-modern:hover .file-icon-modern { background: var(--primary); color: white; border-color: var(--primary); }
        .file-info { display: flex; flex-direction: column; }
        .file-name { font-size: 15px; font-weight: 800; color: var(--text-main); }
        .file-size { font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 2px; }

        .type-tag { border: 1.5px solid var(--gray-200); padding: 4px 12px; border-radius: 10px; font-size: 12px; font-weight: 700; color: var(--text-muted); }
        .date-cell-modern { font-size: 14px; color: var(--text-muted); font-weight: 700; }
        
        .status-pill-modern { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 12px; width: fit-content; }
        .status-pill-modern .dot { width: 6px; height: 6px; border-radius: 50%; }
        .status-pill-modern.gerado { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .status-pill-modern.gerado .dot { background: var(--success); }
        .status-pill-modern.pendente { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .status-pill-modern.pendente .dot { background: var(--warning); animation: blink 1.5s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        .actions-cell-modern { display: flex; gap: 12px; }
        .action-btn-modern { width: 38px; height: 38px; border-radius: 10px; border: none; background: #F1F5F9; color: #64748B; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .action-btn-modern:hover { background: var(--primary); color: white; }

        @media (max-width: 1024px) {
            .reports-page { padding: 16px; margin-top: 72px; }
            .page-header-modern { flex-direction: column; align-items: flex-start; gap: 16px; }
            .header-actions-modern { width: 100%; justify-content: space-between; gap: 12px; }
            .btn-secondary-modern, .btn-gradient { flex: 1; justify-content: center; }
            .section-header-modern { flex-direction: column; gap: 16px; align-items: stretch; }
            .section-title-modern { flex-direction: column; align-items: stretch; gap: 16px; }
            .search-box-reports input { width: 100%; }
            .reports-list-modern { min-width: 800px; }
            .reports-section-modern { overflow-x: auto; }
        }
      `}</style>
        </MainLayout>
    );
};

export default Reports;
