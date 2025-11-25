// src/lib/specificity.ts
export interface Specificity {
  inline: number;
  id: number;
  classAttrPseudo: number;
  elementPseudo: number;
  sourceOrder: number;
}

export interface Breakdown {
  selector: string;
  specificity: Specificity;
  formatted: string;
  ids: string[];
  classesAttrsPseudos: string[];
  elementsPseudos: string[];
}

export function calculateSpecificity(selector: string): Breakdown {
  const clean = selector.trim();
  if (!clean) {
    return {
      selector: '',
      specificity: { inline: 0, id: 0, classAttrPseudo: 0, elementPseudo: 0, sourceOrder: 0 },
      formatted: '0-0-0-0',
      ids: [],
      classesAttrsPseudos: [],
      elementsPseudos: []
    };
  }

  let inline = 0;
  let id = 0;
  let classAttrPseudo = 0;
  let elementPseudo = 0;
  const ids: string[] = [];
  const classesAttrsPseudos: string[] = [];
  const elementsPseudos: string[] = [];

  try {
    // === STEP 1: Extract and count IDs, classes, attributes, pseudo-classes ===
    const tokenRegex = /(#[\w-]+)|(\.[\w\-.]+)|(\[[^\]]+\])|(:(?:not|is|where|has)\([^()]*\))|(:[\w-]+(?:\([^()]*\))?)/gi;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(clean)) !== null) {
      const token = match[0];

      if (match[1]) {
        // ID selector
        id++;
        ids.push(token);
      } else if (match[2] || match[3]) {
        // Class or attribute selector
        classAttrPseudo++;
        classesAttrsPseudos.push(token);
      } else if (match[4] || match[5]) {
        // Functional pseudo-classes (:not, :is, :where, :has) OR regular pseudo-class
        const pseudo = token.toLowerCase();
        if (pseudo.startsWith('::') || pseudo === ':before' || pseudo === ':after' || pseudo === ':first-line' || pseudo === ':first-letter' || pseudo === ':selection') {
          elementPseudo++;
          elementsPseudos.push(token);
        } else {
          classAttrPseudo++;
          classesAttrsPseudos.push(token);
        }
      }
    }

    // === STEP 2: Count element selectors and pseudo-elements that weren't caught above ===
    const elementRegex = /(^|[\s>+~;:,])([a-zA-Z][\w-]*)/g;
    let elMatch: RegExpExecArray | null;
    while ((elMatch = elementRegex.exec(clean)) !== null) {
      const el = elMatch[2];
      if (el && !el.startsWith(':') && !el.startsWith('#') && !el.startsWith('.')) {
        elementPseudo++;
        elementsPseudos.push(el);
      }
    }

    // === STEP 3: Special case – universal selector *
    if (clean.includes('*') && !clean.match(/[#.\[:]/)) {
      elementPseudo++;
      elementsPseudos.push('*');
    }

  } catch (err) {
    console.error('[Specificity Calculator] Parsing error for selector:', clean, err);
    // Fallback: treat as unknown → very low specificity
    return {
      selector: clean,
      specificity: { inline: 0, id: 0, classAttrPseudo: 1, elementPseudo: 0, sourceOrder: 0 },
      formatted: '0-0-1-0',
      ids: [],
      classesAttrsPseudos: ['<parse-error>'],
      elementsPseudos: []
    };
  }

  const specificity: Specificity = { inline, id, classAttrPseudo, elementPseudo, sourceOrder: 0 };

  return {
    selector: clean,
    specificity,
    formatted: `${inline}-${id}-${classAttrPseudo}-${elementPseudo}`,
    ids,
    classesAttrsPseudos,
    elementsPseudos
  };
}