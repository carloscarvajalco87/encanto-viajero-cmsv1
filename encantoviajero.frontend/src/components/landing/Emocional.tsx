import { HeartHandshake, Route, Leaf, Wallet, ShieldCheck, CalendarCheck } from "lucide-react";

const miedos = [
  {
    miedo: "“¿Y si termino en un micro con 50 desconocidos?”",
    solucion: "Grupos de máximo 12 personas. Si querés, salís solo con tu familia.",
  },
  {
    miedo: "“¿Y si el guía no conoce la zona?”",
    solucion: "Trabajamos con guías locales certificados que nacieron en cada valle.",
  },
  {
    miedo: "“¿Y si llueve o me tengo que bajar?”",
    solucion: "Reprogramás sin costo o te devolvemos el 100% hasta 48 h antes.",
  },
  {
    miedo: "“¿Y si al final me cobran de más?”",
    solucion: "Precio final por escrito antes de reservar. Sin sorpresas ni extras.",
  },
];

const razones = [
  {
    icon: Route,
    titulo: "Itinerario hecho a tu medida",
    texto:
      "Nos contás cómo querés que se sienta tu viaje y armamos el recorrido. Nada de paquetes copiados y pegados.",
  },
  {
    icon: HeartHandshake,
    titulo: "Nada de agencias masivas",
    texto:
      "Somos un equipo chico. Te atiende una persona real por WhatsApp, antes, durante y después de la salida.",
  },
  {
    icon: Wallet,
    titulo: "Precios accesibles y claros",
    texto: "Planes familiares, cuotas y descuentos para chicos. Todo transparente desde el primer mensaje.",
  },
  {
    icon: Leaf,
    titulo: "Turismo que cuida el lugar",
    texto:
      "Contratamos servicios locales, grupos reducidos y cero basura en los senderos. Volvés con la conciencia tranquila.",
  },
  {
    icon: ShieldCheck,
    titulo: "Seguridad primero",
    texto: "Seguro de viajero incluido, transporte habilitado y guías con primeros auxilios.",
  },
  {
    icon: CalendarCheck,
    titulo: "Reservás en 3 mensajes",
    texto: "Escribís, elegís fecha y confirmás con una seña. Listo: ya tenés escapada.",
  },
];

export function Emocional() {
  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunset">
            Te entendemos
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">
            Sabemos exactamente qué te frena antes de reservar
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Y por eso armamos Encanto Viajero: para que viajar deje de dar trabajo y vuelva a dar
            ganas.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {miedos.map((m) => (
            <div
              key={m.miedo}
              className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm"
            >
              <p className="font-display text-lg">{m.miedo}</p>
              <p className="mt-2 text-sm text-primary-foreground/80">{m.solucion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PorQueElegirnos() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          Por qué elegirnos
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl">
          Somos los amigos que ya conocen el camino
        </h2>
        <p className="mt-4 text-muted-foreground">
          Empezamos con una camioneta prestada y muchas ganas de mostrar los rincones que amamos. Hoy
          somos guías, cocineras y familias del campo trabajando juntos para que tu escapada se
          sienta como visitar a alguien conocido.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {razones.map((r) => (
          <div
            key={r.titulo}
            className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-lagoon">
              <r.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg">{r.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
