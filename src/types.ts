export interface Flavor {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  texture: string;
  color: string; // Hex color or gradient representing the dindin liquid
  secondaryColor?: string; // For swirl effects
  accentColor: string; // High-contrast text/glow color (e.g. olive green or terracotta)
  tagline: string;
  isPopular?: boolean;
  imageSeed: string; // Seed for picsum or custom generated illustration
  category: 'Frutados' | 'Cremosos' | 'Especiais' | 'Ninho';
}

export interface CartItem {
  flavor: Flavor;
  quantity: number;
}
