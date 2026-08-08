// src/types/navigation.ts

/**
 * Component `menu.submenu-item` tal como lo devuelve Strapi v5.
 * Los components (igual que los documentos) vienen "planos", sin
 * `attributes` anidado.
 */
export interface SubmenuItemData {
  id: number;
  label: string;
  href: string;
  description: string | null;
}

/** Component `menu.nav-item`. `submenu` es un component repetible. */
export interface NavItemData {
  id: number;
  label: string;
  href: string;
  submenu: SubmenuItemData[];
}

/** Single Type `navigation`. */
export interface Navigation {
  id: number;
  documentId: string;
  items: NavItemData[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/** Los Single Types devuelven `data` como objeto, no como array. */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}
