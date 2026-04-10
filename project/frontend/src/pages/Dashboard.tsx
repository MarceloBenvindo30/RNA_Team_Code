import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    Download,
    Calendar,
    TrendingUp,
    Users,
    AlertTriangle,
    CreditCard,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api/axios';

const performanceData = [
    { name: 'JAN', luanda: 4000, benguela: 2400 },
    { name: 'FEV', luanda: 3000, benguela: 1398 },
    { name: 'MAR', luanda: 2000, benguela: 9800 },
    { name: 'ABR', luanda: 2780, benguela: 3908 },
    { name: 'MAI', luanda: 1890, benguela: 4800 },
    { name: 'JUN', luanda: 2390, benguela: 3800 },
];

const sectorData = [
    { name: 'Agronegócio', value: 70 },
    { name: 'Tecnologia', value: 25 },
    { name: 'Outros', value: 5 },
];

const COLORS = ['#262626', '#525252', '#a3a3a3'];

const Dashboard: React.FC = () => {
    const [liveRevenue, setLiveRevenue] = useState(2480000);
    const [liveUsers, setLiveUsers] = useState(1248);
    const [summaryMessage, setSummaryMessage] = useState('Carregando dados...');

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveRevenue(prev => prev + Math.floor(Math.random() * 5000) - 1000);
            setLiveUsers(prev => prev + (Math.random() > 0.7 ? 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function loadSummary() {
            try {
                const response = await api.get('/contabilidade/summary');
                setSummaryMessage(response.data?.message ?? 'Resumo carregado com sucesso.');
            } catch (error) {
                setSummaryMessage('Falha ao conectar com o backend. Faça login e tente novamente.');
            }
        }

        loadSummary();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    } as const;

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
    } as const;

    return (
        <MainLayout>
            <motion.div
                className="dashboard-content"
                initial="hidden"
                animate="show"
                variants={containerVariants}
            >
                <div className="dash-header">
                    <div className="header-info">
                        <motion.span variants={itemVariants} className="breadcrumb">
                            <Activity size={12} className="pulse-icon" /> VISÃO GERAL EM TEMPO REAL
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="header-title">
                            Business Intelligence <span className="live-badge">LIVE</span>
                        </motion.h1>
                    </div>
                    <motion.div variants={itemVariants} className="header-actions">
                        <button className="btn-secondary">
                            <Calendar size={18} />
                            Últimos 30 dias
                        </button>
                        <button className="btn-gradient">
                            <Download size={18} />
                            Exportar Relatório
                        </button>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="api-summary-card premium-card">
                    <p className="api-summary-text">{summaryMessage}</p>
                </motion.div>

                <div className="stats-grid">
                    <motion.div variants={itemVariants} className="stat-card premium-card">
                        <div className="stat-content">
                            <div className="stat-header">
                                <span className="stat-label">RECEITA TOTAL</span>
                                <CreditCard size={14} className="stat-icon blue" />
                            </div>
                            <motion.h3
                                key={liveRevenue}
                                className="stat-value"
                            >
                                Kz {liveRevenue.toLocaleString()}
                            </motion.h3>
                            <div className="stat-trend positive">
                                <ArrowUpRight size={12} /> 12.5%
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="stat-card premium-card">
                        <div className="stat-content">
                            <div className="stat-header">
                                <span className="stat-label">NOVOS USUÁRIOS</span>
                                <Users size={14} className="stat-icon purple" />
                            </div>
                            <motion.h3
                                key={liveUsers}
                                className="stat-value"
                            >
                                {liveUsers.toLocaleString()}
                            </motion.h3>
                            <div className="stat-trend positive">
                                <ArrowUpRight size={12} /> 4.2%
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="stat-card premium-card">
                        <div className="stat-content">
                            <div className="stat-header">
                                <span className="stat-label">TAXA DE CONVERSÃO</span>
                                <TrendingUp size={14} className="stat-icon orange" />
                            </div>
                            <h3 className="stat-value">24.8%</h3>
                            <div className="stat-trend warning">
                                Estável
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="stat-card premium-card">
                        <div className="stat-content">
                            <div className="stat-header">
                                <span className="stat-label">ALERTAS ATIVOS</span>
                                <AlertTriangle size={14} className="stat-icon red" />
                            </div>
                            <h3 className="stat-value">14</h3>
                            <div className="stat-trend negative">
                                <ArrowDownRight size={12} /> 2.1%
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="charts-grid">
                    <motion.div variants={itemVariants} className="chart-container main-chart premium-card">
                        <div className="chart-header">
                            <div>
                                <h3>Performance por Região</h3>
                                <p className="chart-subtitle">Análise comparativa trimestral</p>
                            </div>
                            <div className="chart-legend">
                                <span className="dot luanda" /> Luanda
                                <span className="dot benguela" /> Benguela
                            </div>
                        </div>
                        <div className="chart-body">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorLuanda" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#262626" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#262626" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="colorBenguela" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#525252" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#525252" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: '1px solid var(--gray-200)',
                                            boxShadow: 'var(--shadow-lg)',
                                            background: '#121826',
                                            color: '#f5f5f5'
                                        }}
                                        itemStyle={{ color: '#f5f5f5' }}
                                        labelStyle={{ color: '#a3a3a3' }}
                                    />
                                    <Bar dataKey="luanda" fill="url(#colorLuanda)" radius={[6, 6, 0, 0]} barSize={24} />
                                    <Bar dataKey="benguela" fill="url(#colorBenguela)" radius={[6, 6, 0, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="chart-container side-chart premium-card">
                        <div className="chart-header">
                            <h3>Distribuição Setorial</h3>
                        </div>
                        <div className="chart-body donut-chart">
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={sectorData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {sectorData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="donut-center">
                                <h2>100%</h2>
                                <span>TOTAL ATIVO</span>
                            </div>
                            <div className="donut-legend">
                                {sectorData.map((item, index) => (
                                    <div key={index} className="legend-item">
                                        <span className="dot" style={{ background: COLORS[index] }} />
                                        <span className="label">{item.name}</span>
                                        <span className="value">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

            </motion.div>

            <style>{`
        .dashboard-content { padding: 32px; max-width: 1400px; margin: 0 auto; }
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
        .breadcrumb { font-size: 10px; font-weight: 800; color: var(--primary); letter-spacing: 1px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; }
        .pulse-icon { color: #10B981; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .header-title { font-size: 32px; font-weight: 800; color: var(--text-main); letter-spacing: -1px; margin-top: 4px; }
        .live-badge { font-size: 10px; background: #EF4444; color: white; padding: 2px 6px; border-radius: 4px; vertical-align: top; margin-left: 8px; animation: blink 1s infinite; letter-spacing: 1px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        .header-actions { display: flex; gap: 12px; }
        .btn-secondary { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); padding: 12px 20px; border-radius: 14px; font-weight: 700; font-size: 14px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.03); cursor: pointer; color: var(--text-main); }
        .btn-secondary:hover { background: rgba(255,255,255,0.8); transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); border-color: var(--primary); color: var(--primary); }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .stat-card { padding: 20px; }
        .api-summary-card { padding: 18px 22px; margin-bottom: 24px; border-radius: 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: var(--text-main); }
        .api-summary-text { font-size: 14px; font-weight: 700; margin: 0; }

        .stat-content { width: 100%; }
        .stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .stat-icon { padding: 4px; border-radius: 4px; box-sizing: content-box; }
        .stat-icon.blue { background: rgba(38, 38, 38, 0.1); color: #262626; }
        .stat-icon.purple { background: rgba(168, 85, 247, 0.1); color: #A855F7; }
        .stat-icon.orange { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
        .stat-icon.red { background: rgba(239, 68, 68, 0.1); color: #EF4444; }
        .stat-label { font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.5px; text-transform: uppercase; }
        .stat-value { font-size: 28px; font-weight: 700; color: var(--text-main); letter-spacing: -0.5px; margin-bottom: 8px; }
        .stat-trend { font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .stat-trend.positive { color: #10B981; }
        .stat-trend.warning { color: #F59E0B; }
        .stat-trend.negative { color: #EF4444; }
        
        .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px; }
        .chart-container { padding: 28px; }
        .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .chart-header h3 { font-size: 20px; font-weight: 800; margin-bottom: 4px; color: var(--text-main); line-height: 1.2; }
        .chart-subtitle { font-size: 13px; color: var(--text-muted); font-weight: 600; }
        .chart-legend { display: flex; gap: 16px; font-size: 12px; font-weight: 700; color: var(--text-muted); }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot.luanda { background: #262626; }
        .dot.benguela { background: #525252; }
        
        .donut-chart { position: relative; display: flex; flex-direction: column; align-items: center; }
        .donut-center { position: absolute; top: 100px; text-align: center; }
        .donut-center h2 { font-size: 28px; font-weight: 800; margin-bottom: 0; background: linear-gradient(135deg, #111111 0%, #525252 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .donut-center span { font-size: 11px; color: var(--text-muted); font-weight: 800; }
        .donut-legend { width: 100%; margin-top: 16px; }
        .legend-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; padding: 10px 14px; border-radius: 12px; transition: background 0.2s; background: rgba(0,0,0,0.02); }
        .legend-item:hover { background: rgba(0,0,0,0.04); }
        .legend-item .label { flex: 1; font-size: 13px; font-weight: 700; color: var(--text-main); }
        .legend-item .value { font-size: 13px; font-weight: 800; background: white; padding: 4px 10px; border-radius: 8px; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.02); }

        /* Responsividade */
        @media (max-width: 1200px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .charts-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
            .dashboard-content { padding: 24px 16px; }
            .dash-header { flex-direction: column; align-items: flex-start; gap: 16px; }
            .header-actions { width: 100%; justify-content: space-between; }
            .btn-secondary, .btn-gradient { flex: 1; justify-content: center; }
            .header-title { font-size: 24px; }
            .stats-grid { grid-template-columns: 1fr; }
            .stat-trend { position: static; margin-left: auto; }
            .chart-container { padding: 16px; }
        }
      `}</style>
        </MainLayout>
    );
};

export default Dashboard;
