// src/lib/hero.ts
import { getStrapiImageSources, STRAPI_URL } from "@/lib/strapi";
import type { Hero, HeroSlide, TrustIcon } from "@/types/hero";

// `trustItems` es un component repetible de primer nivel (no está anidado
// dentro de otro component), así que populate=* alcanza para traerlo junto
// con backgroundImage.
export const HERO_ENDPOINT = `${STRAPI_URL}/api/hero?populate=*`;

// Se ordenan por el campo `order` para controlar qué slide aparece primero.
export const HERO_SLIDES_ENDPOINT = `${STRAPI_URL}/api/hero-slides?sort=order:asc&populate=*`;

export type HeroBackground =
  | {
      type: "image";
      url: string;
      srcSet?: string;
      /** Imagen vertical alternativa para pantallas móviles (dirección de arte). */
      mobile?: { url: string; srcSet?: string };
    }
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
  srcSet?: string;
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
    const { src, srcSet } = getStrapiImageSources(hero.backgroundImage, "large");
    const mobile = hero.backgroundImageMobile
      ? getStrapiImageSources(hero.backgroundImageMobile, "medium")
      : null;
    return {
      type: "image",
      url: src,
      ...(srcSet ? { srcSet } : {}),
      ...(mobile
        ? { mobile: { url: mobile.src, ...(mobile.srcSet ? { srcSet: mobile.srcSet } : {}) } }
        : {}),
    };
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
  const { src, srcSet } = getStrapiImageSources(slide.image);
  return {
    id: slide.id,
    image: src,
    ...(srcSet ? { srcSet } : {}),
    alt: slide.imageAlt ?? slide.image?.alternativeText ?? "",
    ...(slide.departureTime ? { departureTime: slide.departureTime } : {}),
    ...(slide.location ? { location: slide.location } : {}),
    ...(slide.dates ? { dates: slide.dates } : {}),
  };
}
