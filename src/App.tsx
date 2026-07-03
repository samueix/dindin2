import { useEffect, useState } from 'react';
import { FLAVORS } from './data/flavors';
import { CartItem, Flavor } from './types';
import BentoGrid from './components/BentoGrid';
import FlavorModal from './components/FlavorModal';
import Cart from './components/Cart';
import { 
  Sparkles, 
  ChevronDown, 
  Instagram, 
  Phone, 
  Award, 
  Zap, 
  RotateCcw, 
  CheckCircle, 
  TrendingUp, 
  Truck, 
  Heart,
  ShoppingCart
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredFlavor, setHoveredFlavor] = useState<Flavor | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Core cursor-follow logic for high-end Liquid Glass reflections
  useEffect(() => {
    const updateMouseCoords = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateMouseCoords);
    return () => window.removeEventListener('mousemove', updateMouseCoords);
  }, []);

  // 2. Performant Scroll tracking using passive event listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress(currentScroll / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dindins_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Erro ao carregar o carrinho do localStorage:', err);
    }
  }, []);

  // 4. Save cart items to localStorage on modification
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('dindins_cart', JSON.stringify(items));
    } catch (err) {
      console.error('Erro ao salvar o carrinho no localStorage:', err);
    }
  };

  // Cart modifiers
  const handleAddToOrder = (flavor: Flavor, qty: number = 1) => {
    const existing = cartItems.find((item) => item.flavor.id === flavor.id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item.flavor.id === flavor.id 
          ? { ...item, quantity: item.quantity + qty } 
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { flavor, quantity: qty }]);
    }
  };

  const handleUpdateQuantity = (flavorId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(flavorId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.flavor.id === flavorId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (flavorId: string) => {
    const filtered = cartItems.filter((item) => item.flavor.id !== flavorId);
    saveCart(filtered);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark3 text-brand-beige overflow-x-hidden font-sans mouse-glow-bg select-none">
      
      {/* FLOATING HEADER NAVIGATION */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-3 rounded-2xl glass-premium pointer-events-auto">
          {/* Logo element resembling a high-tech modern startup */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-terracotta flex items-center justify-center shadow-md text-white">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2"
              >
                {/* Tied top plastic knot */}
                <path d="M12 7c-0.8-1.2-1.2-2.2-0.4-2.8s1.6 0.8 0.8 2z" fill="currentColor" fillOpacity="0.3" />
                <path d="M12 7c0.8-1.2 1.2-2.2 0.4-2.8s-1.6 0.8-0.8 2z" fill="currentColor" fillOpacity="0.3" />
                {/* Tight knot loop */}
                <circle cx="12" cy="7" r="1" fill="currentColor" />
                {/* The dindin bag body */}
                <rect x="8.5" y="8.5" width="7" height="12.5" rx="3.5" fill="currentColor" fillOpacity="0.15" />
                {/* Content line inside dindin */}
                <path d="M8.5 13c1-0.6 2-0.6 3 0s2 0.6 3 0v4.5c0 1.9-1.6 3.5-3.5 3.5h0C9.6 21 8.5 19.4 8.5 17.5v-4.5z" fill="currentColor" fillOpacity="0.5" stroke="none" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-white block">Dindin's</span>
              <span className="font-mono text-[9px] tracking-widest text-brand-beige/50 uppercase block -mt-0.5">Gourmet</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('sabores')}
              className="text-xs font-mono tracking-wider uppercase text-brand-beige/70 hover:text-white transition-colors cursor-pointer"
            >
              Sabores
            </button>
            <button 
              onClick={() => scrollToSection('diferenciais')}
              className="text-xs font-mono tracking-wider uppercase text-brand-beige/70 hover:text-white transition-colors cursor-pointer"
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('revenda')}
              className="text-xs font-mono tracking-wider uppercase text-brand-beige/70 hover:text-white transition-colors cursor-pointer"
            >
              Revenda & Eventos
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollToSection('sabores')}
              className="hidden sm:inline-block px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider uppercase text-white transition-all cursor-pointer"
            >
              Ver Cardápio
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-xs font-mono font-bold tracking-wider uppercase text-white transition-all cursor-pointer flex items-center gap-2 shadow-md hover:scale-[1.02] border border-brand-primary/20 glow-brand"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Carrinho ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section 
        id="hero"
        className="relative h-screen flex items-center justify-start px-6 md:px-16 z-10 overflow-hidden"
      >
        {/* Soft elegant gradient blur in the background */}
        <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-brand-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 -z-10 w-96 h-96 bg-brand-terracotta/10 blur-3xl rounded-full" />

        <div className="max-w-4xl w-full">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium text-[11px] text-brand-beige/80 mb-6 uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            Experiência Gelada Ultra-Premium
          </div>

          {/* Huge Display Typography - Apple / Stripe style */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight text-white mb-6 leading-[0.9]">
            Dindin's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-terracotta to-brand-olive">
              Gourmet.
            </span>
          </h1>

          <p className="text-brand-beige/70 max-w-lg text-base md:text-lg mb-8 leading-relaxed font-sans">
            O melhor dindin gourmet da cidade por apenas <strong className="text-white text-xl font-mono">R$ 3,00</strong>. Receitas exclusivas elaboradas com ingredientes nobres para redefinir o seu paladar.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => scrollToSection('sabores')}
              className="px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primary/95 text-white font-display font-bold transition-all duration-300 shadow-xl cursor-pointer hover:scale-102 glow-brand text-center flex items-center justify-center gap-2 border border-brand-primary/30"
              id="hero-choose-flavors-btn"
            >
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              Escolher Sabores (Ver Cardápio)
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-display font-medium transition-all duration-300 text-center cursor-pointer"
            >
              Conhecer Diferenciais
            </button>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => scrollToSection('diferenciais')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-beige/40 hover:text-white transition-colors cursor-pointer z-10"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Desça para Explorar</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* --- DIFERENCIAIS SECTION (SCROLL ACCOMPANIMENT AREA) --- */}
      <section 
        id="diferenciais"
        className="relative max-w-7xl mx-auto px-6 py-28 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3 py-1.5 rounded-full bg-brand-olive/10 border border-brand-olive/20 text-xs font-mono text-brand-olive uppercase tracking-widest">
              Nível Awwwards de Qualidade
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              A sofisticação de uma startup. <br />
              O sabor autêntico do artesanal.
            </h2>
            <p className="text-brand-beige/70 font-sans text-sm md:text-base leading-relaxed">
              Desenvolvemos nossos dindins gourmet seguindo padrões rigorosos de gastronomia molecular e culinária clássica. Cada sabor é um projeto exclusivo de texturas e notas sensoriais equilibradas.
            </p>

            {/* List of high-end value props */}
            <div className="space-y-4 pt-4">
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-brand-terracotta mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-display font-semibold text-white">Sem Cristais de Gelo</h4>
                  <p className="text-xs text-brand-beige/65 mt-1 leading-relaxed">
                    Nossa técnica de congelamento ultra-rápido garante uma cremosidade absoluta e zero pedaços de gelo na sua mordida.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-brand-primary mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-display font-semibold text-white">Ingredientes Nobres</h4>
                  <p className="text-xs text-brand-beige/65 mt-1 leading-relaxed">
                    Leite Ninho genuíno, chocolate belga meio amargo e frutas frescas rigorosamente higienizadas em nosso laboratório culinário.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-brand-olive mt-0.5">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-display font-semibold text-white">Custo Único R$ 3,00</h4>
                  <p className="text-xs text-brand-beige/65 mt-1 leading-relaxed">
                    Democratizamos o acesso à alta confeitaria gelada. Preço unificado para que você explore toda a nossa paleta gastronômica sem preocupações.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Decorative glass display container on the right (perfect frame for 3D dindin traversal) */}
          <div className="lg:col-span-6 h-[400px] rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-700">
            {/* Liquid mesh overlay */}
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-primary/10 rounded-full filter blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-beige/40">Lab Specs</span>
              <CheckCircle className="w-5 h-5 text-brand-olive" />
            </div>

            <div className="space-y-4 max-w-sm mt-auto z-10">
              <span className="text-xs font-mono text-brand-terracotta uppercase tracking-wider block">Estilo Liquid Glass</span>
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                Embalagem hermética, segura e higiênica.
              </h3>
              <p className="text-xs text-brand-beige/60 leading-relaxed">
                Nossos sacolés passam por processos automatizados de envase e selagem hermética, eliminando qualquer contato manual pós-preparação. Higiene cirúrgica para sua segurança.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- FLAVORS BENTO GRID SECTION --- */}
      <BentoGrid
        onSelectFlavor={(flavor) => setSelectedFlavor(flavor)}
        onHoverFlavor={(flavor) => setHoveredFlavor(flavor)}
        onAddToOrder={(flavor) => handleAddToOrder(flavor, 1)}
      />

      {/* --- REVENDA & EVENTOS SECTION --- */}
      <section 
        id="revenda"
        className="relative max-w-7xl mx-auto px-6 py-24 z-10"
      >
        <div className="p-8 md:p-16 rounded-[48px] glass-liquid border border-white/15 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Glow spots */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-olive/10 blur-3xl rounded-full" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-primary/10 blur-3xl rounded-full" />

          {/* Left Column Text */}
          <div className="lg:max-w-xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-terracotta/20 border border-brand-terracotta/30 text-xs font-mono text-white uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5 text-brand-terracotta" />
              Oportunidade Comercial
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
              Trabalhamos com Revenda & Eventos.
            </h2>
            <p className="text-brand-beige/80 font-sans text-sm md:text-base leading-relaxed">
              Leve o dindin gourmet número 1 para o seu comércio, aniversário, casamento ou evento corporativo. Oferecemos condições especiais em lotes fechados com embalagens exclusivas e logística refrigerada.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <h5 className="font-display font-semibold text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-olive" />
                  Logística
                </h5>
                <p className="text-xs text-brand-beige/60 mt-1">Entrega térmica para preservar a consistência perfeita.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <h5 className="font-display font-semibold text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-terracotta" />
                  Personalização
                </h5>
                <p className="text-xs text-brand-beige/60 mt-1">Tags e rótulos personalizados sob medida para sua festa.</p>
              </div>
            </div>
          </div>

          {/* Right Column Action Card */}
          <div className="w-full lg:max-w-sm p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between relative z-10">
            <h3 className="text-xl font-display font-bold text-white mb-2">Solicitar Orçamento</h3>
            <p className="text-xs text-brand-beige/65 mb-6">Fale com o nosso gerente comercial de atacado agora mesmo.</p>
            
            <a
              href="https://api.whatsapp.com/send?phone=5585985110225&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20lote%20de%20revenda%20ou%20evento%20com%20Dindin's%20Gourmet."
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-olive hover:bg-brand-olive/90 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer glow-olive text-center"
              id="reseller-order-whatsapp-btn"
            >
              Falar no WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="relative bg-brand-dark3 border-t border-white/10 z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-terracotta flex items-center justify-center shadow-md text-white">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2"
                >
                  {/* Tied top plastic knot */}
                  <path d="M12 7c-0.8-1.2-1.2-2.2-0.4-2.8s1.6 0.8 0.8 2z" fill="currentColor" fillOpacity="0.3" />
                  <path d="M12 7c0.8-1.2 1.2-2.2 0.4-2.8s-1.6 0.8-0.8 2z" fill="currentColor" fillOpacity="0.3" />
                  {/* Tight knot loop */}
                  <circle cx="12" cy="7" r="1" fill="currentColor" />
                  {/* The dindin bag body */}
                  <rect x="8.5" y="8.5" width="7" height="12.5" rx="3.5" fill="currentColor" fillOpacity="0.15" />
                  {/* Content line inside dindin */}
                  <path d="M8.5 13c1-0.6 2-0.6 3 0s2 0.6 3 0v4.5c0 1.9-1.6 3.5-3.5 3.5h0C9.6 21 8.5 19.4 8.5 17.5v-4.5z" fill="currentColor" fillOpacity="0.5" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-tight text-white block">Dindin's</span>
                <span className="font-mono text-[9px] tracking-widest text-brand-beige/50 uppercase block -mt-0.5">Gourmet</span>
              </div>
            </div>
            <p className="text-xs text-brand-beige/50 leading-relaxed max-w-xs">
              A revolução do dindin gourmet artesanal. Qualidade premium, texturas aveludadas e sabores exuberantes por um preço único e justo de R$ 3,00.
            </p>
          </div>

          {/* Col 2 Contatos */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige/45">Atendimento</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2 text-brand-beige/80">
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>+55 (85) 98511-0225</span>
              </li>
              <li className="flex items-center gap-2 text-brand-beige/80">
                <Instagram className="w-4 h-4 text-brand-terracotta" />
                <a href="https://instagram.com/dindinsgourmet" target="_blank" rel="noreferrer" className="hover:underline">
                  @dindinsgourmet
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 Parceria */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige/45">Revenda</h4>
            <p className="text-xs text-brand-beige/60 leading-relaxed max-w-xs">
              Trabalhamos com revenda para lanchonetes, padarias, mercantis e autônomos. Entre em contato para saber mais sobre as nossas caixas térmicas com desconto de atacado.
            </p>
          </div>

          {/* Col 4 Informações Adicionais */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige/45">Aviso</h4>
            <p className="text-xs text-brand-beige/45 leading-relaxed">
              Todos os direitos reservados &copy; 2026 Dindin's Gourmet Ltda. <br />
              Feito com excelência e carinho artesanal. Fortaleza - CE.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-brand-beige/30 uppercase tracking-widest">
          <span>&copy; 2026 Dindin's Gourmet</span>
          <span>Awwwards Premium Design Craft</span>
        </div>
      </footer>

      {/* --- DETAILS MODAL CONTROLLER --- */}
      <AnimatePresence>
        {selectedFlavor && (
          <FlavorModal
            flavor={selectedFlavor}
            onClose={() => setSelectedFlavor(null)}
            onAddToOrder={handleAddToOrder}
          />
        )}
      </AnimatePresence>

      {/* --- FLOATING CART DRAWER CONTROLLER --- */}
      <Cart
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />

    </div>
  );
}
