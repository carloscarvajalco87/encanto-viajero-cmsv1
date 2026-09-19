// src/types/hero.ts
import type { StrapiMedia } from "@/types/strapi";

export type TrustIcon = "shield" | "star" | "users";

/** Component `hero.trust-item` (repetible, dentro del Single Type Hero). */
export interface TrustItemData {
  id: number;
  icon: TrustIcon;
  label: string;
}

export type HeroBackgroundType = "image" | "color" | "gradient";

/** Single Type `hero`. */
export interface Hero {
  id: number;
  documentId: string;
  badgeLabel: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonMessage: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  carouselLabel: string;
  backgroundType: HeroBackgroundType;
  /** Solo se usa cuando backgroundType = "image". */
  backgroundImage: StrapiMedia | null;
  /**
   * Versión vertical para pantallas móviles. Opcional: si no se sube, en móvil
   * se usa `backgroundImage`. Puede faltar en la respuesta si el backend aún
   * no tiene el campo.
   */
  backgroundImageMobile?: StrapiMedia | null;
  /** Hex, ej. "#0f3d2e". Solo se usa cuando backgroundType = "color". */
  backgroundColor: string | null;
  /** Hex. Solo se usan cuando backgroundType = "gradient". */
  gradientFrom: string | null;
  gradientTo: string | null;
  trustItems: TrustItemData[];
}

/** Collection Type `hero-slide`: cada entrada es una tarjeta del carousel. */
export interface HeroSlide {
  id: number;
  documentId: string;
  image: StrapiMedia | null;
  imageAlt: string | null;
  departureTime: string | null;
  location: string | null;
  dates: string | null;
  /** Controla el orden de aparición (se ordena vía ?sort=order:asc). */
  order: number | null;
}
