// src/lib/navegacion.ts
import { STRAPI_URL } from "@/lib/strapi";
import type { MenuItem } from "@/lib/site";
import type { Navigation } from "@/types/navigation";

// `submenu` es un component anidado dentro de otro component: populate=*
// no lo trae, hace falta el populate explícito y anidado.
export const NAVEGACION_ENDPOINT = `${STRAPI_URL}/api/navigation?populate[items][populate]=submenu`;

/** Adapta el Single Type de Strapi a la forma que ya espera <SiteHeader />. */
export function mapNavegacionToMenu(navigation: Navigation): MenuItem[] {
  return navigation.items.map((item) => ({
    label: item.label,
    href: item.href,
    ...(item.submenu.length > 0
      ? {
          submenu: item.submenu.map((sub) => ({
            label: sub.label,
            href: sub.href,
            ...(sub.description ? { description: sub.description } : {}),
          })),
        }
      : {}),
  }));
}
