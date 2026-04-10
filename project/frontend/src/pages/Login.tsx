import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Moon, Sun } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import logoRna from '../assets/logo_rna.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      auth.login({
        access_token: response.data.access_token,
        user: response.data.user,
      });

      navigate('/dashboard');
    } catch (loginError: unknown) {
      setError('Não foi possível autenticar. Verifique seu email e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="bg-mesh" />

      <button className="theme-toggle-login" onClick={toggleTheme}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="login-card premium-card">
        <div className="login-header">
          <div className="logo-glow">
            <img src={logoRna} alt="NOSSA - RNA" className="login-logo-premium" />
          </div>
          <h1 className="login-title-premium">NOSSA RNA</h1>
          <p className="login-tagline">Rede de Negócios de Angola</p>
        </div>

        <div className="login-content-premium">
          <div className="welcome-section">
            <h2>Bem-vindo de volta</h2>
            <p>Acesse o seu ecossistema de inteligência e negócios.</p>
          </div>

          <form className="login-form-premium" onSubmit={handleSubmit}>
            <div className="input-group-premium">
              <label>E-MAIL CORPORATIVO</label>
              <div className="input-field-premium">
                <Mail size={18} className="field-icon" />
                <input
                  type="email"
                  placeholder="usuario@empresa.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group-premium">
              <div className="label-flex">
                <label>PALAVRA-PASSE</label>
                <a href="#">Recuperar</a>
              </div>
              <div className="input-field-premium">
                <Lock size={18} className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn-login-premium" disabled={loading}>
              {loading ? 'Validando...' : 'Entrar na Plataforma'}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="access-info">
            Ainda não faz parte? <a href="#">Solicitar entrada</a>
          </p>
        </div>

        <div className="login-footer-premium">
          <div className="security-badge">
            <Shield size={12} /> CONEXÃO ENCRIPTADA 256-BIT
          </div>
          <p>© 2024 NOSSA RNA | PREMIUM BUSINESS HUB</p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-light);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .bg-mesh {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(at 0% 0%, hsla(0, 0%, 85%, 0.45) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(0, 0%, 75%, 0.35) 0px, transparent 50%),
            radial-gradient(at 100% 50%, hsla(0, 0%, 65%, 0.25) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(0, 0%, 80%, 0.35) 0px, transparent 50%);
          filter: blur(100px);
          opacity: 0.8;
          animation: mesh-move 20s infinite alternate;
        }

        @keyframes mesh-move {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.2) translate(5%, 5%); }
        }

        .theme-toggle-login {
          position: absolute;
          top: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          z-index: 100;
          cursor: pointer;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 48px;
          text-align: center;
          position: relative;
          z-index: 10;
          border-radius: 32px;
          animation: card-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes card-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-header { margin-bottom: 40px; }
        .logo-glow {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 24px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
          padding: 12px;
        }
        .login-logo-premium { width: 100%; height: 100%; object-fit: contain; }
        
        .login-title-premium { font-size: 28px; font-weight: 900; color: var(--text-main); letter-spacing: -1px; }
        .login-tagline { font-size: 13px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }

        .welcome-section { margin-bottom: 32px; text-align: left; }
        .welcome-section h2 { font-size: 24px; font-weight: 800; color: var(--text-main); }
        .welcome-section p { font-size: 15px; color: var(--text-muted); margin-top: 6px; font-weight: 600; }

        .input-group-premium { margin-bottom: 24px; text-align: left; }
        .input-group-premium label { font-size: 11px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.5px; margin-bottom: 8px; display: block; }
        .label-flex { display: flex; justify-content: space-between; align-items: center; }
        .label-flex a { font-size: 11px; font-weight: 700; color: var(--primary); text-decoration: none; }

        .input-field-premium { 
          position: relative; 
          display: flex; 
          align-items: center; 
          background: rgba(0,0,0,0.03); 
          border: 1px solid var(--gray-200); 
          border-radius: 16px;
          transition: all 0.3s;
        }
        .input-field-premium:focus-within { 
          background: var(--white); 
          border-color: var(--primary); 
          box-shadow: 0 0 0 4px var(--primary-light); 
        }
        .input-field-premium svg.field-icon { 
          position: absolute; 
          left: 16px; 
          color: var(--text-muted); 
          pointer-events: none;
        }
        .input-field-premium input { 
          width: 100%; 
          padding: 14px 48px 14px 48px; 
          background: transparent; 
          border: none; 
          outline: none;
          font-weight: 600; 
          font-size: 15px; 
          color: var(--text-main); 
        }
        
        .eye-btn { 
          position: absolute; 
          right: 8px; 
          width: 36px;
          height: 36px;
          border: none; 
          background: transparent; 
          color: var(--text-muted); 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .eye-btn:hover { background: rgba(0,0,0,0.05); color: var(--primary); }

        .login-error { margin-top: 0; color: var(--danger); font-weight: 700; }

        .btn-login-premium { width: 100%; padding: 16px; border-radius: 18px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.22); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 8px; }
        .btn-login-premium:hover { transform: translateY(-2px); box-shadow: 0 20px 30px rgba(0, 0, 0, 0.32); }

        .access-info { margin-top: 32px; font-size: 14px; font-weight: 600; color: var(--text-muted); }
        .access-info a { color: var(--primary); font-weight: 800; text-decoration: none; }

        .login-footer-premium { margin-top: 40px; }
        .security-badge { font-size: 9px; font-weight: 900; color: var(--text-muted); background: rgba(0,0,0,0.03); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; letter-spacing: 0.5px; opacity: 0.7; }
        .login-footer-premium p { font-size: 10px; font-weight: 700; color: var(--text-muted); margin-top: 16px; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.5px; }
      `}</style>
    </div>
  );
};

export default Login;
