import { MessageCircle, ShieldCheck, Clock3, Instagram, Mail, Phone, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import logo from "@/assets/encanto-viajero-logo.png";

export function CtaFinal() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
      <div className="rounded-4xl border border-border bg-[image:var(--gradient-sunset)] px-6 py-14 text-center text-sunset-foreground shadow-[var(--shadow-lift)] md:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">
          Cupos limitados este mes
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance-tight text-3xl md:text-4xl">
          Tu próxima escapada empieza con un simple “hola”
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed opacity-90">
          Contanos cuántos son, qué fecha tenés en mente y qué querés sentir. En menos de 30 minutos
          te enviamos una propuesta personalizada, con precio final y sin compromiso.
        </p>
        <Button variant="default" size="xl" className="mt-8 rounded-full" asChild>
          <a
            href={whatsappLink(
              "¡Hola Encanto Viajero! Quiero mi propuesta personalizada. Somos ___ personas y pensamos viajar el ___.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle /> Pedir mi cotización gratis
          </a>
        </Button>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm opacity-90">
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4" /> Cancelás gratis hasta 48 h antes
          </li>
          <li className="flex items-center gap-2">
            <Clock3 className="size-4" /> Respuesta real en menos de 30 min
          </li>
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Encanto Viajero"
            loading="lazy"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <span>
            <span className="block font-display text-lg">Encanto Viajero</span>
            <span className="block text-xs text-primary-foreground/70">
              Excursiones, turismo rural y ecoturismo a tu medida
            </span>
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
          <a href="#experiencias" className="hover:text-primary-foreground">
            Experiencias
          </a>
          <a href="#nosotros" className="hover:text-primary-foreground">
            Sobre nosotros
          </a>
          <a href="#opiniones" className="hover:text-primary-foreground">
            Opiniones
          </a>
          <a href="#faq" className="hover:text-primary-foreground">
            Preguntas frecuentes
          </a>
        </div>

        <div className="flex gap-4 text-primary-foreground/80">
          <a
            href={whatsappLink("¡Hola Encanto Viajero!")}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:text-primary-foreground"
          >
            <Phone className="size-5" />
          </a>
          <a href="https://www.instagram.com/encanto.viajero/" aria-label="Instagram" className="hover:text-primary-foreground" target="_blank" rel="noreferrer">
            <Instagram className="size-5" />
          </a>
          <a href="https://www.facebook.com/mundoencantoviajero/" aria-label="Facebook" className="hover:text-primary-foreground" target="_blank" rel="noreferrer">
            <Facebook className="size-5" />
          </a>
          <a
            href="mailto:info@mundoencantoviajero.com"
            aria-label="Email"
            className="hover:text-primary-foreground"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-5 text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Encanto Viajero · Atrévete a vivir una nueva aventura
      </p>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("¡Hola Encanto Viajero! Quiero cotizar una excursión.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-limegreen)] px-5 py-3.5 text-sm font-semibold text-limegreen-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Cotizar por WhatsApp</span>
    </a>
  );
}
