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

async function fetchHero(): Promise<Hero> {
  const res = await fetch(HERO_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo cargar el hero.`);
  }

  const json: StrapiSingleResponse<Hero> = await res.json();
  return json.data;
}

async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const res = await fetch(HERO_SLIDES_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudieron cargar las slides del carousel.`);
  }

  const json: StrapiListResponse<HeroSlide> = await res.json();
  return json.data ?? [];
}

export function useHero() {
  const heroQuery = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 5 * 60_000,
  });

  const slidesQuery = useQuery({
    queryKey: ["hero-slides"],
    queryFn: fetchHeroSlides,
    staleTime: 5 * 60_000,
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
