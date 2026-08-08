// src/types/articulo.ts
import type { RichTextContent } from "@/lib/rich-text";
/**
 * Media de Strapi v5: en v5 los campos de medios vienen "planos"
 * (ya no hay `data.attributes` anidado como en v4).
 */
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

/**
 * Documento "articulo" tal como lo devuelve Strapi v5.
 *
 * ⚠️ Ajustá estos nombres de campo si tu content-type en Strapi
 * usa otros nombres — es el único lugar que necesita cambiar.
 */
export interface Articulo {
  id: number;
  documentId: string;
  title: string;
  description: RichTextContent;
  tag: string;
  duration: string;
  location: string;
  capacity: string;
  price: string;
  notes: string;
  priceNote: string;
  availableSpots: string;
  image: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
