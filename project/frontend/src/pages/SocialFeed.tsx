import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
  Image as ImageIcon,
  Video,
  Briefcase,
  ShoppingCart,
  Globe
} from 'lucide-react';
import MainLayout from '../components/MainLayout';

const posts = [
  {
    id: 1,
    user: 'Manuel Antunes',
    role: 'CEO na AngolaTech',
    time: '2h • 🌐',
    content: 'Estamos muito entusiasmados em anunciar a nossa nova parceria estratégica com a Rede de Negócios de Angola (RNA). Juntos, vamos digitalizar o ecossistema empresarial de Luanda! 🚀',
    likes: 124,
    comments: 18,
    avatar: 'https://ui-avatars.com/api/?name=Manuel+Antunes&background=1f1f1f&color=fff',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    id: 2,
    user: 'Lídia Costa',
    role: 'Gestora Comercial',
    time: '5h • 🌐',
    content: 'Temos novas unidades de MacBook Pro M2 disponíveis para entrega imediata em Benguela. Stock limitado! #TechAngola #Business',
    likes: 85,
    comments: 42,
    avatar: 'https://ui-avatars.com/api/?name=Lidia+Costa&background=F59E0B&color=fff',
    isProduct: true,
    price: '1.450.000 Kz',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'
  }
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

const SocialFeed: React.FC = () => {
  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="feed-container"
      >
        <div className="feed-layout">


          {/* Main Feed */}
          <div className="feed-main">
            <motion.div variants={itemVariants} className="create-post-modern premium-card">
              <div className="post-input-row-modern">
                <div className="avatar-sm-modern">
                  <img src="https://ui-avatars.com/api/?name=Ebenezer+Felismino&background=1f1f1f&color=fff" alt="Me" />
                </div>
                <button className="post-trigger-modern">Começar uma publicação no RNA Feed...</button>
              </div>
              <div className="post-actions-modern">
                <button className="action-btn photo"><ImageIcon size={18} /> Mídia</button>
                <button className="action-btn video"><Video size={18} /> Vídeo</button>
                <button className="action-btn job"><Briefcase size={18} /> Oportunidade</button>
                <button className="action-btn article"><Send size={18} /> Artigo</button>
              </div>
            </motion.div>

            <div className="posts-list-modern">
              <AnimatePresence>
                {posts.map(post => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    layout
                    className="post-card-modern premium-card"
                  >
                    <div className="post-header-modern">
                      <div className="user-meta-modern">
                        <div className="avatar-md-modern">
                          <img src={post.avatar} alt={post.user} />
                        </div>
                        <div className="user-details-modern">
                          <h4>{post.user}</h4>
                          <p>{post.role}</p>
                          <span className="post-time-modern">{post.time} <Globe size={10} style={{ marginLeft: '4px' }} /></span>
                        </div>
                      </div>
                      <button className="icon-btn-modern"><MoreHorizontal size={20} /></button>
                    </div>

                    <div className="post-content-modern">
                      <p>{post.content}</p>
                      {post.image && (
                        <div className="post-image-wrapper">
                          <img src={post.image} alt="Post" className="post-image-modern" />
                        </div>
                      )}

                      {post.isProduct && (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="product-sale-card-modern"
                        >
                          <img src={post.productImage} alt="Product" />
                          <div className="product-sale-info-modern">
                            <div className="product-text">
                              <h5>MacBook Pro M2 - Pronta Entrega</h5>
                              <p className="price-tag-modern">{post.price}</p>
                            </div>
                            <button className="btn-buy-modern">
                              <ShoppingCart size={18} />
                              Comprar
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="post-footer-modern">
                      <div className="engagement-stats-modern">
                        <div className="likes-avatars">
                          <div className="avatar-overlap" style={{ zIndex: 3 }}><img src="https://ui-avatars.com/api/?name=A&background=EF4444" /></div>
                          <div className="avatar-overlap" style={{ zIndex: 2 }}><img src="https://ui-avatars.com/api/?name=B&background=262626" /></div>
                          <p>{post.likes} gostos</p>
                        </div>
                        <span className="comments-count">{post.comments} comentários</span>
                      </div>
                      <div className="action-buttons-modern">
                        <motion.button whileTap={{ scale: 0.9 }}><Heart size={20} /> Like</motion.button>
                        <motion.button whileTap={{ scale: 0.9 }}><MessageCircle size={20} /> Comentar</motion.button>
                        <motion.button whileTap={{ scale: 0.9 }}><Share2 size={20} /> Partilhar</motion.button>
                        <motion.button whileTap={{ scale: 0.9 }}><Send size={20} /> Enviar</motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>


        </div>
      </motion.div>

      <style>{`
        .feed-container { padding: 60px 24px; background: transparent; min-height: calc(100vh - 72px); margin-top: 72px; position: relative; }
        /* Premium Background Glow Arrays */
        .feed-container::before { content: ''; position: fixed; top: -100px; left: 20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(31, 31, 31, 0.2) 0%, transparent 60%); border-radius: 50%; z-index: -1; filter: blur(60px); animation: float 10s infinite ease-in-out; pointer-events: none; }
        .feed-container::after { content: ''; position: fixed; top: 200px; right: 10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 60%); border-radius: 50%; z-index: -1; filter: blur(60px); animation: float 12s infinite ease-in-out reverse; pointer-events: none; }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }

        .feed-layout { display: flex; justify-content: center; max-width: 800px; margin: 0 auto; width: 100%; position: relative; z-index: 10; }

        .feed-main { display: flex; flex-direction: column; gap: 40px; width: 100%; }
        
        /* Glassmorphism & Premium Cards */
        .premium-card { background: var(--bg-card) !important; backdrop-filter: blur(28px) saturate(200%) !important; border: 1px solid var(--glass-border) !important; box-shadow: var(--shadow-lg) !important; }
        .premium-card:hover { transform: translateY(-4px) scale(1.005) !important; background: var(--bg-card) !important; border-color: var(--primary) !important; }

        .create-post-modern { padding: 28px; border-radius: 32px; position: relative; overflow: hidden; }
        .create-post-modern::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15, 15, 15, 0.06), transparent); pointer-events: none; }
        
        .post-input-row-modern { display: flex; gap: 20px; margin-bottom: 24px; align-items: center; }
        .avatar-sm-modern { width: 56px; height: 56px; border-radius: 18px; overflow: hidden; flex-shrink: 0; background: var(--bg-card); border: 2px solid var(--glass-border); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18); padding: 2px; }
        .avatar-sm-modern img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
        
        .post-trigger-modern { flex: 1; text-align: left; padding: 18px 28px; border-radius: 20px; border: 1px solid var(--gray-200); background: var(--bg-card); backdrop-filter: blur(5px); color: var(--text-muted); font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.3s; }
        .post-trigger-modern:hover { background: var(--white); border-color: var(--primary); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16); color: var(--text-main); }
        
        .post-actions-modern { display: flex; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.03); padding-top: 16px; }
        .action-btn { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 16px; font-size: 14px; font-weight: 700; color: var(--text-muted); background: transparent; border: none; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover { background: var(--bg-card); box-shadow: 0 4px 12px rgba(0,0,0,0.05); transform: translateY(-2px); color: var(--text-main); }
        .action-btn.photo:hover { color: var(--primary); }
        .action-btn.video:hover { color: #10B981; }
        .action-btn.job:hover { color: #A855F7; }
        .action-btn.article:hover { color: #F97316; }
        .action-btn.photo svg { color: var(--primary); }
        .action-btn.video svg { color: #10B981; }
        .action-btn.job svg { color: #A855F7; }
        .action-btn.article svg { color: #F97316; }

        .post-card-modern { padding: 32px 0 20px; border-radius: 32px; overflow: hidden; }
        .post-header-modern { display: flex; justify-content: space-between; padding: 0 32px; margin-bottom: 20px; align-items: center; }
        .user-meta-modern { display: flex; gap: 16px; align-items: center; }
        .avatar-md-modern { width: 60px; height: 60px; border-radius: 20px; overflow: hidden; background: var(--bg-card); border: 2px solid var(--glass-border); box-shadow: 0 8px 20px rgba(0,0,0,0.08); padding: 2px; }
        .avatar-md-modern img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }
        .user-details-modern h4 { font-size: 17px; font-weight: 800; color: var(--text-main); margin: 0; letter-spacing: -0.3px; }
        .user-details-modern p { font-size: 13px; color: var(--text-muted); margin-top: 2px; font-weight: 600; }
        .post-time-modern { font-size: 11px; color: var(--text-muted); font-weight: 700; display: flex; align-items: center; margin-top: 4px; opacity: 0.8; }
        
        .icon-btn-modern { width: 44px; height: 44px; border-radius: 14px; border: none; background: rgba(0,0,0,0.02); color: #94A3B8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn-modern:hover { background: rgba(0,0,0,0.05); color: #171717; }

        .post-content-modern { padding: 0 32px; margin-bottom: 24px; }
        .post-content-modern p { font-size: 16px; line-height: 1.7; color: var(--text-main); margin-bottom: 20px; font-weight: 500; opacity: 0.95; }
        .post-image-wrapper { border-radius: 24px; overflow: hidden; box-shadow: 0 12px 24px rgba(0,0,0,0.06); margin-top: 12px; }
        .post-image-modern { width: 100%; max-height: 480px; object-fit: cover; display: block; filter: brightness(1.02) contrast(1.05); }
        
        .product-sale-card-modern { border-radius: 24px; overflow: hidden; background: var(--bg-card); box-shadow: 0 16px 32px rgba(0,0,0,0.06); border: 1px solid var(--gray-200); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 12px; backdrop-filter: blur(10px); }
        .product-sale-card-modern:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18); border-color: var(--primary); }
        .product-sale-card-modern img { width: 100%; height: 260px; object-fit: cover; }
        .product-sale-info-modern { padding: 24px; display: flex; justify-content: space-between; align-items: center; }
        .product-text h5 { font-size: 17px; font-weight: 800; color: var(--text-main); margin: 0; }
        .price-tag-modern { font-size: 20px; font-weight: 900; color: var(--primary); margin-top: 4px; }
        .btn-buy-modern { display: flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #111111 0%, #2f2f2f 100%); color: white; padding: 14px 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.2); font-weight: 800; font-size: 14px; cursor: pointer; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2); transition: all 0.3s; }
        .btn-buy-modern:hover { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35); transform: translateY(-2px); filter: brightness(1.1); }

        .post-footer-modern { padding: 0 32px; }
        .engagement-stats-modern { display: flex; justify-content: space-between; font-size: 13px; color: #64748B; font-weight: 700; padding: 16px 0; border-bottom: 1px solid rgba(0,0,0,0.03); margin-bottom: 8px; }
        .likes-avatars { display: flex; align-items: center; gap: 6px; }
        .avatar-overlap { width: 26px; height: 26px; border-radius: 50%; border: 3px solid white; overflow: hidden; margin-right: -10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .avatar-overlap img { width: 100%; height: 100%; object-fit: cover; }
        .likes-avatars p { margin-left: 14px; }
        
        .action-buttons-modern { display: flex; justify-content: space-between; padding-top: 8px; }
        .action-buttons-modern button { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 15px; font-weight: 700; color: var(--text-muted); padding: 16px; border-radius: 16px; background: transparent; border: none; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .action-buttons-modern button:hover { background: var(--primary-light); color: var(--primary); transform: scale(1.02); }
      `}</style>
    </MainLayout>
  );
};

export default SocialFeed;
