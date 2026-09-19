// src/types/strapi.ts
// Tipos genéricos y compartidos para las respuestas REST de Strapi v5.

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
  /** Versiones redimensionadas que Strapi genera al subir una imagen. */
  formats?: StrapiMediaFormats | null;
}

export type StrapiMediaFormatName = "thumbnail" | "small" | "medium" | "large";

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export type StrapiMediaFormats = Partial<Record<StrapiMediaFormatName, StrapiMediaFormat>>;

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

/** Los Single Types devuelven `data` como objeto, no como array. */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}
