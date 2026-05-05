export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  teaser: string;
  body: string[];
  /** Image shown on hover-preview from the index list. */
  cover: string;
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "a-detail-from-tahir",
    date: "April 2025",
    title: "A Detail from Tahir",
    teaser: "A note on the bronze hinge that took six months to find.",
    cover: "/images/hero-luxury-cover.jpeg",
    body: [
      "The bronze hinges on the eastern doors of Tahir Pavilion took six months to find.",
      "The brief was simple. Solid bronze, butt-style, large enough to carry the weight of a 90-kilogram pale oak door, with proportions that would patinate well in salt air. The studio assumed a week of supplier conversations. The studio was wrong.",
      "The first six suppliers offered cast bronze with a copper-zinc ratio that would tarnish to a dull green within two years. Acceptable for inland projects. Wrong for Tahir, which sits 12 meters above the Indian Ocean.",
      "The seventh supplier — a small foundry in northern Italy that has worked with one of the studio's reference firms for a generation — could deliver the right alloy. They could not deliver to the Maldives. The studio's logistics partner offered to ship from Genoa via Singapore, which solved the delivery problem and added eleven weeks to the project.",
      "The hinges arrived in March. They were installed in April. They will look exactly like they do today for the first eighteen months. Then they will start to do what bronze does in salt air, which is what the building was designed for.",
      "The detail is small. It also took six months.",
      "Buildings are made out of decisions like this.",
    ],
  },
  {
    slug: "the-quarry-visit",
    date: "March 2025",
    title: "The Quarry Visit",
    teaser:
      "Why every project starts with a trip to the place the stone comes from.",
    cover: "/images/image-03-mediterranean-stone.jpg",
    body: [
      "Every stone project the studio takes on begins with a trip to the quarry. Not the supplier, not the importer, not the showroom — the quarry itself, where the stone is still part of the ground.",
      "It costs the studio four to six days per project. It costs the studio's clients nothing they will see on a budget line. But the trip is non-negotiable.",
      "The quarry tells you what the next forty years will look like. You see the layer the stone is being cut from. You see the next layer down, which is what the next house — somebody else's, in three years — will be cut from. You see the dust, the wet, the moss on the older blocks. You watch the cut. You learn whether the stone is being rushed or whether it is being given the time it asks for.",
      "Most importantly: you meet the people. The studio has worked with the same Andalusian stone family for eleven years. The same Java andesite quarry for nine. The continuity matters. Stone has a memory; quarry families have a memory.",
      "The studio refuses, gently and almost without exception, to specify a stone whose quarry it has not visited.",
    ],
  },
  {
    slug: "why-we-name-projects",
    date: "January 2025",
    title: "Why We Name Projects",
    teaser:
      "Most architects label their work with addresses. The studio doesn't.",
    cover: "/images/image-01-home-hero.jpg",
    body: [
      "Most architects label their work with addresses. *The Cliff House. The Park Avenue Penthouse. The Cape Cod Residence.* Address-as-title is functional but it strips a building of its identity. It says here is where it is, and nothing else.",
      "The studio names every project. The names are short — usually one syllable, drawn from the local language of the place, or from older sacred tongues. Amara is Sanskrit for immortal. Selva is Spanish for jungle. Mei is Japanese for beautiful. Atlas is Greek and mythological. Tahir is Arabic for pure.",
      "The names sit alongside the building's location and typology, not in place of them. *Amara Villa, Ubud, Bali, 2023.* The name carries the spirit; the metadata carries the facts.",
      "This matters because a building is not its location. A building is a particular response to a particular place at a particular moment. To call it by an address flattens it. To name it acknowledges that something distinct was made.",
      "The studio does not name buildings until the project is well underway. The name has to come from the building itself, not be applied to it.",
    ],
  },
  {
    slug: "the-economics-of-slow",
    date: "November 2024",
    title: "The Economics of Slow",
    teaser:
      "Why the studio takes three years on a building that could be built in eighteen months.",
    cover: "/images/image-04-interior-double-height.jpg",
    body: [
      "The standard development cycle for a private residence in the markets the studio works in is twelve to eighteen months from groundbreaking. The studio's average is closer to thirty months.",
      "This costs money. It costs interest, it costs holding fees, it costs a longer construction-loan window. There are weeks where the cost of slow is the cost of a small Mercedes.",
      "The studio still does it.",
      "The reason is simple: the second pour of concrete is always better than the first. The third tile maker you find is usually the right one. The mason you discovered on month nine of a thirty-month build is the mason you keep for the next decade. Speed compounds against you. Patience compounds for you.",
      "The studio has lost two clients to faster firms. It has gained twelve to the same reason — owners who saw a friend's house built in eighteen months and could see, at year three, that the friend's house was already wrong.",
      "Slow is expensive in the short. Slow is the only thing that pays back in the long.",
    ],
  },
  {
    slug: "on-plaster",
    date: "November 2024",
    title: "On Plaster",
    teaser:
      "The studio uses lime plaster despite knowing it cracks. The cracks are the point.",
    cover: "/images/image-02-concrete-wood.jpg",
    body: [
      "The studio uses lime plaster in almost every project, despite knowing it cracks. The cracks are the point.",
      "Hard-set finishes pretend to be permanent. They want the wall to look new tomorrow and ten years from now. They lie about what walls do.",
      "Walls move. Buildings settle. Foundations ride small earthquakes most of us don't feel. Lime acknowledges this. It cracks slightly, in the places where the building has actually moved, and the cracks become a record of the building's life. The patina is a contract between the material and the room.",
      "The studio has clients who, at the start of a project, ask whether the plaster can be made not to crack. There are admixtures that reduce cracking. There are synthetic finishes that mimic plaster's appearance. The studio says no.",
      "The cracks are how you know the wall is alive.",
    ],
  },
  {
    slug: "what-the-site-says-first",
    date: "September 2024",
    title: "What the Site Says First",
    teaser:
      "Three days walking the land before the first sketch. Why the brief comes second.",
    cover: "/images/image-05-modernist-blue.jpg",
    body: [
      "Every project the studio takes on begins with three full days on the land before any drawing is made. No sketches, no measurements, no notebooks except a small one for evening notes.",
      "The first day is loud. You arrive with the brief in your head. The brief is loud. The site can barely get a word in.",
      "The second day, the brief begins to soften. You start to notice the wind direction, the light, the part of the site that is already a path. You notice what the locals don't build on. You notice the slope nobody mentioned.",
      "The third day is the quiet one. By the third day the brief is mostly gone. The site is finally talking. The shape of the building begins to suggest itself — not from the brief, not from the studio's preferences, but from the site itself.",
      "Almost every project begins to draw itself on the third afternoon. Almost.",
      "The clients sometimes ask whether they can come along. The answer is no. The site doesn't speak when the client is on it.",
    ],
  },
  {
    slug: "the-architect-developer-model",
    date: "July 2024",
    title: "The Architect-Developer Model",
    teaser:
      "Why the studio takes equity in roughly half its projects, and what changes when it does.",
    cover: "/images/image-08-cream-villa-column.jpg",
    body: [
      "Roughly half the studio's projects are commissioned by external clients. The other half are conceived, developed, and sold by the studio itself.",
      "The architect-developer model is unusual in residential practice — most architecture firms exist on fee income alone. The studio runs on a mix: design fees from commissioned work, equity returns from developed work.",
      "The point is not the money, though the money allows the rest of it. The point is the freedom. When the studio is its own client, the studio can take risks that no client would commission: a material no one has used in that climate, a span no one has tried, a typology with no proven market. When the building is finished, it becomes the proof.",
      "Three of the studio's most-published projects began this way: nobody asked for them. The studio built them on its own dime, sold two, kept one for the portfolio.",
      "The model has limits. It requires capital, patience, and a tolerance for risk that not every architect has. But for the work that needs proving, there is no other way.",
    ],
  },
];

export function getJournalEntry(slug: string) {
  return journalEntries.find((e) => e.slug === slug);
}
