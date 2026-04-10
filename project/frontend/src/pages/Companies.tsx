import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MoreVertical,
  Users,
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import MainLayout from '../components/MainLayout';

const companies = [
  { id: 1, name: 'AngolaTech Solutions', nif: '5402918231', plan: 'Enterprise Plus', renewal: '12 Ago 2024', employees: 128, status: 'ativa', logo: 'https://ui-avatars.com/api/?name=Angola+Tech&background=E0F2FE&color=0369A1' },
  { id: 2, name: 'Logix Angola Lda.', nif: '9912038412', plan: 'Business Hub', renewal: 'Em 3 dias', employees: 45, status: 'a-vencer', logo: 'https://ui-avatars.com/api/?name=Logix+Angola&background=FEF3C7&color=B45309' },
  { id: 3, name: 'Clínica Vida Luanda', nif: '1029384756', plan: 'Premium Health', renewal: '05 Nov 2024', employees: 210, status: 'ativa', logo: 'https://ui-avatars.com/api/?name=Clinica+Vida&background=DCFCE7&color=15803D' }
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

const Companies: React.FC = () => {
  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="companies-page"
      >
        <motion.div variants={itemVariants} className="page-header">
          <div className="header-info">
            <span className="breadcrumb">GESTÃO <ArrowRight size={10} style={{ margin: '0 4px' }} /> EMPRESAS</span>
            <h1 className="header-title">Gestão de Empresas</h1>
            <p className="header-subtitle">Controle e escale todas as suas operações multiempresa em um ambiente unificado e de alta performance.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
          >
            <Plus size={18} />
            Adicionar Empresa
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="filter-bar premium-card">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Procurar por nome, NIF ou gestor..." />
          </div>
          <div className="filter-actions">
            <button className="filter-btn-modern"><Filter size={16} /> Status</button>
            <button className="filter-btn-modern"><Calendar size={16} /> Data</button>
          </div>
          <div className="summary-stats-modern">
            <div className="stat-pill">
              <span className="label">ATIVAS</span>
              <span className="value blue">24</span>
            </div>
            <div className="stat-pill warning">
              <span className="label">A VENCER</span>
              <span className="value orange">03</span>
            </div>
            <div className="stat-pill">
              <span className="label">INATIVAS</span>
              <span className="value gray">02</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} className="company-grid">
          {companies.map(company => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              className="company-card-modern premium-card"
            >
              <div className="card-header">
                <div className="company-branding">
                  <div className="company-logo-wrapper">
                    <img src={company.logo} alt={company.name} />
                  </div>
                  <div className="company-meta">
                    <h3 className="company-name">{company.name}</h3>
                    <p className="company-nif">NIF: {company.nif}</p>
                  </div>
                </div>
                <div className={`status-pill-badge ${company.status}`}>
                  <span className="pulse" />
                  {company.status === 'ativa' ? 'ATIVA' : 'A VENCER'}
                </div>
              </div>

              <div className="card-content">
                <div className="plan-info-box">
                  <div className="info-item">
                    <span className="label">PLANO</span>
                    <p className="value">{company.plan} <ShieldCheck size={12} className="shield" /></p>
                  </div>
                  <div className="info-item">
                    <span className="label">PRÓX. RENOVAÇÃO</span>
                    <p className={`value ${company.status === 'a-vencer' ? 'urgent' : ''}`}>{company.renewal}</p>
                  </div>
                </div>
                <div className="collaboration-stats">
                  <Users size={16} className="text-primary" />
                  <span><strong>{company.employees}</strong> Colaboradores ativos</span>
                </div>
              </div>

              <div className="card-footer">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="btn-manage-modern"
                >
                  Gerir Operação <ExternalLink size={14} />
                </motion.button>
                <button className="btn-icon-modern"><MoreVertical size={16} /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      <style>{`
        .companies-page { padding: 32px; max-width: 1400px; margin: 0 auto; margin-top: 64px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .breadcrumb { font-size: 11px; font-weight: 800; color: var(--primary); letter-spacing: 1px; display: flex; align-items: center; margin-bottom: 8px; text-transform: uppercase; }
        .header-title { font-size: 32px; font-weight: 800; color: var(--text-main); margin: 0; letter-spacing: -1px; }
        .header-subtitle { font-size: 15px; color: var(--text-muted); margin: 8px 0 0; max-width: 600px; font-weight: 600; }
        
        .filter-bar { 
            display: flex; align-items: center; gap: 24px; padding: 20px 24px; 
            margin-bottom: 40px;
        }

        .search-wrapper { flex: 1; position: relative; }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-wrapper input { 
            width: 100%; padding: 14px 16px 14px 48px; background: rgba(255, 255, 255, 0.2); 
            border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 14px; font-weight: 600; font-size: 14px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(5px); outline: none;
        }
        .search-wrapper input:focus { background: white; border-color: var(--primary); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); width: 105%; }

        .filter-btn-modern { 
            display: flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.6); padding: 12px 20px; border-radius: 14px; 
            font-weight: 700; font-size: 13px; color: var(--text-main); cursor: pointer;
            transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .filter-btn-modern:hover { background: rgba(255, 255, 255, 0.7); transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); border-color: var(--primary); color: var(--primary); }

        .summary-stats-modern { display: flex; gap: 16px; }
        .stat-pill { background: rgba(255, 255, 255, 0.3); border: 1px solid rgba(255, 255, 255, 0.4); padding: 10px 16px; border-radius: 14px; display: flex; flex-direction: column; min-width: 80px; align-items: center; backdrop-filter: blur(5px); }
        .stat-pill.warning { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }
        .stat-pill .label { font-size: 10px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.5px; }
        .stat-pill .value { font-size: 18px; font-weight: 900; margin-top: 2px; }
        .stat-pill .value.blue { color: var(--primary); }
        .stat-pill .value.orange { color: #F59E0B; }

        .company-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 48px; }
        .company-card-modern { 
            padding: 32px;
            display: flex; flex-direction: column; gap: 24px; cursor: pointer;
        }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .company-branding { display: flex; gap: 16px; }
        .company-logo-wrapper { 
            width: 60px; height: 60px; border-radius: 16px; overflow: hidden; 
            padding: 2px; background: white; box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            border: 2px solid white;
        }
        .company-logo-wrapper img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
        .company-name { font-size: 18px; font-weight: 800; color: var(--text-main); margin: 0; line-height: 1.2; letter-spacing: -0.5px; }
        .company-nif { font-size: 12px; font-weight: 700; color: var(--text-muted); margin-top: 4px; }
        
        .status-pill-badge { 
            display: flex; align-items: center; gap: 6px; padding: 6px 12px; 
            border-radius: 10px; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .status-pill-badge.ativa { background: #DCFCE7; color: #166534; }
        .status-pill-badge.a-vencer { background: #FEF3C7; color: #92400E; }
        .pulse { width: 6px; height: 6px; background: currentColor; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
        
        .card-content { flex: 1; }
        .plan-info-box { 
            display: grid; grid-template-columns: 1fr 1fr; gap: 16px; 
            background: rgba(255, 255, 255, 0.3); padding: 20px; border-radius: 16px; 
            border: 1px solid rgba(255, 255, 255, 0.4); margin-bottom: 24px;
        }
        .info-item .label { font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; display: block; letter-spacing: 0.5px; }
        .info-item .value { font-size: 15px; font-weight: 800; color: #171717; display: flex; align-items: center; gap: 6px; }
        .info-item .value.urgent { color: #C2410C; }
        .shield { color: var(--primary); }

        .collaboration-stats { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-muted); font-weight: 600; }
        .collaboration-stats strong { color: var(--text-main); font-weight: 800; }

        .card-footer { display: flex; gap: 12px; margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.03); }
        .btn-manage-modern { 
            flex: 1; background: transparent; border: 1px solid #E2E8F0; 
            padding: 14px; border-radius: 14px; font-weight: 800; font-size: 14px;
            display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; color: #475569;
            transition: all 0.3s;
        }
        .btn-manage-modern:hover { background: rgba(15, 15, 15, 0.05); color: var(--primary); border-color: var(--primary); transform: scale(1.02); }
        .btn-icon-modern { padding: 14px; background: rgba(0,0,0,0.02); border: none; border-radius: 14px; color: var(--text-muted); cursor: pointer; transition: all 0.3s; }
        .btn-icon-modern:hover { background: rgba(0,0,0,0.05); color: var(--text-main); }

        /* Responsividade */
        @media (max-width: 1200px) {
            .company-grid { grid-template-columns: repeat(2, 1fr); }
            .filter-bar { flex-wrap: wrap; }
            .search-wrapper { min-width: 100%; }
        }
        @media (max-width: 768px) {
            .companies-page { padding: 24px 16px; margin-top: 72px;}
            .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
            .btn-gradient { width: 100%; justify-content: center; }
            .company-grid { grid-template-columns: 1fr; }
            .summary-stats-modern { width: 100%; justify-content: space-between; }
            .stat-pill { flex: 1; }
            .filter-actions { width: 100%; display: flex; justify-content: space-between; gap: 12px; }
            .filter-btn-modern { flex: 1; justify-content: center; }
        }

      `}</style>
    </MainLayout>
  );
};

export default Companies;
