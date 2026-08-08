import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cómo reservo mi excursión?",
    a: "Nos escribís por WhatsApp, elegimos juntos la fecha y el itinerario, y confirmás con una seña del 30%. El resto lo abonás el día de la salida. Sin formularios eternos.",
  },
  {
    q: "¿Qué pasa si llueve o tengo que cancelar?",
    a: "Si el clima no acompaña, reprogramamos sin costo. Y si te surge algo, cancelás hasta 48 horas antes con devolución del 100% de la seña.",
  },
  {
    q: "¿Las excursiones son aptas para chicos y adultos mayores?",
    a: "Sí. Cada salida tiene nivel de dificultad indicado y adaptamos el ritmo. Contános las edades del grupo y te recomendamos la mejor opción.",
  },
  {
    q: "¿Qué incluye el precio?",
    a: "Transporte habilitado, guía local certificado, entradas, seguro de viajero y las comidas indicadas en cada experiencia. Te enviamos el detalle por escrito antes de reservar.",
  },
  {
    q: "¿Puedo armar una salida privada para mi grupo?",
    a: "Es lo que más hacemos. Cumpleaños, aniversarios, salidas de amigos o de empresa: elegís fecha, destino y estilo, y lo diseñamos desde cero.",
  },
  {
    q: "¿Cuánto tardan en responder?",
    a: "En horario de 9 a 20 h respondemos en menos de 30 minutos. Nunca te contesta un bot.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
        Preguntas frecuentes
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl">Sacate las dudas en un minuto</h2>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
