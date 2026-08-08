import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Experiencias } from "@/components/landing/Experiencias";
import { Emocional, PorQueElegirnos } from "@/components/landing/Emocional";
import { Opiniones } from "@/components/landing/Opiniones";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal, SiteFooter, WhatsAppFloat } from "@/components/landing/CtaFinal";

const title = "Encanto Viajero | Excursiones y turismo rural personalizado";
const description =
  "Excursiones, turismo rural y ecoturismo 100% personalizados en grupos reducidos. Guías locales, precios claros y cancelación flexible. Cotizá por WhatsApp.";

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
