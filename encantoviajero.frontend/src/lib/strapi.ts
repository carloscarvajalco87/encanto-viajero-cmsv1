// src/lib/strapi.ts
import type { Articulo } from "@/types/articulo";
import type { StrapiMedia, StrapiMediaFormatName } from "@/types/strapi";
import { richTextToExcerpt } from "./rich-text";

// Vite (y por lo tanto TanStack Start) inyecta automáticamente las
// variables que empiecen con VITE_. Definila en tu archivo .env:
//   VITE_STRAPI_URL=http://localhost:1337
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

export const ARTICULOS_ENDPOINT = `${STRAPI_URL}/api/products?populate=*`;

/** Convierte una URL relativa de Strapi (/uploads/xxx.jpg) en una absoluta. */
export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "/placeholder-articulo.jpg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export interface StrapiImageSources {
  src: string;
  srcSet?: string;
}

/**
 * Arma `src` + `srcSet` a partir de los formatos redimensionados que Strapi
 * genera (small/medium/large) más el original, para que el navegador descargue
 * solo el tamaño que necesita en vez del archivo completo. `preferred` define
 * el `src` de respaldo para navegadores que ignoran `srcSet`.
 */
export function getStrapiImageSources(
  media: StrapiMedia | null | undefined,
  preferred: StrapiMediaFormatName = "medium",
): StrapiImageSources {
  if (!media?.url) return { src: getStrapiMediaUrl(null) };

  const candidates: { url: string; width: number }[] = [];
  for (const [name, format] of Object.entries(media.formats ?? {})) {
    // El thumbnail (~245px) es demasiado chico para servir de imagen principal.
    if (name !== "thumbnail" && format) candidates.push(format);
  }
  if (media.width) candidates.push({ url: media.url, width: media.width });

  const srcSet = candidates
    .sort((a, b) => a.width - b.width)
    .map((c) => `${getStrapiMediaUrl(c.url)} ${c.width}w`)
    .join(", ");

  const src = getStrapiMediaUrl(media.formats?.[preferred]?.url ?? media.url);
  return srcSet ? { src, srcSet } : { src };
}

/**
 * Forma de datos que ya consume el componente <Experiencias />.
 * La mantenemos igual para no tocar el JSX/diseño existente —
 * solo cambia de dónde sale la data.
 */
export interface Experiencia {
  id: number;
  img: string;
  alt: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  duracion: string;
  lugar: string;
  grupo: string;
  precio: number;
  cupos: string;
  notas: string;
  notasPrecio: string;
}

/** Adapta un Articulo de Strapi a la forma que espera la UI. */
export function mapArticuloToExperiencia(articulo: Articulo): Experiencia {
  return {
    id: articulo.id,
    img: getStrapiMediaUrl(articulo.image?.url),
    alt: articulo.image?.alternativeText ?? articulo.title,
    etiqueta: articulo.tag,
    titulo: articulo.title,
    texto: richTextToExcerpt(articulo.description, 140),
    duracion: articulo.duration ,
    lugar: articulo.location,
    grupo: articulo.capacity,
    precio: articulo.price,
    cupos: articulo.availableSpots,
    notasPrecio: articulo.priceNote,
    notas: articulo.notes,
  };
}
