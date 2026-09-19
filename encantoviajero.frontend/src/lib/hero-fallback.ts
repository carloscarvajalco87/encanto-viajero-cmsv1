// src/lib/hero-fallback.ts
import hero from "@/assets/hero-valle.jpg";
import type { HeroContent, HeroSlideView } from "@/lib/hero";

export const HERO_FALLBACK: HeroContent = {
  badgeLabel: "Grupos de máximo 12 personas",
  title: "Viaja y descubre las maravillas de Colombia y el mundo con Encanto Viajero",
  description: "Diseñamos excursiones, tours grupales 100% a tu medida: tú eliges el ritmo, nosotros nos ocupamos de todo, sin afanes. ",
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
    dates: "Consulta próximas salidas por WhatsApp",
  },
  {
    id: 1,
    image: hero,
    alt: "Grupo de viajeros en una excursión rural",
    departureTime: "6:00 A.M.",
    location: "Parque Explora",
    dates: "Consulta próximas salidas por WhatsApp",
  },
];
