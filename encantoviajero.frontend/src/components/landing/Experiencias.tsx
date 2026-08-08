import { Clock, MapPin, Users, MessageCircle, AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { whatsappLink } from "@/lib/site";
import { useArticulos } from "@/hooks/use-articulos";

function ExperienciasSkeleton() {
  return (
    <div className="mt-12 grid gap-7 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
        >
          <Skeleton className="aspect-4/5 w-full rounded-none" />
          <div className="flex flex-col gap-3 p-6">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="mt-3 h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienciasError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
      <AlertCircle className="size-8 text-destructive" />
      <p className="font-semibold text-foreground">No pudimos cargar las experiencias</p>
      <p className="text-sm text-muted-foreground">
        Verificá que Strapi esté corriendo y que el endpoint sea accesible.
      </p>
      <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
        <RotateCw /> Reintentar
      </Button>
    </div>
  );
}

function FormatoMoneda(
  monto: number,
  codigoMoneda: string = 'COP',
  idioma: string = 'es-CO'
): string {
  return new Intl.NumberFormat(idioma, {
    style: 'currency',
    currency: codigoMoneda,
    minimumFractionDigits: 0, // Ajusta decimales según prefieras
    maximumFractionDigits: 2,
  }).format(monto);
}

export function Experiencias() {
  const { experiencias, isLoading, isError, refetch } = useArticulos();

  return (
    <section id="experiencias" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          Experiencias destacadas
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl">
          Tres formas de volver a casa con la cabeza liviana
        </h2>
        <p className="mt-4 text-muted-foreground">
          Cada salida se ajusta a tu grupo: fechas, ritmo, comidas y hasta las paradas para las
          fotos. Elegí la que más te llame y la armamos juntos por WhatsApp.
        </p>
      </div>

      {isLoading && <ExperienciasSkeleton />}

      {isError && !isLoading && <ExperienciasError onRetry={() => refetch()} />}

      {!isLoading && !isError && experiencias.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Todavía no hay experiencias publicadas.
        </p>
      )}

      {!isLoading && !isError && experiencias.length > 0 && (
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {experiencias.map((exp) => (
            <article
              key={exp.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <img
                  src={exp.img}
                  alt={exp.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                  {exp.etiqueta}
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-sunset px-3 py-1 text-xs font-semibold text-sunset-foreground">
                  {exp.notas}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl">{exp.titulo}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {exp.texto}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-lagoon" /> {exp.duracion}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-lagoon" /> {exp.lugar}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="size-4 text-lagoon" /> {exp.grupo}
                  </li>
                </ul>
                <p className="mt-5 font-display text-lg">{exp.notasPrecio ? exp.notasPrecio.replace("$price", FormatoMoneda(Number(exp.precio))) : FormatoMoneda(Number(exp.precio))}</p>
                <Button variant="cta" size="lg" className="mt-4 w-full rounded-full" asChild>
                  <a
                    href={whatsappLink(
                      `¡Hola! Me interesa la experiencia "${exp.titulo}". ¿Me pasan fechas y precios?`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle /> Cotizar esta salida
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
