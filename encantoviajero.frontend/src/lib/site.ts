export const WHATSAPP_NUMBER = "5490000000000";

export function whatsappLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export interface MenuSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuSubItem[];
}

/**
 * Menú de respaldo: se usa mientras `useNavegacion()` está cargando el
 * menú desde Strapi, o si el request falla (Strapi caído, sin red, etc.),
 * para que el header nunca se muestre vacío o roto.
 */
export const NAV_FALLBACK: MenuItem[] = [
  {
    label: "Productos",
    href: "#experiencias",
    submenu: [
      {
        label: "Excursiones",
        href: "#experiencias",
        description: "Salidas de un día a cascadas, cerros y pueblos con encanto.",
      },
      {
        label: "Turismo Rural",
        href: "#experiencias",
        description: "Fincas, cocina casera y noches de fogón con familias locales.",
      },
      {
        label: "Ecoturismo",
        href: "#experiencias",
        description: "Senderos, avistaje de aves y naturaleza que se cuida.",
      },
    ],
  },
  { label: "Preguntas Frecuentes", href: "#faq" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Sobre nosotros", href: "#nosotros" },
];
