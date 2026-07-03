import { useState, useEffect } from 'react';
import { Flavor } from '../types';
import { motion } from 'motion/react';
import { X, Check, ShoppingBag, Info, Leaf, Plus, Minus } from 'lucide-react';

interface FlavorModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  onAddToOrder: (flavor: Flavor, quantity: number) => void;
}

export default function FlavorModal({ flavor, onClose, onAddToOrder }: FlavorModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Reset states when a new flavor is loaded
  useEffect(() => {
    if (flavor) {
      setQuantity(1);
      setAdded(false);
    }
  }, [flavor]);

  // Lock body scroll on mount and restore on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!flavor) return null;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToOrder(flavor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      
      {/* Immersive backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0D2757]/80 backdrop-blur-2xl cursor-pointer"
      />

      {/* Floating Spatial App-like Modal Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl h-auto max-h-[85vh] md:max-h-[90vh] glass-liquid rounded-[36px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-3xl border border-white/20 text-white z-10"
      >
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 z-30 cursor-pointer text-white"
          id="close-flavor-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: VISUAL SPLASH (PREDOMINANT COLOR AND TEXTURE) */}
        <div 
          className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden flex flex-col justify-end p-8 border-b md:border-b-0 md:border-r border-white/10"
          style={{
            background: `linear-gradient(135deg, ${flavor.color} 0%, ${flavor.secondaryColor || '#325289'} 100%)`
          }}
        >
          
          {/* Ambient Glowing Aura in the background */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[80px] opacity-50 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${flavor.secondaryColor || '#325289'} 0%, ${flavor.color} 70%)`
            }}
          />
          <div 
            className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full blur-[60px] opacity-40 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${flavor.color} 0%, transparent 75%)`
            }}
          />

          {/* Animated Liquid Flavor Orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="w-48 h-48 rounded-full animate-liquid-wobble opacity-40 filter blur-[1px] border-2 border-white/30"
              style={{
                background: `radial-gradient(circle, ${flavor.secondaryColor || '#325289'} 0%, ${flavor.color} 80%)`
              }}
            />
          </div>

          {/* Subtle bottom shadow overlay to guarantee text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />

          {/* Floating abstract rings in visual canvas */}
          <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full border border-white/15 animate-spin-slow opacity-30" />
          <div className="absolute -right-6 bottom-12 w-32 h-32 rounded-full border border-white/10 animate-float-medium opacity-20" />

          {/* Visual Canvas content */}
          <div className="relative z-20">
            <span className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/25 text-[10px] font-mono uppercase tracking-widest text-brand-beige mb-3 inline-block backdrop-blur-sm">
              {flavor.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-2 leading-none">
              {flavor.name}
            </h3>
            <p className="text-brand-beige/90 text-xs font-mono tracking-wider">
              Artesanal &bull; R$ 3,00 cada
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: RICH INGREDIENTS, DESCRIPTIONS & QUANTITY SELECTOR */}
        <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-full bg-[#112954]/95 backdrop-blur-lg">
          
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-brand-beige/50 uppercase">
              <Info className="w-4 h-4 text-brand-primary" />
              Especificações do Produto
            </div>

            <h4 className="text-sm font-mono uppercase tracking-wider text-white/50 mb-2">
              Sinfonia de Sabores
            </h4>
            <p className="text-brand-beige/85 text-sm md:text-base leading-relaxed mb-6 font-sans">
              {flavor.description}
            </p>

            {/* Texture Info */}
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand-primary/20 text-brand-beige">
                <Leaf className="w-4 h-4 text-brand-olive" />
              </div>
              <div>
                <h5 className="text-xs font-mono uppercase text-white/50 tracking-wider">Perfil Sensorial</h5>
                <p className="text-xs text-brand-beige/80 mt-1 leading-relaxed font-sans">{flavor.texture}</p>
              </div>
            </div>

            {/* Ingredients Bento-Tag List */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider mb-3">
                Ingredientes Selecionados
              </h4>
              <div className="flex flex-wrap gap-2">
                {flavor.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-brand-beige/90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive controls (Quantity & Purchase CTA) */}
          <div className="pt-6 border-t border-white/10 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Quantity selector with tactical feedback styling */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase text-white/50">Qtd:</span>
                <div className="flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10">
                  <button
                    onClick={handleDecrement}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    title="Diminuir"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    title="Aumentar"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal Display */}
              <div className="text-right sm:mr-auto sm:ml-6">
                <span className="text-[10px] font-mono text-white/40 block">SUBTOTAL</span>
                <span className="text-2xl font-mono font-bold text-white tracking-tight">
                  R$ {(3 * quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold transition-all duration-300 shadow-xl cursor-pointer ${
                  added
                    ? 'bg-brand-olive text-white glow-olive'
                    : 'bg-brand-primary hover:bg-brand-primary/90 text-white glow-brand hover:scale-102 hover:shadow-2xl'
                }`}
                id="add-to-order-modal-btn"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    Adicionado!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar ao Pedido
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
