export interface RelatedLink {
  label: string;
  href: string;
  type: "blog" | "thread";
}

// ─── BLOG → RELATED LINKS ────────────────────────────────────────────────────
// Keyed by blog slug. Drop these at the bottom of BlogDetail.tsx.

export const BLOG_RELATED_LINKS: Record<string, RelatedLink[]> = {
  // COUNTRY BLOGS

  "italian-horror-1970s-giallo": [
    {
      label: "Giallo — Horror Eating Everything Around It",
      href: "/blog/italy-horror-giallo-collision",
      type: "blog",
    },
    {
      label: "Italy, Spain, and the Decaying House",
      href: "/threads/haunted-house/italy-spain-and-the-decaying-house",
      type: "thread",
    },
  ],

  "uk-hammer-horror": [
    {
      label: "Britain — Folk Horror, Flesh, and Fury",
      href: "/blog/uk-horror-folk-flesh-fury",
      type: "blog",
    },
    {
      label: "Hammer Reinvents Frankenstein",
      href: "/threads/frankenstein/hammer-reinvents-it",
      type: "thread",
    },
    {
      label: "Hammer Owns Dracula",
      href: "/threads/dracula/hammer-owns-the-count",
      type: "thread",
    },
    {
      label: "The House Is the Monster",
      href: "/threads/haunted-house/the-house-is-the-monster",
      type: "thread",
    },
  ],

  "french-horror-unease": [
    {
      label: "Germany — The Visual Language of Horror",
      href: "/blog/german-horror-expressionism",
      type: "blog",
    },
  ],

  "german-horror-expressionism": [
    {
      label: "French Horror Does Not Want You Comfortable",
      href: "/blog/french-horror-unease",
      type: "blog",
    },
    {
      label: "Stoker and the Source — Nosferatu",
      href: "/threads/dracula/stoker-and-the-source",
      type: "thread",
    },
  ],

  "japanese-horror-50-years": [
    {
      label: "Japan Builds the Wrong House",
      href: "/threads/haunted-house/japan-builds-the-wrong-house",
      type: "thread",
    },
    {
      label: "Japan Makes Frankenstein Giant",
      href: "/threads/frankenstein/japan-makes-it-giant",
      type: "thread",
    },
  ],

  "spanish-horror-dark-sun": [
    {
      label: "Giallo — Horror Eating Everything Around It",
      href: "/blog/italy-horror-giallo-collision",
      type: "blog",
    },
    {
      label: "Italy, Spain, and the Decaying House",
      href: "/threads/haunted-house/italy-spain-and-the-decaying-house",
      type: "thread",
    },
  ],

  // GENRE BLOGS

  "usa-horror-blaxploitation": [
    {
      label: "America After Universal — Frankenstein",
      href: "/threads/frankenstein/america-after-universal",
      type: "thread",
    },
    {
      label: "The Shining and the American House",
      href: "/threads/haunted-house/the-shining-and-the-american-house",
      type: "thread",
    },
    {
      label: "America Reinvents the Vampire",
      href: "/threads/dracula/america-reinvents-the-vampire",
      type: "thread",
    },
  ],

  "uk-horror-folk-flesh-fury": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Hammer Reinvents Frankenstein",
      href: "/threads/frankenstein/hammer-reinvents-it",
      type: "thread",
    },
    {
      label: "Hammer Owns Dracula",
      href: "/threads/dracula/hammer-owns-the-count",
      type: "thread",
    },
    {
      label: "The House Is the Monster",
      href: "/threads/haunted-house/the-house-is-the-monster",
      type: "thread",
    },
  ],

  "italy-horror-giallo-collision": [
    {
      label: "The Golden Age of Italian Horror",
      href: "/blog/italian-horror-1970s-giallo",
      type: "blog",
    },
    {
      label: "Italy, Spain, and the Decaying House",
      href: "/threads/haunted-house/italy-spain-and-the-decaying-house",
      type: "thread",
    },
    {
      label: "Germany — The Visual Language of Horror",
      href: "/blog/german-horror-expressionism",
      type: "blog",
    },
  ],
};

