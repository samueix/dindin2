import { useState } from 'react';
import { FLAVORS } from '../data/flavors';
import { Flavor } from '../types';
import { Sparkles, Eye, ShoppingCart, ArrowUpRight } from 'lucide-react';

interface BentoGridProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onHoverFlavor: (flavor: Flavor | null) => void;
  onAddToOrder: (flavor: Flavor) => void;
}

function isColorDark(hex: string): boolean {
  const color = hex.replace('#', '');
  if (color.length === 3) {
    const r = parseInt(color[0] + color[0], 16);
    const g = parseInt(color[1] + color[1], 16);
    const b = parseInt(color[2] + color[2], 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 140;
  } else if (color.length === 6) {
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 140;
  }
  return true;
}

// Map each flavor ID to a specific bento grid layout size
// Since the user wants all cards to be uniform, we will use a consistent, elegant standard size.
const BENTO_SIZES: Record<string, string> = {};

export default function BentoGrid({ onSelectFlavor, onHoverFlavor, onAddToOrder }: BentoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories = ['Todos', 'Ninho', 'Especiais', 'Cremosos', 'Frutados'];

  const filteredFlavors = selectedCategory === 'Todos'
    ? FLAVORS
    : FLAVORS.filter(f => f.category === selectedCategory);

  return (
    <section id="sabores" className="relative max-w-7xl mx-auto px-6 py-24 z-10">
      
      {/* Background radial soft light */}
      <div className="absolute -top-12 left-1/4 -z-10 w-96 h-96 bg-brand-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-12 right-1/4 -z-10 w-96 h-96 bg-brand-terracotta/5 blur-3xl rounded-full" />

      {/* Title & Subtitle styled with high-contrast displays */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium text-xs text-brand-beige/80 mb-4 uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5 text-brand-terracotta animate-pulse-slow" />
          Coleção Artesanal
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4">
          Nossos Sabores <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-terracotta to-brand-olive">Gourmet</span>
        </h2>
        <p className="text-brand-beige/60 max-w-2xl mx-auto text-base md:text-lg font-sans">
          Uma seleção premium de ingredientes nobres, combinados em receitas autorais sob medida para o paladar mais exigente. All flavors are priced at <strong className="text-white">R$ 3,00</strong>.
        </p>
      </div>

      {/* Premium Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-12 max-w-lg mx-auto">
        <div className="flex p-1.5 rounded-2xl glass-premium w-full justify-between items-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                selectedCategory === category
                  ? 'bg-brand-primary text-white font-medium shadow-lg glow-brand'
                  : 'text-brand-beige/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFlavors.map((flavor) => {
          const gridClass = 'col-span-1 h-[255px]';
          const isLarge = false;
          const isHovered = hoveredCardId === flavor.id;

          return (
            <div
              key={flavor.id}
              className={`group relative ${gridClass} rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1.5`}
              onMouseEnter={() => {
                setHoveredCardId(flavor.id);
                onHoverFlavor(flavor);
              }}
              onMouseLeave={() => {
                setHoveredCardId(null);
                onHoverFlavor(null);
              }}
              onClick={() => onSelectFlavor(flavor)}
              style={isHovered ? {
                borderColor: flavor.color,
                boxShadow: `0 15px 30px -10px ${flavor.color}40`,
                background: `${flavor.color}18`
              } : {}}
              id={`bento-card-${flavor.id}`}
            >
              {/* Card glass background */}
              <div className="absolute inset-0 transition-all duration-500 glass-premium group-hover:bg-white/[0.07] group-hover:border-white/20" />

              {/* Individual Sabor custom glowing aura */}
              <div
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-45 transition-all duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${flavor.color} 0%, ${flavor.secondaryColor || flavor.color} 70%)`
                }}
              />

              {/* Inner ambient fluid bubble representing flavor texture */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                <div
                  className="absolute -right-4 top-1/4 w-32 h-32 rounded-full transition-all duration-700 animate-liquid-wobble"
                  style={{
                    backgroundColor: flavor.color,
                    filter: 'blur(10px)',
                    backgroundImage: flavor.secondaryColor 
                      ? `linear-gradient(45deg, ${flavor.color}, ${flavor.secondaryColor})`
                      : 'none'
                  }}
                />
              </div>

              {/* Dynamic light reflection following hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

              {/* Card Contents wrapper */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-lg border transition-all duration-300 text-[10px] font-mono uppercase tracking-widest bg-white/5 border-white/10 text-brand-beige/75">
                    {flavor.category}
                  </span>
                  
                  {flavor.isPopular && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 text-[10px] font-mono uppercase tracking-widest bg-brand-terracotta/20 border-brand-terracotta/30 text-brand-beige">
                      <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full animate-ping" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Flavor visuals (different style depending on card size) */}
                {isLarge ? (
                  <div className="my-auto flex flex-col items-center justify-center text-center py-6">
                    {/* Premium Minimalist Liquid-Glass Dindin Capsule */}
                    <div className="relative w-16 h-36 rounded-full border border-white/10 shadow-xl overflow-hidden bg-white/5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 flex flex-col justify-between p-1">
                      {/* Top glossy highlight */}
                      <div className="w-full h-1/2 rounded-t-full bg-gradient-to-b from-white/10 to-transparent" />
                      {/* Liquid flavor core inside */}
                      <div 
                        className="w-full h-2/3 rounded-b-3xl mt-auto transition-all duration-500 opacity-70"
                        style={{
                          background: `linear-gradient(to top, ${flavor.color}, ${flavor.secondaryColor || flavor.color}80)`
                        }}
                      />
                      {/* Minimalist central sparkle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white/35 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Small cards get a mini abstract light orb on the right side
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none rounded-full flex items-center justify-center transition-all duration-300 opacity-40 group-hover:opacity-75">
                    <div 
                      className="w-12 h-12 rounded-full filter blur-md animate-pulse"
                      style={{
                        backgroundColor: flavor.color,
                        boxShadow: `0 0 20px ${flavor.color}`
                      }}
                    />
                  </div>
                )}

                {/* Footer text of card */}
                <div className="relative">
                  <p className="text-[10px] font-mono tracking-wider mb-1 uppercase text-brand-beige/50">
                    Artesanal Gourmet
                  </p>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-beige/70 transition-colors duration-300">
                    {flavor.name}
                  </h3>
                  
                  {isLarge && (
                    <p className="text-xs font-sans line-clamp-2 mb-4 leading-relaxed max-w-sm text-brand-beige/60">
                      {flavor.tagline}
                    </p>
                  )}

                  {/* Pricing and CTA details */}
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] font-mono text-brand-beige/50">R$</span>
                      <span className="text-lg font-mono font-bold text-white">3,00</span>
                      <span className="text-[10px] font-sans text-brand-beige/40">/unid</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToOrder(flavor);
                        }}
                        className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary text-brand-beige hover:text-white transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer hover:scale-105"
                        title="Adicionar ao pedido"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      
                      <div className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 text-brand-beige/50 group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
