import { cn } from "@/lib/utils";

// Las clases deben quedar completas y literales acá: Tailwind arma su hoja de
// estilos escaneando el texto fuente, así que un `bg-${theme}` armado en
// runtime nunca sería detectado y no generaría CSS.
const SKELETON_THEME_CLASSES = {
  "primary/10": "bg-primary/10",
  "primary-foreground/15": "bg-primary-foreground/15",
  "foreground/10": "bg-foreground/10",
  "secondary/40": "bg-secondary/40",
} as const;

type SkeletonTheme = keyof typeof SKELETON_THEME_CLASSES;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: SkeletonTheme;
}

function Skeleton({ className, theme = "primary/10", ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md", SKELETON_THEME_CLASSES[theme], className)}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonTheme };
