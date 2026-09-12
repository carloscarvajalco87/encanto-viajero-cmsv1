import { useState } from "react";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { useNavigation } from "@/hooks/use-navigation";
import logo from "@/assets/encanto-viajero-logov2.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const { items: NAV } = useNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-foreground backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Encanto Viajero"
            width={64}
            height={64}
            className="rounded-full"
          />
          <span className="leading-tight text-background">
            <span className="block font-display text-lg font-semibold">Encanto Viajero</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.submenu ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-secondary hover:text-foreground">
                  {item.label}
                  <ChevronDown className="size-4" />
                </button>
                <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-2xl border border-border bg-popover p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <span className="block text-sm font-semibold">{sub.label}</span>
                      <span className="block text-xs text-muted-foreground">{sub.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 text-background">
          <Button variant="cta" size="lg" className="hidden rounded-full sm:inline-flex" asChild>
            <a
              href={whatsappLink("¡Hola Encanto Viajero! Quiero cotizar una excursión.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle /> Cotizar por WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-foreground px-5 pb-5 pt-2 lg:hidden">
          {NAV.map((item) =>
            item.submenu ? (
              <div key={item.label}>
                <button
                  className="flex w-full items-center justify-between py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setSubOpen((v) => !v)}
                >
                  {item.label} <ChevronDown className="size-4" />
                </button>
                {subOpen && (
                  <div className="mb-2 space-y-1 border-l border-border pl-4">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-background"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ),
          )}
          <Button variant="cta" size="lg" className="mt-3 w-full rounded-full" asChild>
            <a
              href={whatsappLink("¡Hola Encanto Viajero! Quiero cotizar una excursión.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle /> Cotizar por WhatsApp
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
