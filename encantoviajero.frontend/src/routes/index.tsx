import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { fetchHero, fetchHeroSlides } from "@/hooks/use-hero";
import { Experiencias } from "@/components/landing/Experiencias";
import { Emocional, PorQueElegirnos } from "@/components/landing/Emocional";
import { Opiniones } from "@/components/landing/Opiniones";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal, SiteFooter, WhatsAppFloat } from "@/components/landing/CtaFinal";

const title = "Encanto Viajero | Paquetes turísticos a Coveñas desde Medellín";
const description =
  "Descubre planes turísticos desde Medellín a destinos de playa, naturaleza y aventura. Conoce nuestros planes y solicita tu cotización por WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.mundoencantoviajero.com/" }],
  }),
  // Precarga el hero en el servidor para que el <h1> llegue en el HTML inicial.
  // Si Strapi falla, el campo queda undefined y Hero cae al respaldo.
  loader: async () => {
    const [hero, slides] = await Promise.all([
      fetchHero().catch(() => undefined),
      fetchHeroSlides().catch(() => undefined),
    ]);
    return { hero, slides };
  },
  component: Index,
});

function Index() {
  const heroData = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero initialData={heroData} />
        <Experiencias />
        <Emocional />
        <PorQueElegirnos />
        <Opiniones />
        <Faq />
        <CtaFinal />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
