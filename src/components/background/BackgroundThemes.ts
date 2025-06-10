
export interface Theme {
  particleCount: number;
  particleTypes: readonly ('cosmic' | 'stream' | 'network' | 'floating')[];
  colors: string[];
  speed: number;
  size: { min: number; max: number };
  opacity: { min: number; max: number };
  gradient: string;
}

export const backgroundThemes: Record<string, Theme> = {
  hero: {
    particleCount: 120,
    particleTypes: ['cosmic', 'stream', 'network', 'floating'] as const,
    colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'],
    speed: 0.8,
    size: { min: 2, max: 6 },
    opacity: { min: 0.1, max: 0.8 },
    gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)'
  },
  chaos: {
    particleCount: 100,
    particleTypes: ['network', 'stream'] as const,
    colors: ['#EF4444', '#F97316', '#EAB308'],
    speed: 1.2,
    size: { min: 1, max: 4 },
    opacity: { min: 0.2, max: 0.7 },
    gradient: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.1) 0%, rgba(245, 101, 101, 0.08) 50%, transparent 70%)'
  },
  solution: {
    particleCount: 80,
    particleTypes: ['floating', 'cosmic'] as const,
    colors: ['#10B981', '#059669', '#047857'],
    speed: 0.6,
    size: { min: 2, max: 5 },
    opacity: { min: 0.15, max: 0.6 },
    gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)'
  },
  modular: {
    particleCount: 90,
    particleTypes: ['network', 'floating'] as const,
    colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
    speed: 0.7,
    size: { min: 1, max: 4 },
    opacity: { min: 0.1, max: 0.6 },
    gradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, rgba(29, 78, 216, 0.08) 50%, transparent 70%)'
  },
  works: {
    particleCount: 85,
    particleTypes: ['stream', 'cosmic'] as const,
    colors: ['#F59E0B', '#D97706', '#B45309'],
    speed: 0.9,
    size: { min: 2, max: 5 },
    opacity: { min: 0.15, max: 0.7 },
    gradient: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)'
  },
  innovation: {
    particleCount: 110,
    particleTypes: ['cosmic', 'floating', 'stream'] as const,
    colors: ['#EC4899', '#BE185D', '#9D174D'],
    speed: 1.0,
    size: { min: 2, max: 6 },
    opacity: { min: 0.2, max: 0.8 },
    gradient: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, rgba(190, 24, 93, 0.1) 50%, transparent 70%)'
  },
  testimonials: {
    particleCount: 70,
    particleTypes: ['floating', 'network'] as const,
    colors: ['#8B5CF6', '#7C3AED', '#6D28D9'],
    speed: 0.5,
    size: { min: 1, max: 3 },
    opacity: { min: 0.1, max: 0.5 },
    gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.06) 50%, transparent 70%)'
  },
  teams: {
    particleCount: 95,
    particleTypes: ['network', 'stream'] as const,
    colors: ['#06B6D4', '#0891B2', '#0E7490'],
    speed: 0.8,
    size: { min: 2, max: 4 },
    opacity: { min: 0.15, max: 0.6 },
    gradient: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12) 0%, rgba(8, 145, 178, 0.08) 50%, transparent 70%)'
  },
  global: {
    particleCount: 100,
    particleTypes: ['cosmic', 'floating'] as const,
    colors: ['#10B981', '#059669', '#047857'],
    speed: 0.7,
    size: { min: 2, max: 5 },
    opacity: { min: 0.15, max: 0.7 },
    gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)'
  },
  cta: {
    particleCount: 120,
    particleTypes: ['cosmic', 'stream', 'network'] as const,
    colors: ['#8B5CF6', '#EC4899', '#3B82F6'],
    speed: 1.1,
    size: { min: 2, max: 6 },
    opacity: { min: 0.2, max: 0.9 },
    gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)'
  }
};
