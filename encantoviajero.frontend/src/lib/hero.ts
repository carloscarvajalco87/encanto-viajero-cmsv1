// src/lib/hero.ts
import { getStrapiMediaUrl, STRAPI_URL } from "@/lib/strapi";
import type { Hero, HeroSlide, TrustIcon } from "@/types/hero";

// `trustItems` es un component repetible de primer nivel (no está anidado
// dentro de otro component), así que populate=* alcanza para traerlo junto
// con backgroundImage.
export const HERO_ENDPOINT = `${STRAPI_URL}/api/hero?populate=*`;

// Se ordenan por el campo `order` para controlar qué slide aparece primero.
export const HERO_SLIDES_ENDPOINT = `${STRAPI_URL}/api/hero-slides?sort=order:asc&populate=*`;

export type HeroBackground =
  | { type: "image"; url: string }
  | { type: "color"; color: string }
  | { type: "gradient"; from: string; to: string };

export interface HeroTrustItemView {
  icon: TrustIcon;
  label: string;
}

export interface HeroContent {
  badgeLabel: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonMessage: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  carouselLabel: string;
  background: HeroBackground;
  trustItems: HeroTrustItemView[];
}

export interface HeroSlideView {
  id: number;
  image: string;
  alt: string;
  departureTime?: string;
  location?: string;
  dates?: string;
}

/**
 * Resuelve el fondo elegido en Strapi (`backgroundType`) a un valor
 * concreto. Si el tipo elegido no tiene los datos que necesita (ej.
 * backgroundType="image" pero no se subió ninguna imagen), cae a un
 * color sólido en vez de romper el render.
 */
function resolveBackground(hero: Hero): HeroBackground {
  if (hero.backgroundType === "image" && hero.backgroundImage) {
    return { type: "image", url: getStrapiMediaUrl(hero.backgroundImage.url) };
  }

  if (hero.backgroundType === "gradient" && hero.gradientFrom && hero.gradientTo) {
    return { type: "gradient", from: hero.gradientFrom, to: hero.gradientTo };
  }

  if (hero.backgroundType === "color" && hero.backgroundColor) {
    return { type: "color", color: hero.backgroundColor };
  }

  return { type: "color", color: "#0f3d2e" };
}

export function mapHeroToContent(hero: Hero): HeroContent {
  return {
    badgeLabel: hero.badgeLabel,
    title: hero.title,
    description: hero.description,
    primaryButtonLabel: hero.primaryButtonLabel,
    primaryButtonMessage: hero.primaryButtonMessage,
    secondaryButtonLabel: hero.secondaryButtonLabel,
    secondaryButtonHref: hero.secondaryButtonHref,
    carouselLabel: hero.carouselLabel,
    background: resolveBackground(hero),
    trustItems: hero.trustItems.map((item) => ({ icon: item.icon, label: item.label })),
  };
}

export function mapHeroSlide(slide: HeroSlide): HeroSlideView {
  return {
    id: slide.id,
    image: getStrapiMediaUrl(slide.image?.url),
    alt: slide.imageAlt ?? slide.image?.alternativeText ?? "",
    ...(slide.departureTime ? { departureTime: slide.departureTime } : {}),
    ...(slide.location ? { location: slide.location } : {}),
    ...(slide.dates ? { dates: slide.dates } : {}),
  };
}
