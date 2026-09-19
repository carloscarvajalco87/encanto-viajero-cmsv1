// src/hooks/use-hero.ts
import { useQuery } from "@tanstack/react-query";
import {
  HERO_ENDPOINT,
  HERO_SLIDES_ENDPOINT,
  mapHeroSlide,
  mapHeroToContent,
} from "@/lib/hero";
import { HERO_FALLBACK, HERO_SLIDES_FALLBACK } from "@/lib/hero-fallback";
import type { Hero, HeroSlide } from "@/types/hero";
import type { StrapiListResponse, StrapiSingleResponse } from "@/types/strapi";

// Tope de espera para que un Strapi lento no bloquee el render en el servidor.
const FETCH_TIMEOUT_MS = 4000;

export async function fetchHero(): Promise<Hero> {
  const res = await fetch(HERO_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo cargar el hero.`);
  }

  const json: StrapiSingleResponse<Hero> = await res.json();
  return json.data;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const res = await fetch(HERO_SLIDES_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudieron cargar las slides del carousel.`);
  }

  const json: StrapiListResponse<HeroSlide> = await res.json();
  return json.data ?? [];
}

// Datos precargados por el loader de la ruta, para que el SSR ya incluya el hero
// (y su <h1>) en el HTML inicial. Cada campo es undefined si su fetch falló.
export type HeroInitialData = {
  hero?: Hero | undefined;
  slides?: HeroSlide[] | undefined;
};

export function useHero(initialData?: HeroInitialData) {
  const heroQuery = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 5 * 60_000,
    initialData: initialData?.hero,
  });

  const slidesQuery = useQuery({
    queryKey: ["hero-slides"],
    queryFn: fetchHeroSlides,
    staleTime: 5 * 60_000,
    initialData: initialData?.slides,
  });

  // El hero es lo primero que se ve del sitio: mientras carga, o si algo
  // falla, se muestra el contenido de respaldo en vez de dejarlo vacío.
  const content = heroQuery.data ? mapHeroToContent(heroQuery.data) : HERO_FALLBACK;
  const slides =
    slidesQuery.data && slidesQuery.data.length > 0
      ? slidesQuery.data.map(mapHeroSlide)
      : HERO_SLIDES_FALLBACK;

  return {
    content,
    slides,
    isLoading: heroQuery.isLoading || slidesQuery.isLoading,
    isError: heroQuery.isError || slidesQuery.isError,
  };
}
