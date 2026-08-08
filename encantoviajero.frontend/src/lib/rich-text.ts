// src/lib/rich-text.ts

/**
 * Forma mínima del AST que devuelve el editor "Rich text (Blocks)" de
 * Strapi v5. No es un string: es un array de nodos de bloque, cada uno
 * con hijos que pueden ser texto o (si hay links/negrita/etc.) nodos
 * anidados. No tipamos cada variante posible, solo lo que necesitamos
 * para extraer el texto.
 */
export interface RichTextChild {
  type: string;
  text?: string;
  children?: RichTextChild[];
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export type RichTextContent = RichTextBlock[];

function extractText(children: RichTextChild[]): string {
  return children
    .map((child) => {
      if (typeof child.text === "string") return child.text;
      if (child.children) return extractText(child.children);
      return "";
    })
    .join("");
}

/**
 * Aplana el contenido de un campo Rich Text (Blocks) a texto plano,
 * uniendo párrafos con un espacio. Útil para vistas tipo tarjeta que
 * no necesitan el formato enriquecido (negrita, links, listas, etc.).
 */
export function richTextToPlainText(
  blocks: RichTextContent | null | undefined,
): string {
  if (!blocks || blocks.length === 0) return "";

  return blocks
    .map((block) => extractText(block.children))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Igual que arriba, pero recorta a `maxLength` caracteres sin partir palabras. */
export function richTextToExcerpt(
  blocks: RichTextContent | null | undefined,
  maxLength = 140,
): string {
  const plain = richTextToPlainText(blocks);
  if (plain.length <= maxLength) return plain;

  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