// ─── THREAD PART → RELATED LINKS ─────────────────────────────────────────────
// Keyed by part slug. Drop these at the bottom of the thread part page.

export const THREAD_RELATED_LINKS: Record<string, RelatedLink[]> = {
  // FRANKENSTEIN

  "the-origin": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Stoker and the Source — Dracula",
      href: "/threads/dracula/stoker-and-the-source",
      type: "thread",
    },
    {
      label: "Egypt and the West — The Mummy",
      href: "/threads/mummy/egypt-and-the-west",
      type: "thread",
    },
  ],

  "hammer-reinvents-it": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Britain — Folk Horror, Flesh, and Fury",
      href: "/blog/uk-horror-folk-flesh-fury",
      type: "blog",
    },
    {
      label: "Hammer Owns Dracula",
      href: "/threads/dracula/hammer-owns-the-count",
      type: "thread",
    },
    {
      label: "Hammer and the Colonial Wound — The Mummy",
      href: "/threads/mummy/hammer-and-the-colonial-wound",
      type: "thread",
    },
  ],

  "frankenstein-goes-to-mexico": [
    {
      label: "Dracula Goes East",
      href: "/threads/dracula/dracula-goes-east",
      type: "thread",
    },
  ],

  "america-after-universal": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "America Reinvents the Vampire",
      href: "/threads/dracula/america-reinvents-the-vampire",
      type: "thread",
    },
  ],

  "frankenstein-in-turkey": [
    {
      label: "Dracula Goes East",
      href: "/threads/dracula/dracula-goes-east",
      type: "thread",
    },
  ],

  "japan-makes-it-giant": [
    {
      label: "Japan Made Horror Personal Before Anyone Else",
      href: "/blog/japanese-horror-50-years",
      type: "blog",
    },
    {
      label: "Japan Builds the Wrong House",
      href: "/threads/haunted-house/japan-builds-the-wrong-house",
      type: "thread",
    },
  ],

  "the-idea-survives": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "The House Never Ends",
      href: "/threads/haunted-house/the-house-never-ends",
      type: "thread",
    },
  ],

  // DRACULA

  "stoker-and-the-source": [
    {
      label: "Germany — The Visual Language of Horror",
      href: "/blog/german-horror-expressionism",
      type: "blog",
    },
    {
      label: "The Origin — Frankenstein",
      href: "/threads/frankenstein/the-origin",
      type: "thread",
    },
    {
      label: "Egypt and the West — The Mummy",
      href: "/threads/mummy/egypt-and-the-west",
      type: "thread",
    },
  ],

  "hammer-owns-the-count": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Britain — Folk Horror, Flesh, and Fury",
      href: "/blog/uk-horror-folk-flesh-fury",
      type: "blog",
    },
    {
      label: "Hammer Reinvents Frankenstein",
      href: "/threads/frankenstein/hammer-reinvents-it",
      type: "thread",
    },
  ],

  "europe-takes-the-count": [
    {
      label: "The Golden Age of Italian Horror",
      href: "/blog/italian-horror-1970s-giallo",
      type: "blog",
    },
    {
      label: "Spain Made Horror Under a Dictatorship",
      href: "/blog/spanish-horror-dark-sun",
      type: "blog",
    },
    {
      label: "Germany — The Visual Language of Horror",
      href: "/blog/german-horror-expressionism",
      type: "blog",
    },
    {
      label: "Italy, Spain, and the Decaying House",
      href: "/threads/haunted-house/italy-spain-and-the-decaying-house",
      type: "thread",
    },
  ],

  "dracula-goes-east": [
    {
      label: "Frankenstein in Turkey",
      href: "/threads/frankenstein/frankenstein-in-turkey",
      type: "thread",
    },
  ],

  "america-reinvents-the-vampire": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "America After Universal — Frankenstein",
      href: "/threads/frankenstein/america-after-universal",
      type: "thread",
    },
  ],

  "what-the-vampire-became": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "The Blockbuster Buries It — The Mummy",
      href: "/threads/mummy/the-blockbuster-buries-it",
      type: "thread",
    },
  ],

  // THE MUMMY

  "egypt-and-the-west": [
    {
      label: "The Origin — Frankenstein",
      href: "/threads/frankenstein/the-origin",
      type: "thread",
    },
    {
      label: "Stoker and the Source — Dracula",
      href: "/threads/dracula/stoker-and-the-source",
      type: "thread",
    },
  ],

  "universal-runs-it-into-the-ground": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "The Origin — Frankenstein",
      href: "/threads/frankenstein/the-origin",
      type: "thread",
    },
  ],

  "hammer-and-the-colonial-wound": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Britain — Folk Horror, Flesh, and Fury",
      href: "/blog/uk-horror-folk-flesh-fury",
      type: "blog",
    },
    {
      label: "Hammer Reinvents Frankenstein",
      href: "/threads/frankenstein/hammer-reinvents-it",
      type: "thread",
    },
    {
      label: "Hammer Owns Dracula",
      href: "/threads/dracula/hammer-owns-the-count",
      type: "thread",
    },
  ],

  "egypt-makes-its-own-mummy": [
    {
      label: "Japan Made Horror Personal Before Anyone Else",
      href: "/blog/japanese-horror-50-years",
      type: "blog",
    },
    {
      label: "Dracula Goes East",
      href: "/threads/dracula/dracula-goes-east",
      type: "thread",
    },
  ],

  "the-mummy-disappears": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "The Golden Age of Italian Horror",
      href: "/blog/italian-horror-1970s-giallo",
      type: "blog",
    },
  ],

  "the-blockbuster-buries-it": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "What the Vampire Became",
      href: "/threads/dracula/what-the-vampire-became",
      type: "thread",
    },
    {
      label: "The Idea Survives — Frankenstein",
      href: "/threads/frankenstein/the-idea-survives",
      type: "thread",
    },
  ],

  // HAUNTED HOUSE

  "the-house-is-the-monster": [
    {
      label: "Britain Built the House of Horror — Hammer",
      href: "/blog/uk-hammer-horror",
      type: "blog",
    },
    {
      label: "Britain — Folk Horror, Flesh, and Fury",
      href: "/blog/uk-horror-folk-flesh-fury",
      type: "blog",
    },
  ],

  "the-shining-and-the-american-house": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
  ],

  "japan-builds-the-wrong-house": [
    {
      label: "Japan Made Horror Personal Before Anyone Else",
      href: "/blog/japanese-horror-50-years",
      type: "blog",
    },
    {
      label: "Japan Makes Frankenstein Giant",
      href: "/threads/frankenstein/japan-makes-it-giant",
      type: "thread",
    },
  ],

  "italy-spain-and-the-decaying-house": [
    {
      label: "The Golden Age of Italian Horror",
      href: "/blog/italian-horror-1970s-giallo",
      type: "blog",
    },
    {
      label: "Giallo — Horror Eating Everything Around It",
      href: "/blog/italy-horror-giallo-collision",
      type: "blog",
    },
    {
      label: "Spain Made Horror Under a Dictatorship",
      href: "/blog/spanish-horror-dark-sun",
      type: "blog",
    },
    {
      label: "Europe Takes Dracula",
      href: "/threads/dracula/europe-takes-the-count",
      type: "thread",
    },
  ],

  "the-house-never-ends": [
    {
      label: "American Horror — The Country Confronting Itself",
      href: "/blog/usa-horror-blaxploitation",
      type: "blog",
    },
    {
      label: "Spain Made Horror Under a Dictatorship",
      href: "/blog/spanish-horror-dark-sun",
      type: "blog",
    },
    {
      label: "The Idea Survives — Frankenstein",
      href: "/threads/frankenstein/the-idea-survives",
      type: "thread",
    },
    {
      label: "What the Vampire Became",
      href: "/threads/dracula/what-the-vampire-became",
      type: "thread",
    },
  ],
};
