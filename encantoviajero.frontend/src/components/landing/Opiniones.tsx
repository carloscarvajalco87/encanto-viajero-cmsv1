import { Star, Quote } from "lucide-react";

const opiniones = [
  {
    nombre: "Camila y Nico",
    detalle: "Cascadas Escondidas · Marzo",
    texto:
      "Trabajamos todo el año frente a una pantalla y necesitábamos justo esto. Nos armaron el día a nuestro ritmo, paramos donde quisimos y volvimos como nuevos. Cero sensación de tour armado.",
  },
  {
    nombre: "Familia Ledesma",
    detalle: "Fin de Semana de Campo · Enero",
    texto:
      "Viajamos con dos nenes de 6 y 9 años. Todo pensado para ellos: caballos, pan casero y una noche de fogón que todavía recuerdan. Y el precio nos cerró perfecto.",
  },
  {
    nombre: "Mariela G.",
    detalle: "Bosque de Niebla y Aves · Agosto",
    texto:
      "Me respondieron cada duda por WhatsApp antes de pagar un peso. El guía era de la zona y sabía el nombre de cada planta. Ya reservé la próxima salida.",
  },
];

export function Opiniones() {
  return (
    <section id="opiniones" className="bg-primary scroll-mt-24 text-primary-foreground py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunset">
              Opiniones
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">Lo que cuentan los que ya volvieron</h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 h-14 rounded-full px-9 text-base bg-card px-5 py-3 shadow-[var(--shadow-soft)]">
            <div className="flex gap-0.5 text-sunset">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-sm font-semibold">
              4,9/5 <span className="font-normal text-primary-foreground/80">· 480+ viajeros</span>
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {opiniones.map((o) => (
            <figure
              key={o.nombre}
              className="flex h-full flex-col rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 bg-card p-6 backdrop-blur-sm shadow-[var(--shadow-soft)]"
            >
              <Quote className="size-7 text-sunset" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/80">
                {o.texto}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-semibold">{o.nombre}</span>
                <span className="block text-xs text-primary-foreground/80">{o.detalle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
