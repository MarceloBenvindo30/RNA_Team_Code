import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ShoppingCart,
    Trash2,
    CreditCard,
    Banknote,
    WifiOff,
    Plus,
    Minus,
    CheckCircle2,
    Zap
} from 'lucide-react';
import MainLayout from '../components/MainLayout';

const categories = ['Todos', 'Eletrónicos', 'Acessórios', 'Serviços', 'Software'];
const products = [
    { id: 1, name: 'MacBook Pro M2', price: 1450000, category: 'Eletrónicos', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop' },
    { id: 2, name: 'iPhone 15 Pro', price: 980000, category: 'Eletrónicos', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&h=200&fit=crop' },
    { id: 3, name: 'Teclado Mecânico', price: 45000, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop' },
    { id: 4, name: 'Monitor 4K 27"', price: 280000, category: 'Eletrónicos', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop' },
    { id: 5, name: 'Software Gestão', price: 12000, category: 'Software', image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=200&fit=crop' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
} as const;

const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 200 } }
} as const;

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

interface CartItem extends Product {
    qty: number;
}

const POS: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('Todos');

    const addToCart = (product: Product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (id: number) => setCart(cart.filter(item => item.id !== id));
    const updateQty = (id: number, delta: number) => {
        setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const total = subtotal * 1.14;

    return (
        <MainLayout>
            <div className="pos-container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="pos-main"
                >
                    <motion.div variants={itemVariants} className="pos-header">
                        <div className="pos-title">
                            <h2>Terminal POS</h2>
                            <div className="offline-badge-modern">
                                <motion.span
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="pulse-dot"
                                />
                                <WifiOff size={14} /> Offline Cloud Sync
                            </div>
                        </div>
                        <div className="search-bar-modern">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Procurar produto por nome ou código..." />
                            <div className="shortcut-hint">F2</div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="categories-scroll-modern">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`category-pill-modern ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </motion.div>

                    <motion.div variants={containerVariants} className="product-grid-modern">
                        <AnimatePresence>
                            {products.filter(p => activeCategory === 'Todos' || p.category === activeCategory).map(product => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    layout
                                    whileHover={{ borderColor: 'var(--primary)' }}
                                    className="product-card-modern premium-card"
                                    onClick={() => addToCart(product)}
                                >
                                    <div className="product-image-wrapper">
                                        <img src={product.image} alt={product.name} />
                                        <div className="add-overlay"><Plus color="white" /></div>
                                    </div>
                                    <div className="product-info-modern">
                                        <h4 className="product-name-modern">{product.name}</h4>
                                        <div className="price-row">
                                            <p className="product-price-modern">Kz {product.price.toLocaleString()}</p>
                                            <Zap size={14} className="instant-icon" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                <div className="pos-sidebar-modern premium-card">
                    <div className="cart-header-modern">
                        <div className="cart-title-modern">
                            <ShoppingCart size={22} className="text-primary" />
                            <h3>Check-out</h3>
                        </div>
                        <motion.span
                            key={cart.length}
                            initial={{ scale: 1.2, backgroundColor: 'var(--primary)' }}
                            animate={{ scale: 1, backgroundColor: 'var(--primary-light)' }}
                            className="items-count-modern"
                        >
                            {cart.length}
                        </motion.span>
                    </div>

                    <div className="cart-items-modern">
                        <AnimatePresence mode="popLayout">
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="empty-cart-modern"
                                >
                                    <div className="empty-icon-box">
                                        <ShoppingCart size={48} />
                                    </div>
                                    <p>O carrinho está vazio</p>
                                    <small>Selecione produtos à esquerda</small>
                                </motion.div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="cart-item-modern"
                                    >
                                        <div className="item-details-modern">
                                            <p className="item-name-modern">{item.name}</p>
                                            <p className="item-price-modern">Kz {item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="item-actions-modern">
                                            <div className="qty-controls-modern">
                                                <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, -1); }}><Minus size={14} /></button>
                                                <span>{item.qty}</span>
                                                <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, 1); }}><Plus size={14} /></button>
                                            </div>
                                            <button className="remove-btn-modern" onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="cart-summary-modern">
                        <div className="summary-row-modern">
                            <span>Subtotal</span>
                            <span className="font-bold">Kz {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row-modern total-modern">
                            <span>Total Geral</span>
                            <span className="total-value-modern">Kz {total.toLocaleString()}</span>
                        </div>

                        <div className="payment-section-modern">
                            <p className="payment-label-modern">MÉTODO DE PAGAMENTO</p>
                            <div className="payment-grid-modern">
                                <button className="payment-btn-modern active">
                                    <CreditCard size={18} />
                                    <span>Multicaixa</span>
                                </button>
                                <button className="payment-btn-modern">
                                    <Banknote size={18} />
                                    <span>Dinheiro</span>
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ filter: 'brightness(1.1)' }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-checkout-modern"
                            disabled={cart.length === 0}
                        >
                            <CheckCircle2 size={20} /> Finalizar Venda (F10)
                        </motion.button>
                    </div>
                </div>
            </div>

            <style>{`
        .pos-container { display: grid; grid-template-columns: 1fr 400px; height: calc(100vh - 72px); background: transparent; margin-top: 72px; padding: 24px; gap: 24px; position: relative; z-index: 1; }
        .pos-main { display: flex; flex-direction: column; overflow: hidden; }
        .pos-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .pos-title h2 { font-size: 24px; font-weight: 700; color: var(--text-main); margin: 0; }
        .offline-badge-modern { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 4px 12px; border-radius: 6px; margin-top: 4px; border: 1px solid rgba(31, 31, 31, 0.2); width: fit-content;}
        .pulse-dot { width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }

        .search-bar-modern { position: relative; width: 400px; }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-bar-modern input { 
            width: 100%; padding: 10px 16px 10px 48px; background: var(--bg-card); 
            border-radius: 12px; border: 1px solid var(--gray-200); color: var(--text-main);
            transition: all 0.2s;
            backdrop-filter: blur(10px);
        }
        .search-bar-modern input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); outline: none; }
        .shortcut-hint { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: #1a1a1a; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; color: #a3a3a3; border: 1px solid var(--gray-200); }

        .categories-scroll-modern { display: flex; gap: 10px; margin-bottom: 24px; padding-bottom: 8px; overflow-x: auto; }
        .category-pill-modern { 
            padding: 8px 20px; background: var(--bg-card); border: 1px solid var(--gray-200); 
            border-radius: 10px; font-size: 13px; font-weight: 700; color: var(--text-muted);
            cursor: pointer; white-space: nowrap; transition: all 0.2s;
            backdrop-filter: blur(10px);
        }
        .category-pill-modern.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); }

        .product-grid-modern { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; overflow-y: auto; padding-right: 8px; }
        .product-card-modern { 
            background: var(--bg-card); border: 1px solid var(--gray-200);
            border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.3s;
            backdrop-filter: blur(10px);
        }
        .product-image-wrapper { height: 140px; position: relative; overflow: hidden; }
        .product-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .add-overlay { position: absolute; inset: 0; background: rgba(15, 15, 15, 0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .product-card-modern:hover .add-overlay { opacity: 1; }

        .product-info-modern { padding: 16px; }
        .product-name-modern { font-size: 14px; font-weight: 700; color: var(--text-main); margin: 0 0 6px; }
        .price-row { display: flex; justify-content: space-between; align-items: center; }
        .product-price-modern { font-size: 15px; font-weight: 800; color: var(--primary); margin: 0; }
        .instant-icon { color: #F59E0B; }

        .pos-sidebar-modern { display: flex; flex-direction: column; border: 1px solid var(--gray-200); border-radius: 20px; overflow: hidden; background: var(--bg-card); backdrop-filter: blur(20px); }
        .cart-header-modern { padding: 20px; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center; }
        .cart-title-modern { display: flex; align-items: center; gap: 12px; }
        .cart-title-modern h3 { font-size: 18px; font-weight: 800; margin: 0; color: var(--text-main); }
        .items-count-modern { font-size: 11px; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 4px 10px; border-radius: 8px; }

        .cart-items-modern { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .empty-cart-modern { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); text-align: center; }
        .empty-icon-box { background: #1a1a1a; padding: 20px; border-radius: 12px; margin-bottom: 16px; color: #525252; }
        .empty-cart-modern p { font-weight: 600; margin: 0; color: var(--text-muted); }
        .empty-cart-modern small { font-size: 11px; margin-top: 4px; }

        .cart-item-modern { 
            display: flex; flex-direction: column; gap: 10px; padding: 14px; 
            background: rgba(0, 0, 0, 0.03); border-radius: 12px; border: 1px solid var(--gray-200);
        }
        .item-name-modern { font-size: 13px; font-weight: 700; color: var(--text-main); margin: 0; }
        .item-price-modern { font-size: 12px; font-weight: 600; color: var(--text-muted); margin: 2px 0 0; }
        .item-actions-modern { display: flex; justify-content: space-between; align-items: center; }
        .qty-controls-modern { display: flex; align-items: center; gap: 12px; background: var(--white); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--gray-200); }
        .qty-controls-modern button { background: none; border: none; padding: 2px; color: var(--primary); cursor: pointer; display: flex; }
        .qty-controls-modern span { font-weight: 800; font-size: 13px; color: var(--text-main); min-width: 16px; text-align: center; }
        .remove-btn-modern { background: rgba(239, 68, 68, 0.1); color: #EF4444; border: none; padding: 6px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .remove-btn-modern:hover { background: #EF4444; color: white; }

        .cart-summary-modern { padding: 24px; background: rgba(15, 15, 15, 0.03); border-top: 1px solid var(--gray-200); }
        .summary-row-modern { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: var(--text-muted); font-weight: 500; }
        .total-modern { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--gray-200); color: var(--text-main); }
        .total-value-modern { font-size: 22px; font-weight: 700; color: var(--primary); }
        
        .payment-section-modern { margin: 20px 0; }
        .payment-label-modern { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: 0.5px; margin-bottom: 10px; }
        .payment-grid-modern { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .payment-btn-modern { 
            display: flex; align-items: center; justify-content: center; gap: 8px; 
            padding: 10px; background: var(--bg-card); border: 1px solid var(--gray-200); border-radius: 10px; 
            font-size: 12px; font-weight: 700; color: var(--text-muted); cursor: pointer; transition: all 0.2s;
        }
        .payment-btn-modern.active { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }

        .btn-checkout-modern { 
            width: 100%; background: var(--primary); color: white; padding: 14px; 
            border: none; border-radius: 8px; font-weight: 700; font-size: 15px; 
            display: flex; align-items: center; justify-content: center; gap: 10px; 
            cursor: pointer; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); transition: all 0.3s;
        }
        .btn-checkout-modern:disabled { background: #1a1a1a; color: #525252; box-shadow: none; cursor: not-allowed; }

        @media (max-width: 1024px) {
            .pos-container { grid-template-columns: 1fr; height: auto; padding: 16px; margin-top: 72px; padding-bottom: 40px; }
            .pos-main { height: auto; overflow: visible; }
            .product-grid-modern { overflow-y: visible; padding-right: 0;}
            .pos-sidebar-modern { position: relative; height: auto; margin-top: 24px; border-radius: 20px;}
            .search-bar-modern { width: 100%; margin-top: 16px; }
            .pos-header { flex-direction: column; align-items: flex-start; }
            .cart-items-modern { max-height: 400px; overflow-y: auto; }
        }
      `}</style>
        </MainLayout>
    );
};

export default POS;
