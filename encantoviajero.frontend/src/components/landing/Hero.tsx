import type { CSSProperties } from "react";
import { MessageCircle, ShieldCheck, Users, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { whatsappLink } from "@/lib/site";
import { useHero, type HeroInitialData } from "@/hooks/use-hero";
import { HERO_FALLBACK } from "@/lib/hero-fallback";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import type { HeroBackground } from "@/lib/hero";
import type { TrustIcon } from "@/types/hero";

const TRUST_ICONS: Record<TrustIcon, LucideIcon> = {
  shield: ShieldCheck,
  star: Star,
  users: Users,
};

function backgroundStyle(background: HeroBackground): CSSProperties {
  if (background.type === "gradient") {
    return {
      backgroundImage: `linear-gradient(to top, ${background.from} 6%, ${background.to} 45%)`,
    };
  }
  if (background.type === "color") {
    return { backgroundColor: background.color };
  }
  return {};
}

function HeroSkeleton() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-muted text-primary-foreground" style={{ backgroundImage: `linear-gradient(to top, rgb(21, 98, 133) 6%, rgb(18, 34, 70) 45%)` }}>
      <div className="mx-auto grid min-h-[75vh] max-w-8xl grid-cols-1 items-center gap-12 px-5 pb-14 pt-4 lg:grid-cols-[1.4fr_360px] md:pt-24">
        <div className="flex flex-col justify-end gap-5">
          <Skeleton className="h-7 w-56 rounded-full" theme="secondary/40" />

          {/* Respaldo SEO: si el loader no pudo traer el hero de Strapi, el HTML del
              servidor igual incluye un <h1> real en lugar de solo bloques grises. */}
          <h1 className="max-w-4xl text-balance-tight font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {HERO_FALLBACK.title}
          </h1>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl" theme="secondary/40" />
            <Skeleton className="h-4 w-full max-w-xl" theme="secondary/40" />
            <Skeleton className="h-4 w-3/4 max-w-lg" theme="secondary/40" />
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Skeleton className="h-12 w-56 rounded-full" theme="secondary/40" />
            <Skeleton className="h-12 w-40 rounded-full" theme="secondary/40" />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            <Skeleton className="h-4 w-52" theme="secondary/40" />
            <Skeleton className="h-4 w-48" theme="secondary/40" />
            <Skeleton className="h-4 w-56" theme="secondary/40" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <Skeleton className="mb-4 h-7 w-40 rounded-full" theme="secondary/40" />
          <Skeleton className="aspect-[0.7] w-full rounded-lg" theme="secondary/40" />
          <div className="mt-4 flex justify-center gap-2">
            <Skeleton className="h-2 w-5 rounded-full" theme="secondary/40" />
            <Skeleton className="h-2 w-2 rounded-full" theme="secondary/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero({ initialData }: { initialData?: HeroInitialData }) {
  const { content, slides, isLoading } = useHero(initialData);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const { background } = content;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={backgroundStyle(background)}
    >
      {background.type === "image" && (
        <>
          <img
            src={background.url}
            alt=""
            width={1920}
            height={1200}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0 -z-10" />
        </>
      )}

      <div className="mx-auto grid min-h-[75vh] max-w-8xl grid-cols-1 items-center gap-12 px-5 pb-14 pt-4 text-primary-foreground lg:grid-cols-[1.4fr_360px] md:pt-24">
        <div className="flex flex-col justify-end">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
            <Users className="size-3.5" /> {content.badgeLabel}
          </span>

          <h1 className="max-w-4xl text-balance-tight font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {content.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {content.primaryButtonLabel && (
              <Button variant="cta" size="xl" asChild>
                <a href={whatsappLink(content.primaryButtonMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle /> {content.primaryButtonLabel}
                </a>
              </Button>
            )}
            {content.secondaryButtonLabel && content.secondaryButtonHref && (
              <Button variant="onHero" size="xl" asChild>
                <a href={content.secondaryButtonHref}>{content.secondaryButtonLabel}</a>
              </Button>
            )}
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-primary-foreground/85">
            {content.trustItems.map((item) => {
              const Icon = TRUST_ICONS[item.icon];
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon className="size-4" /> {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        <HeroCarousel slides={slides} label={content.carouselLabel} />
      </div>
    </section>
  );
}
