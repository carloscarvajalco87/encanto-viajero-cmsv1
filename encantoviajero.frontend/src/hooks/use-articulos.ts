// src/hooks/use-articulos.ts
import { useQuery } from "@tanstack/react-query";
import { ARTICULOS_ENDPOINT, mapArticuloToExperiencia } from "@/lib/strapi";
import type { Articulo, StrapiListResponse } from "@/types/articulo";

async function fetchArticulos(): Promise<Articulo[]> {
  const res = await fetch(ARTICULOS_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudieron cargar los artículos.`);
  }

  const json: StrapiListResponse<Articulo> = await res.json();
  return json.data ?? [];
}

export function useArticulos() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: fetchArticulos,
    staleTime: 60_000,
  });

  return {
    experiencias: (query.data ?? []).map(mapArticuloToExperiencia),
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
