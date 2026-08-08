// src/hooks/use-navigation.ts
import { useQuery } from "@tanstack/react-query";
import { NAVEGACION_ENDPOINT, mapNavegacionToMenu } from "@/lib/navigation";
import { NAV_FALLBACK } from "@/lib/site";
import type { Navigation, StrapiSingleResponse } from "@/types/navigation";

async function fetchNavegacion(): Promise<Navigation> {
  const res = await fetch(NAVEGACION_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo cargar la navegación.`);
  }

  const json: StrapiSingleResponse<Navigation> = await res.json();
  return json.data;
}

export function useNavigation() {
  const query = useQuery({
    queryKey: ["navigation"],
    queryFn: fetchNavegacion,
    staleTime: 5 * 60_000,
  });

  // Mientras carga, o si falla, el header muestra el menú de respaldo
  // en vez de quedar vacío o roto.
  const items = query.data ? mapNavegacionToMenu(query.data) : NAV_FALLBACK;

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
