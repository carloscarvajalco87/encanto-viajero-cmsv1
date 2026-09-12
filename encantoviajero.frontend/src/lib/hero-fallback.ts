// src/lib/hero-fallback.ts
import hero from "@/assets/hero-valle.jpg";
import type { HeroContent, HeroSlideView } from "@/lib/hero";

export const HERO_FALLBACK: HeroContent = {
  badgeLabel: "Grupos de máximo 12 personas",
  title: "Desconectá del ruido y volvé a sentir el campo, el agua y el silencio.",
  description:
    "Diseñamos excursiones y escapadas rurales 100% a tu medida: vos elegís el ritmo, nosotros " +
    "nos ocupamos de todo. Sin micros llenos, sin filas, sin apuros. Solo tu grupo, un guía " +
    "local que conoce cada sendero y lugares que las agencias masivas nunca te van a mostrar.",
  primaryButtonLabel: "Cotizar mi viaje por WhatsApp",
  primaryButtonMessage:
    "¡Hola Encanto Viajero! Quiero armar mi excursión personalizada. ¿Me ayudan con una cotización?",
  secondaryButtonLabel: "Ver experiencias",
  secondaryButtonHref: "#experiencias",
  carouselLabel: "Salidas de esta semana",
  background: { type: "color", color: "#05023a" },
  trustItems: [
    { icon: "shield", label: "Cancelación flexible hasta 48 h antes" },
    { icon: "star", label: "4,9/5 en más de 480 viajes realizados" },
    { icon: "users", label: "Guías locales certificados y seguro incluido" },
  ],
};

export const HERO_SLIDES_FALLBACK: HeroSlideView[] = [
  {
    id: 0,
    image: hero,
    alt: "Grupo de viajeros en una excursión rural",
    departureTime: "6:00 A.M.",
    location: "Parque Explora",
    dates: "Consultá próximas salidas por WhatsApp",
  },
  {
    id: 1,
    image: hero,
    alt: "Grupo de viajeros en una excursión rural",
    departureTime: "6:00 A.M.",
    location: "Parque Explora",
    dates: "Consultá próximas salidas por WhatsApp",
  },
];
