import { useState, useEffect } from 'react';
import { CartItem, Flavor } from '../types';
import { ShoppingCart, X, Plus, Minus, Send, ShoppingBag, Trash2, MapPin, User, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (flavorId: string, quantity: number) => void;
  onRemoveItem: (flavorId: string) => void;
  onClearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const getFlavorEmoji = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('morango')) return '🍓';
  if (lower.includes('chocolate') || lower.includes('trufado')) return '🍫';
  if (lower.includes('leite') || lower.includes('ninho')) return '🥛';
  if (lower.includes('coco') || lower.includes('prestígio') || lower.includes('prestigio')) return '🥥';
  if (lower.includes('maracujá') || lower.includes('maracuja')) return '🟡';
  if (lower.includes('abacaxi')) return '🍍';
  if (lower.includes('amendoim') || lower.includes('paçoquita') || lower.includes('pacoquita')) return '🥜';
  if (lower.includes('castanha')) return '🌰';
  if (lower.includes('açaí') || lower.includes('acai')) return '🍇';
  if (lower.includes('romeu')) return '🧀';
  return '🍦';
};

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart, isOpen, setIsOpen }: CartProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pix');

  // Lock body scroll when cart is open to prevent page scrolling behind the drawer on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.flavor.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Default business contact phone number for Dindin's Gourmet (using standard placeholder)
    const phoneNumber = '5585985110225'; // e.g. Fortaleza regional format or generic BR number

    // Build the beautiful text message
    let message = `*🍦 NOVO PEDIDO - DINDIN'S GOURMET 🍦*\n\n`;
    message += `Olá! Gostaria de fazer um pedido de dindins gourmet:\n\n`;
    
    message += `*📋 ITENS DO PEDIDO:*\n`;
    cartItems.forEach((item) => {
      const itemSubtotal = (item.quantity * item.flavor.price).toFixed(2).replace('.', ',');
      const emoji = getFlavorEmoji(item.flavor.name);
      message += `${emoji} *${item.quantity}x* _${item.flavor.name}_ (R$ 3,00 cada) - *R$ ${itemSubtotal}*\n`;
    });

    message += `\n*📊 RESUMO DO PEDIDO:*\n`;
    message += `Total de Itens: *${totalQuantity} dindins*\n`;
    message += `Valor Total: *R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n\n`;

    if (name.trim() || address.trim()) {
      message += `*📍 INFORMAÇÕES DE ENTREGA:*\n`;
      if (name.trim()) message += `👤 *Cliente:* ${name}\n`;
      if (address.trim()) message += `🏠 *Endereço:* ${address}\n`;
      message += `💳 *Forma de Pagamento:* ${paymentMethod}\n\n`;
    }

    message += `_Enviado através do site oficial de Dindin's Gourmet._`;

    // Encode URI and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'referrerPolicy=no-referrer');
  };

  return (
    <>
      {/* FLOATING CART PILL BUTTON (Always Visible) */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-3 px-5 py-4 rounded-full bg-brand-primary border border-white/20 hover:border-white/40 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer glow-brand"
          id="cart-floating-trigger"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 group-hover:rotate-6 transition-transform" />
            {totalQuantity > 0 && (
              <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terracotta text-[10px] font-mono font-bold text-white border border-[#0D2757] animate-bounce">
                {totalQuantity}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start leading-none pr-1">
            <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Meu Pedido</span>
            <span className="text-sm font-mono font-bold mt-0.5">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </button>
      </div>

      {/* CART DRAWER BACKDROP & DRAWER SLIDE */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0D2757]/60 backdrop-blur-md cursor-pointer"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 h-[100dvh] w-full max-w-md glass-premium-dark border-l border-white/10 shadow-3xl flex flex-col justify-between"
              id="cart-side-drawer"
            >
              
              {/* Drawer Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-brand-primary/20 text-white">
                    <ShoppingBag className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white leading-tight">Sacola de Pedidos</h3>
                    <p className="text-xs font-mono text-brand-beige/50 uppercase mt-0.5">
                      {totalQuantity} {totalQuantity === 1 ? 'item selecionado' : 'itens selecionados'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Contents: Items and Order Form */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* ITEMS LIST */}
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="p-4 rounded-full bg-white/5 border border-white/5 mb-4 text-white/30">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <h4 className="text-base font-display font-semibold text-white/80">Sua sacola está vazia</h4>
                    <p className="text-xs text-brand-beige/40 max-w-xs mt-2">
                      Adicione alguns dindins gourmet deliciosos a partir do nosso menu bento logo abaixo!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-brand-beige/40 uppercase">
                      <span>Sabor do Dindin</span>
                      <button
                        onClick={onClearCart}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-terracotta/10 hover:bg-brand-terracotta/25 border border-brand-terracotta/20 hover:border-brand-terracotta/40 text-brand-terracotta text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer"
                        title="Esvaziar toda a sacola"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        ESVAZIAR CARRINHO
                      </button>
                    </div>

                    {cartItems.map((item) => (
                      <div
                        key={item.flavor.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 group hover:bg-white/[0.08] transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-display font-semibold text-white truncate">
                            {item.flavor.name}
                          </h4>
                          <p className="text-[10px] font-mono text-brand-beige/40 uppercase tracking-wider mt-0.5">
                            R$ 3,00 cada
                          </p>
                        </div>

                        {/* Item Quantity Incrementor */}
                        <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(item.flavor.id, item.quantity - 1)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70"
                            title="Remover um"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.flavor.id, item.quantity + 1)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70"
                            title="Adicionar mais um"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item subtotal & delete option */}
                        <div className="text-right flex items-center gap-3">
                          <span className="font-mono text-sm font-semibold">
                            R$ {(item.quantity * item.flavor.price).toFixed(2).replace('.', ',')}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.flavor.id)}
                            className="p-2 rounded-xl bg-white/5 opacity-40 hover:opacity-100 hover:bg-brand-terracotta/20 hover:text-brand-terracotta transition-all text-white/70"
                            title="Excluir item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <button
                        onClick={onClearCart}
                        className="text-[10px] font-mono text-brand-terracotta/65 hover:text-brand-terracotta hover:underline uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Limpar toda a sacola
                      </button>
                    </div>
                  </div>
                )}

                {/* DELIVERY INFO INPUT FIELDS (Spatial Form) */}
                {cartItems.length > 0 && (
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="text-xs font-mono text-brand-beige/40 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-terracotta" />
                      Dados de Entrega (Opcional)
                    </div>

                    {/* Name input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Qual seu nome?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>

                    {/* Address input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Endereço de entrega (Rua, Nº, Bairro)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>

                    {/* Payment selector */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-brand-beige/40 tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" />
                        Forma de Pagamento
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Pix', 'Dinheiro', 'Cartão'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`py-2 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                              paymentMethod === method
                                ? 'bg-brand-primary/20 border-brand-primary text-white font-semibold'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Footer: Total and Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 border-t border-white/10 bg-brand-dark3/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-brand-beige/50 uppercase block">Total Geral</span>
                      <span className="text-[10px] font-sans text-brand-beige/30 block mt-0.5">Sem taxa de entrega</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono font-bold text-white tracking-tight">
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-olive hover:bg-brand-olive/90 text-white font-display font-semibold transition-all duration-300 shadow-xl cursor-pointer glow-olive hover:scale-[1.01]"
                    id="whatsapp-checkout-btn"
                  >
                    <Send className="w-4 h-4" />
                    Finalizar pelo WhatsApp
                  </button>

                  <p className="text-[10px] text-center text-brand-beige/40 leading-relaxed max-w-xs mx-auto">
                    Ao finalizar, sua sacola será enviada formatada diretamente para o nosso atendimento pelo WhatsApp.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
