import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
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
