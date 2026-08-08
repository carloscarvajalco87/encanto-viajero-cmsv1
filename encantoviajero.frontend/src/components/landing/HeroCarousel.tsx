import { useEffect, useState } from "react";
import { Clock, MapPin, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { HeroSlideView } from "@/lib/hero";

interface HeroCarouselProps {
  slides: HeroSlideView[];
  label: string;
}

export function HeroCarousel({ slides, label }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Auto-play simple, sin dependencias extra: avanza cada 6s y se detiene
  // si el usuario tiene el mouse sobre la tarjeta.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!api || paused || slides.length <= 1) return;

    const id = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [api, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-xs lg:mx-0">
      {label && (
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground backdrop-blur-sm">
          <Users className="size-3.5" /> {label}
        </span>
      )}

      <div
        className="relative overflow-hidden rounded-lg shadow-[var(--shadow-lift)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent className="-ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative aspect-[0.7] w-full bg-white-smoke">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    className="h-full w-full object-fill"
                  />

                  {(slide.departureTime || slide.location) && (
                    <div className="absolute bottom-3 left-3 rounded-xl bg-background/95 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                      {slide.departureTime && (
                        <p className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-lagoon" />
                          Salida {slide.departureTime}
                        </p>
                      )}
                      {slide.location && (
                        <p className="mt-1 flex items-center gap-1.5 text-foreground/70">
                          <MapPin className="size-3.5 text-lagoon" />
                          {slide.location}
                        </p>
                      )}
                    </div>
                  )}

                  {slide.dates && (
                    <div className="absolute bottom-3 right-3 max-w-[46%] rounded-xl bg-background/95 px-3 py-2 text-right text-[11px] font-medium leading-snug text-foreground shadow-sm backdrop-blur-sm">
                      {slide.dates}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Ir a la slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-2 rounded-full transition-all",
                index === current
                  ? "w-5 bg-primary-foreground"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
