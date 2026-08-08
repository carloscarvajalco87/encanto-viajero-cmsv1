import type { CSSProperties } from "react";
import { MessageCircle, ShieldCheck, Users, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { useHero } from "@/hooks/use-hero";
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
      backgroundImage: `linear-gradient(160deg, ${background.from}, ${background.to})`,
    };
  }
  if (background.type === "color") {
    return { backgroundColor: background.color };
  }
  return {};
}

export function Hero() {
  const { content, slides } = useHero();
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

      <div className="mx-auto grid min-h-[88vh] max-w-8xl grid-cols-1 items-center gap-12 px-5 pb-14 pt-24 text-primary-foreground lg:grid-cols-[1.4fr_360px]">
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
