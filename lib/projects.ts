export type Region = "Bali" | "Costa Rica" | "Maldives" | "Morocco" | "Tokyo";

export type Project = {
  slug: string;
  name: string;
  location: string;
  region: Region;
  typology: string;
  year: number;
  size: string;
  hero: string;
  thumb: string;
  lead: string;
  body: string[];
  materials: { label: string; value: string }[];
  credits: string;
  internalCode: string;
  photoEssay: { src: string; aspect: "16:9" | "4:5" | "1:1" | "3:2"; caption: string }[];
};

export const REGIONS: ("All" | Region)[] = [
  "All",
  "Bali",
  "Costa Rica",
  "Maldives",
  "Morocco",
  "Tokyo",
];

export const projects: Project[] = [
  // === 2025 ===
  {
    slug: "sora-retreat",
    name: "Sora Retreat",
    location: "Bali",
    region: "Bali",
    typology: "Retreat",
    year: 2025,
    size: "1,200 m²",
    hero: "/images/hero.png",
    thumb: "/images/hero.png",
    lead:
      "Sora is a six-pavilion wellness retreat in central Bali, designed and developed by the studio for a hospitality operator. The brief was a retreat that would feel less programmed than a resort and more sustained than a yoga studio.",
    body: [
      "The pavilions are spread across two hectares of terraced rice land. Each pavilion is small — between 40 and 90 square meters — and each is built from a single dominant material: timber, plaster, stone, clay. The materials register as moods.",
      "The shared spaces are a kitchen, a bath, and a meditation hall, connected by stone paths. There is no central reception. Guests arrive at their pavilion directly. There are no televisions. There is no gym.",
      "The studio took an equity position in the operator. Sora is open to bookings; long-stay enquiries are welcome.",
    ],
    materials: [
      { label: "Pavilion 01", value: "Locally-milled hardwood timber" },
      { label: "Pavilion 02", value: "Hand-troweled lime plaster on bamboo frame" },
      { label: "Pavilion 03", value: "Andesite stone (Javanese)" },
      { label: "Pavilion 04", value: "Rammed earth and clay" },
      { label: "Pavilion 05", value: "Pale oak and bronze" },
      { label: "Pavilion 06", value: "Concrete and travertine" },
      { label: "Shared baths", value: "Volcanic stone, hand-carved" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen · Local construction by Studio Saputra",
    internalCode: "JM-25-01",
    photoEssay: [
      { src: "/images/brand/bali-22.jpeg", aspect: "16:9", caption: "Pavilion 01 — looking south toward the rice terraces and the river below." },
      { src: "/images/image-07-slatted-wood-facade.jpg", aspect: "4:5", caption: "Pavilion 01 — locally-milled hardwood. The screens close in the wet season." },
      { src: "/images/brand/plaster-wedge.jpeg", aspect: "4:5", caption: "Pavilion 02 — hand-troweled lime plaster on bamboo frame." },
      { src: "/images/image-03-mediterranean-stone.jpg", aspect: "3:2", caption: "Pavilion 03 — Javanese andesite, hand-laid by a single mason over six months." },
      { src: "/images/brand/travertine-22.jpeg", aspect: "4:5", caption: "Pavilion 06 — board-formed concrete and travertine." },
      { src: "/images/image-04-interior-double-height.jpg", aspect: "4:5", caption: "Pavilion 05 — pale oak interior. The skylight tracks the day." },
      { src: "/images/brand/detail-04.jpg", aspect: "4:5", caption: "Shared bath — volcanic stone tub carved on site." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "16:9", caption: "Approach to the meditation hall at dusk." },
    ],
  },
  {
    slug: "kura-pavilion",
    name: "Kura Pavilion",
    location: "Canggu, Bali",
    region: "Bali",
    typology: "Pavilion",
    year: 2025,
    size: "320 m²",
    hero: "/images/image-08-cream-villa-column.jpg",
    thumb: "/images/image-08-cream-villa-column.jpg",
    lead:
      "Kura is a single-volume pavilion on the Canggu coast of Bali. It was designed for an Australian client who wanted a building that asks for nothing — no air conditioning, no electronic locks, no televisions.",
    body: [
      "The pavilion is a 24-meter span supported on six cleft-basalt piers. The roof is a deep ironwood overhang shading a polished concrete deck. The walls are minimal — full-height bronze-framed glazing on three sides, a single solid wall to the west.",
      "Inside, the floor is paras kerobokan stone, hand-cleft on site. Lime plaster ceiling, hand-troweled. A single sunken bath of carved volcanic stone sits in the eastern bay.",
      "The pavilion sits forty meters from the surf line. Salt air will patinate the bronze in two years.",
    ],
    materials: [
      { label: "Structure", value: "Cleft basalt piers · Ironwood span beam" },
      { label: "Walls", value: "Bronze-framed glazing · Hand-troweled lime plaster" },
      { label: "Floor", value: "Paras kerobokan stone, cleft on site" },
      { label: "Bath", value: "Carved volcanic stone, sunken" },
      { label: "Roof", value: "Ironwood deck with copper underlayment" },
    ],
    credits: "Photography by Joachim Wichmann · Local construction by Studio Saputra",
    internalCode: "JM-25-02",
    photoEssay: [
      { src: "/images/brand/bali-22.jpeg", aspect: "16:9", caption: "The pavilion from the beach approach. A 24-meter span on six basalt piers." },
      { src: "/images/brand/detail-06.jpg", aspect: "4:5", caption: "Cleft-basalt pier detail. The salt air will patina the bronze in two years." },
      { src: "/images/brand/plaster-wedge.jpeg", aspect: "4:5", caption: "Interior, looking east. Hand-troweled lime plaster ceiling overhead." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "16:9", caption: "Dusk. The deep ironwood overhang reads horizontal across the deck." },
      { src: "/images/image-03-mediterranean-stone.jpg", aspect: "3:2", caption: "Paras kerobokan stone floor, hand-cleft on site." },
      { src: "/images/brand/detail-04.jpg", aspect: "4:5", caption: "Sunken volcanic-stone tub in the eastern bay." },
    ],
  },
  {
    slug: "cana-house",
    name: "Cana House",
    location: "Cabo Blanco, Costa Rica",
    region: "Costa Rica",
    typology: "Residence",
    year: 2025,
    size: "460 m²",
    hero: "/images/image-04-interior-double-height.jpg",
    thumb: "/images/image-04-interior-double-height.jpg",
    lead:
      "Cana sits at the southern tip of the Nicoya Peninsula, ten meters above the Pacific. The site was once a small banana plantation; the building keeps the name.",
    body: [
      "The structure is platform-built on a single concrete plinth. Three pavilions of locally-milled cocobolo timber are connected by raised walkways. The roofs are low-pitched and clad in standing-seam copper.",
      "The walls are operable timber screens. In the dry season the house breathes through itself. In the wet season the screens close and the building becomes a series of dim, paper-lined rooms.",
      "The clients are a writer and a marine biologist. There is no air conditioning, by request.",
    ],
    materials: [
      { label: "Structure", value: "Concrete plinth · Locally-milled cocobolo" },
      { label: "Walls", value: "Operable timber screens · Lime-washed clay infill" },
      { label: "Roof", value: "Standing-seam copper, untreated" },
      { label: "Floors", value: "Polished concrete · Hand-laid clay tile" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen",
    internalCode: "JM-25-03",
    photoEssay: [
      { src: "/images/image-04-interior-double-height.jpg", aspect: "16:9", caption: "Three pavilions on a single concrete plinth, ten meters above the Pacific." },
      { src: "/images/image-07-slatted-wood-facade.jpg", aspect: "4:5", caption: "Operable cocobolo screens. In the dry season the house breathes through itself." },
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "4:5", caption: "Connecting walkway between sleeping pavilions." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "16:9", caption: "Living pavilion. The forest stays loud through the screens." },
      { src: "/images/brand/detail-03.jpg", aspect: "3:2", caption: "Polished concrete and lime-washed clay infill." },
      { src: "/images/brand/detail-08.jpg", aspect: "4:5", caption: "Hand-laid clay tile in the kitchen pavilion." },
    ],
  },
  {
    slug: "aster-pavilion",
    name: "Aster Pavilion",
    location: "Baa Atoll, Maldives",
    region: "Maldives",
    typology: "Pavilion",
    year: 2025,
    size: "240 m²",
    hero: "/images/image-04-interior-double-height.jpg",
    thumb: "/images/image-04-interior-double-height.jpg",
    lead:
      "Aster is the south-bay companion to Tahir — same studio, same atoll, three years later. The brief was a guesthouse intentionally smaller and quieter than its older sibling.",
    body: [
      "A single 18-meter span on three stone piers. The roof is a low-pitched timber overhang in untreated teak. The walls are entirely glass on three sides, with a single solid wall to the west holding the bath.",
      "Inside, pale oak floor in a single direction across the span. Hand-troweled lime plaster ceiling. A carved volcanic-stone tub in the eastern bay, identical to Tahir's.",
      "Aster opens for stays in late 2025.",
    ],
    materials: [
      { label: "Structure", value: "Cast-in-place stone piers · Untreated teak span" },
      { label: "Walls", value: "Bronze-framed glazing · Single lime-plastered wall" },
      { label: "Floor", value: "Pale oak (single span direction)" },
      { label: "Bath", value: "Carved local volcanic stone" },
    ],
    credits: "Photography by Joachim Wichmann",
    internalCode: "JM-25-04",
    photoEssay: [
      { src: "/images/brand/maldives-cover.jpeg", aspect: "16:9", caption: "Aster across the lagoon. An 18-meter span on three stone piers." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "4:5", caption: "Untreated teak overhang, 5-degree pitch — flat enough to read horizontal." },
      { src: "/images/brand/detail-09.jpg", aspect: "4:5", caption: "Pale oak floor in a single span direction. Identical to Tahir's." },
      { src: "/images/image-05-modernist-blue.jpg", aspect: "16:9", caption: "Glass walls on three sides — there is no neighbor for two kilometers." },
      { src: "/images/brand/detail-07.jpg", aspect: "3:2", caption: "Bronze-framed glazing detail. Patinates slowly in the salt air." },
      { src: "/images/brand/detail-04.jpg", aspect: "4:5", caption: "Carved volcanic-stone tub in the eastern bay." },
    ],
  },

  // === 2024 ===
  {
    slug: "mei-residence",
    name: "Mei Residence",
    location: "Aoyama, Tokyo",
    region: "Tokyo",
    typology: "Townhouse",
    year: 2024,
    size: "195 m²",
    hero: "/images/image-02-concrete-wood.jpg",
    thumb: "/images/image-02-concrete-wood.jpg",
    lead:
      "Mei is a three-story townhouse on a 4-meter-wide lot in Aoyama, Tokyo. The brief was a city home that would feel rural in proportion and material.",
    body: [
      "The footprint is constrained — 4 by 16 meters — and the building works vertically. A board-formed concrete street facade holds a single deep-set bronze door. Inside, the staircase is the spine; rooms open from it on each level.",
      "The walls are bone-tone hand-troweled plaster. The stairs are solid pale oak. A central skylight delivers daylight through the full height of the stairwell. On overcast days the skylight is the brightest object in the house. On clear days the building keeps light moving through it from above.",
      "The clients are a Japanese family — a father, mother, one child — returning to Tokyo after a decade in London. The kitchen sits on the top floor, beside the small roof terrace.",
    ],
    materials: [
      { label: "Facade", value: "Board-formed concrete · Bronze entry door" },
      { label: "Walls", value: "Hand-troweled lime plaster" },
      { label: "Floors", value: "Pale oak (all levels)" },
      { label: "Stair", value: "Solid pale oak treads on concrete risers" },
      { label: "Skylight", value: "Bronze-framed, low-iron, fixed" },
    ],
    credits: "Photography by Joachim Wichmann · Local construction by Aoyama Build",
    internalCode: "JM-24-04",
    photoEssay: [
      { src: "/images/brand/concrete-manifesto.jpeg", aspect: "16:9", caption: "Street facade. Board-formed concrete with the Javanese teak grain pressed into the surface." },
      { src: "/images/brand/corridor.jpeg", aspect: "4:5", caption: "The stairwell is the spine. Rooms open from it on each level." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "4:5", caption: "Facade at dusk. The single bronze door deepens with use." },
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "3:2", caption: "Approach down the Aoyama lane." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Top-floor kitchen at the roof terrace." },
      { src: "/images/brand/detail-02.jpg", aspect: "4:5", caption: "Skylight detail. Bronze-framed, low-iron, fixed." },
    ],
  },
  {
    slug: "selva-house",
    name: "Selva House",
    location: "Nicoya, Costa Rica",
    region: "Costa Rica",
    typology: "Residence",
    year: 2024,
    size: "510 m²",
    hero: "/images/image-07-slatted-wood-facade.jpg",
    thumb: "/images/image-07-slatted-wood-facade.jpg",
    lead:
      "Selva House sits in dense secondary jungle on Costa Rica's Nicoya Peninsula, ninety minutes from any paved road. The brief was a house that would let the forest stay loud.",
    body: [
      "The structure is platform-built. A single concrete plinth holds three pavilions of locally-milled guanacaste timber, connected by raised walkways. The roofs are low-pitched and clad in copper that the climate will rapidly patina.",
      "The walls are timber screens. Half are operable; the rest are fixed. In the dry season the house breathes through itself. In the wet season the screens close and the building becomes a series of dim, paper-lined rooms.",
      "There is no air conditioning. The clients — a couple from California, a writer and a marine biologist — asked for it not to be installed. The house was designed for them, not against the climate.",
    ],
    materials: [
      { label: "Structure", value: "Concrete plinth · Locally-milled guanacaste timber" },
      { label: "Walls", value: "Operable timber screens · Lime-washed clay infill" },
      { label: "Roof", value: "Standing-seam copper, untreated" },
      { label: "Floors", value: "Concrete (polished) · Hand-laid clay tile" },
      { label: "Hardware", value: "Forged steel, oxidized" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen",
    internalCode: "JM-24-02",
    photoEssay: [
      { src: "/images/image-07-slatted-wood-facade.jpg", aspect: "16:9", caption: "Eastern pavilion. Operable timber screens close in the wet season." },
      { src: "/images/brand/detail-03.jpg", aspect: "4:5", caption: "Concrete plinth. The forest came right up to the foundation pour." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Living pavilion. Polished concrete floor, screens half-open in the dry season." },
      { src: "/images/image-05-modernist-blue.jpg", aspect: "16:9", caption: "Approach. The road becomes a path forty meters before the house." },
      { src: "/images/brand/detail-08.jpg", aspect: "4:5", caption: "Stair to the upper deck. Hand-forged steel, oxidized in place." },
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "3:2", caption: "Connecting walkway between sleeping pavilions." },
    ],
  },
  {
    slug: "vela-pavilion",
    name: "Vela Pavilion",
    location: "Baa Atoll, Maldives",
    region: "Maldives",
    typology: "Pavilion",
    year: 2024,
    size: "195 m²",
    hero: "/images/image-05-modernist-blue.jpg",
    thumb: "/images/image-05-modernist-blue.jpg",
    lead:
      "Vela is a single overwater pavilion on the north reef of the Baa Atoll. The studio designed it as a study in horizon: nothing visible from the bed except sky and water.",
    body: [
      "The pavilion is a 20-meter span supported on three stone piers. The roof is a deep timber overhang at 5 degrees — flat enough to read as horizontal, pitched enough to shed monsoon rain.",
      "Walls are bronze-framed full-height glazing on all four sides. There is no privacy; there is no neighbor for two kilometers in any direction.",
      "The pavilion is owned by an Italian client who visits twice a year. The rest of the time it is closed and waiting.",
    ],
    materials: [
      { label: "Structure", value: "Cast-in-place stone piers · Timber span beam" },
      { label: "Walls", value: "Bronze-framed glazing on all sides" },
      { label: "Floor", value: "Pale oak in a single direction" },
      { label: "Roof", value: "Timber decking, low-pitch copper underlayment" },
    ],
    credits: "Photography by Joachim Wichmann",
    internalCode: "JM-24-05",
    photoEssay: [
      { src: "/images/brand/maldives-cover.jpeg", aspect: "16:9", caption: "The pavilion at sunset. Nothing visible from the bed except sky and water." },
      { src: "/images/brand/detail-07.jpg", aspect: "4:5", caption: "Bronze-framed full-height glazing on all four sides." },
      { src: "/images/image-04-interior-double-height.jpg", aspect: "4:5", caption: "Pale oak floor in a single direction across the span." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "16:9", caption: "Three stone piers seen from the water at low tide." },
      { src: "/images/brand/detail-05.jpg", aspect: "3:2", caption: "Timber overhang detail. Copper underlayment for the monsoon." },
      { src: "/images/image-09-black-stone-warm-wood.jpg", aspect: "4:5", caption: "Interior at dawn. The closed seasons leave it waiting." },
    ],
  },
  {
    slug: "riad-sanara",
    name: "Riad Sanara",
    location: "Marrakech medina, Morocco",
    region: "Morocco",
    typology: "Riad",
    year: 2024,
    size: "380 m²",
    hero: "/images/image-08-cream-villa-column.jpg",
    thumb: "/images/image-08-cream-villa-column.jpg",
    lead:
      "Sanara is a 17th-century riad in the Marrakech medina, restored and reordered by the studio for a Belgian collector. Three of the original four walls were kept; everything else was rebuilt.",
    body: [
      "The central courtyard was opened to the sky and re-tiled in zellige sourced from Fez. The orange tree at the center is older than the building.",
      "Internal walls are tadelakt-finished, polished and waxed in the traditional method. The original cedar ceilings were repaired by a single craftsman over four months.",
      "The riad sleeps six. Five rooms surround the courtyard; the sixth is a roof terrace under the call to prayer.",
    ],
    materials: [
      { label: "Walls", value: "Restored original stone · Tadelakt finish" },
      { label: "Floors", value: "Hand-cut zellige (Fez)" },
      { label: "Ceiling", value: "Original cedar, repaired" },
      { label: "Hardware", value: "Hand-forged brass" },
    ],
    credits: "Photography by Salva López",
    internalCode: "JM-24-06",
    photoEssay: [
      { src: "/images/brand/mallorca-mark.jpeg", aspect: "16:9", caption: "Central courtyard, opened to the sky. The orange tree predates the building." },
      { src: "/images/image-03-mediterranean-stone.jpg", aspect: "4:5", caption: "Hand-cut zellige tile, sourced from a single workshop in Fez." },
      { src: "/images/brand/detail-01.jpg", aspect: "4:5", caption: "Tadelakt-finished walls — polished and waxed in the traditional method." },
      { src: "/images/brand/corridor.jpeg", aspect: "16:9", caption: "Hallway between courtyard and the roof stair." },
      { src: "/images/brand/detail-09.jpg", aspect: "3:2", caption: "Original cedar ceiling, repaired by a single craftsman over four months." },
      { src: "/images/brand/detail-10.jpg", aspect: "4:5", caption: "Hand-forged brass hardware. Each piece is unique." },
    ],
  },
  {
    slug: "vista-house",
    name: "Vista House",
    location: "Uluwatu, Bali",
    region: "Bali",
    typology: "Residence",
    year: 2024,
    size: "620 m²",
    hero: "/images/image-09-black-stone-warm-wood.jpg",
    thumb: "/images/image-09-black-stone-warm-wood.jpg",
    lead:
      "Vista House sits on a sea cliff in Uluwatu, fifty meters above the Indian Ocean. The brief was a house that would treat the cliff as the front yard.",
    body: [
      "The structure is anchored to the cliff edge by a single concrete plinth. Walls are dark Javanese andesite, hand-laid by a mason from Yogyakarta. The roof is low-pitched zinc, dark patina, designed to disappear at distance.",
      "Floors throughout are honed travertine. The pool is a 22-meter lap, cantilevered over the cliff edge with bronze-framed glass on the seaward face.",
      "The clients are a hospitality family from Singapore. The house functions as a private residence eleven months of the year and as a pop-up retreat for the twelfth.",
    ],
    materials: [
      { label: "Walls", value: "Javanese andesite · Hand-troweled lime plaster" },
      { label: "Floors", value: "Honed travertine throughout" },
      { label: "Roof", value: "Standing-seam zinc, dark patina" },
      { label: "Glazing", value: "Bronze-framed, low-iron" },
      { label: "Pool", value: "Cantilevered, bronze-glass front" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen",
    internalCode: "JM-24-07",
    photoEssay: [
      { src: "/images/image-09-black-stone-warm-wood.jpg", aspect: "16:9", caption: "The cliff edge is the front yard. Fifty meters above the Indian Ocean." },
      { src: "/images/image-03-mediterranean-stone.jpg", aspect: "4:5", caption: "Dark Javanese andesite, hand-laid by a mason from Yogyakarta." },
      { src: "/images/brand/travertine-22.jpeg", aspect: "4:5", caption: "Honed travertine floors throughout — interior continues to terrace." },
      { src: "/images/brand/bali-22.jpeg", aspect: "16:9", caption: "The 22-meter cantilevered lap pool, bronze-framed glass on the seaward face." },
      { src: "/images/brand/detail-06.jpg", aspect: "3:2", caption: "Standing-seam zinc roof in dark patina — designed to disappear at distance." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Living volume opens fully to the cliff edge." },
    ],
  },
  {
    slug: "atlas-annex",
    name: "Atlas Annex",
    location: "Ourika Valley, Morocco",
    region: "Morocco",
    typology: "Residence",
    year: 2024,
    size: "320 m²",
    hero: "/images/image-03-mediterranean-stone.jpg",
    thumb: "/images/image-03-mediterranean-stone.jpg",
    lead:
      "Atlas Annex is the studio's second project for the same Marrakech client — a guesthouse on the same property as Atlas House, half an hour up the Ourika Valley.",
    body: [
      "The annex is rammed earth, sourced from the same site as the main house. Walls are 50 centimeters thick and warm to the touch in winter, cool in summer.",
      "Two bedrooms, a shared bath, a small kitchen, and a terrace looking up the valley toward the High Atlas snowline.",
      "The annex was completed in fourteen months — fast for the studio, but the rammed-earth crew were the same team from Atlas House, which made the schedule possible.",
    ],
    materials: [
      { label: "Walls", value: "Rammed earth (site-sourced)" },
      { label: "Floors", value: "Tadelakt-polished concrete" },
      { label: "Roof", value: "Cedar timber structure · Clay tile" },
      { label: "Windows", value: "Cedar frames, single glazed" },
    ],
    credits: "Photography by Salva López",
    internalCode: "JM-24-08",
    photoEssay: [
      { src: "/images/brand/mallorca-mark.jpeg", aspect: "16:9", caption: "The annex tucked into the valley slope, looking up to the snowline." },
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "4:5", caption: "Rammed earth, sourced from the same site as Atlas House." },
      { src: "/images/brand/detail-01.jpg", aspect: "4:5", caption: "50-centimeter-thick walls. Warm in winter, cool in summer." },
      { src: "/images/image-04-interior-double-height.jpg", aspect: "16:9", caption: "Terrace, late afternoon. The High Atlas catches the last light." },
      { src: "/images/brand/detail-05.jpg", aspect: "3:2", caption: "Tadelakt-polished concrete floor in the shared bath." },
      { src: "/images/brand/detail-10.jpg", aspect: "4:5", caption: "Cedar window frame, single glazed. The climate permits it." },
    ],
  },
  {
    slug: "kotori-house",
    name: "Kotori House",
    location: "Setagaya, Tokyo",
    region: "Tokyo",
    typology: "Residence",
    year: 2024,
    size: "220 m²",
    hero: "/images/image-02-concrete-wood.jpg",
    thumb: "/images/image-02-concrete-wood.jpg",
    lead:
      "Kotori is a two-story residence in a quiet Setagaya neighborhood. The brief was a house that would feel slow in a city that moves fast.",
    body: [
      "The street facade is a single board-formed concrete wall with no openings except a deep-set bronze door. From the street, the house looks like it could be a small private museum.",
      "Inside, the building turns inward around a central garden no larger than a single tatami mat. Every room sees the garden. The garden has one tree — a Japanese maple, ten years old.",
      "Floors throughout are pale oak. Walls are hand-troweled plaster in bone tone. The clients are a couple in their fifties; the children have left home.",
    ],
    materials: [
      { label: "Facade", value: "Board-formed concrete · Bronze door" },
      { label: "Walls", value: "Hand-troweled lime plaster" },
      { label: "Floors", value: "Pale oak" },
      { label: "Garden", value: "Japanese maple, mossed stone" },
    ],
    credits: "Photography by Joachim Wichmann",
    internalCode: "JM-24-09",
    photoEssay: [
      { src: "/images/brand/concrete-manifesto.jpeg", aspect: "16:9", caption: "Street facade. From the lane, the house could be a small private museum." },
      { src: "/images/brand/detail-02.jpg", aspect: "4:5", caption: "Single deep-set bronze door — the only opening on the street side." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Every room sees the central garden — no larger than a tatami mat." },
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "16:9", caption: "Garden, single Japanese maple. Ten years old when planted." },
      { src: "/images/brand/detail-08.jpg", aspect: "3:2", caption: "Pale oak floors throughout. Bone-tone hand-troweled plaster on the walls." },
      { src: "/images/brand/detail-04.jpg", aspect: "4:5", caption: "Mossed stone at the edge of the garden." },
    ],
  },

  // === 2023 ===
  {
    slug: "atlas-house",
    name: "Atlas House",
    location: "Marrakech, Morocco",
    region: "Morocco",
    typology: "Residence",
    year: 2023,
    size: "620 m²",
    hero: "/images/image-03-mediterranean-stone.jpg",
    thumb: "/images/image-03-mediterranean-stone.jpg",
    lead:
      "Atlas House sits at the edge of an old olive grove forty minutes south of Marrakech, with the High Atlas mountains on the horizon. The site had a half-ruined nineteenth-century farm building. The studio kept what stood and built around it.",
    body: [
      "The new construction is rammed earth, sourced from the site itself. The walls are 60 centimeters thick and warm to the touch in winter, cool in summer — the climate-control system the building came with.",
      "Internal floors are tadelakt-finished, polished smooth and slightly waxed. The original stone walls of the farm building were repaired and folded into the new plan; they are visible in the master bedroom and the western courtyard.",
      "The brief was for a house the clients could leave and return to without staff in residence. Every system in the building can be shut down with a single switch. When they return, the building returns with them.",
    ],
    materials: [
      { label: "Walls", value: "Rammed earth (site-sourced) · Restored original stone" },
      { label: "Floors", value: "Tadelakt-polished concrete" },
      { label: "Roof", value: "Cedar timber structure · Clay tile" },
      { label: "Hardware", value: "Hand-forged steel, oxidized" },
      { label: "Windows", value: "Cedar frames, single glazed (the climate permits)" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen",
    internalCode: "JM-23-02",
    photoEssay: [
      { src: "/images/brand/mallorca-mark.jpeg", aspect: "16:9", caption: "Western courtyard. The original nineteenth-century stone wall is on the right; the new rammed-earth wall on the left." },
      { src: "/images/image-08-cream-villa-column.jpg", aspect: "4:5", caption: "South-facing terrace, looking toward the High Atlas." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Living room. Tadelakt floors, cedar ceiling, no air conditioning needed." },
      { src: "/images/image-05-modernist-blue.jpg", aspect: "16:9", caption: "Approach through the olive grove. The house disappears into the slope." },
      { src: "/images/brand/detail-01.jpg", aspect: "3:2", caption: "Western façade. Rammed earth, sourced from the site itself." },
      { src: "/images/brand/travertine-22.jpeg", aspect: "4:5", caption: "Master bedroom — the original stone wall as headboard." },
    ],
  },
  {
    slug: "amara-villa",
    name: "Amara Villa",
    location: "Ubud, Bali",
    region: "Bali",
    typology: "Residence",
    year: 2023,
    size: "740 m²",
    hero: "/images/image-01-home-hero.jpg",
    thumb: "/images/image-01-home-hero.jpg",
    lead:
      "Amara sits on a north-facing slope in Ubud, where the rice terraces fold down toward the Petanu river. The site asked for a building that would not interrupt — that would, instead, let the geometry of the terraces continue across its roof and its walls.",
    body: [
      "The structure is concrete poured in board-formed lifts. The boards came from a single batch of Javanese teak, and the grain is visible in every wall. Inside, lime plaster softens the rooms; the floors are pale oak, lightly oiled. The doors are bronze and patinate slowly.",
      "The villa is single-story. The plan steps with the slope, three rooms wide and seven rooms long, opening south to a long pool that reads as a continuation of the river below. The roof is a single low pitch, set low enough that the rice fields above it remain the dominant horizon.",
      "The clients are a Singapore-based family with three children. They asked for quiet rooms, deep eaves, and a kitchen that the eight-year-old could cook in. The studio designed the kitchen around her reach.",
      "The villa was completed in two years. It will look better in twenty.",
    ],
    materials: [
      { label: "Walls", value: "Board-formed concrete (Javanese teak forms) · Hand-troweled lime plaster" },
      { label: "Floors", value: "Pale oak (lightly oiled) · Honed travertine" },
      { label: "Doors", value: "Solid bronze · Pale oak" },
      { label: "Hardware", value: "Hand-cast bronze" },
      { label: "Roof", value: "Standing-seam zinc, dark patina" },
      { label: "Glazing", value: "Bronze-framed, low-iron" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen · Engineering by Anglo-Eastern · Local construction by Studio Saputra",
    internalCode: "JM-23-04",
    photoEssay: [
      { src: "/images/image-01-home-hero.jpg", aspect: "16:9", caption: "South facade at first light. Pool runs the full length of the plan." },
      { src: "/images/brand/concrete-manifesto.jpeg", aspect: "4:5", caption: "Board-formed concrete with Javanese teak grain pressed into the surface." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Living volume opens to the rice terraces." },
      { src: "/images/brand/bali-22.jpeg", aspect: "16:9", caption: "Western courtyard at golden hour." },
      { src: "/images/brand/travertine-22.jpeg", aspect: "3:2", caption: "Travertine and oak — the floor reads as a single surface." },
      { src: "/images/brand/plaster-wedge.jpeg", aspect: "4:5", caption: "Dusk. Lime plaster reflects the changing sky." },
    ],
  },
  {
    slug: "hana-townhouse",
    name: "Hana Townhouse",
    location: "Shibuya, Tokyo",
    region: "Tokyo",
    typology: "Townhouse",
    year: 2023,
    size: "168 m²",
    hero: "/images/image-06-white-villa-dusk.jpg",
    thumb: "/images/image-06-white-villa-dusk.jpg",
    lead:
      "Hana is the studio's first Tokyo project — a narrow townhouse on a 3.6-meter-wide lot off Cat Street, Shibuya. The site is loud; the building had to be quiet.",
    body: [
      "The street facade is a single board-formed concrete wall, six meters tall, with one slit-window at eye level for the entrance and no other openings. Inside, the building opens around a tiny inner courtyard.",
      "The floors are pale oak. The walls are hand-troweled plaster in bone tone. Every doorway is built to the proportions of the family's tallest member, the father, with a 5cm head clearance.",
      "Hana opened the studio's Tokyo presence. Mei followed, then Kotori. The Aoyama Build crew has worked on all three.",
    ],
    materials: [
      { label: "Facade", value: "Board-formed concrete · Bronze entry" },
      { label: "Walls", value: "Hand-troweled lime plaster" },
      { label: "Floors", value: "Pale oak" },
      { label: "Courtyard", value: "Mossed stone, single Japanese maple" },
    ],
    credits: "Photography by Joachim Wichmann · Local construction by Aoyama Build",
    internalCode: "JM-23-05",
    photoEssay: [
      { src: "/images/brand/concrete-manifesto.jpeg", aspect: "16:9", caption: "Street facade off Cat Street. Six meters tall, one slit-window for the entrance." },
      { src: "/images/brand/detail-02.jpg", aspect: "4:5", caption: "Board-formed concrete with the form lines deliberately preserved." },
      { src: "/images/image-08-cream-villa-column.jpg", aspect: "4:5", caption: "Inner courtyard, mossed stone, single Japanese maple." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "16:9", caption: "Living room. Pale oak floor; bone-tone hand-troweled plaster." },
      { src: "/images/brand/corridor.jpeg", aspect: "3:2", caption: "Stair to the second floor. Doorways built to the father's height plus 5cm." },
      { src: "/images/brand/detail-09.jpg", aspect: "4:5", caption: "Bronze entry slit. The only opening between street and interior." },
    ],
  },
  {
    slug: "roca-house",
    name: "Roca House",
    location: "Santa Teresa, Costa Rica",
    region: "Costa Rica",
    typology: "Residence",
    year: 2023,
    size: "540 m²",
    hero: "/images/image-10-modernist-suburban.jpg",
    thumb: "/images/image-10-modernist-suburban.jpg",
    lead:
      "Roca House is the studio's first Costa Rica project — built two years before Selva and Cana, in a quieter pocket of the Nicoya Peninsula above Santa Teresa.",
    body: [
      "Single-story concrete plinth, three timber pavilions, copper roof. The pattern that became Selva began here.",
      "Walls are local guanacaste timber, fixed in three pavilions and operable in a fourth. The fourth is the children's pavilion; the screens close when they sleep.",
      "The clients are a Mexican family who spend three months a year on site. The rest of the time the house is rented to the studio's reference list.",
    ],
    materials: [
      { label: "Structure", value: "Concrete plinth · Guanacaste timber" },
      { label: "Walls", value: "Operable timber screens · Lime-washed clay" },
      { label: "Roof", value: "Standing-seam copper" },
      { label: "Floors", value: "Polished concrete" },
    ],
    credits: "Photography by Jonas Bjerre-Poulsen",
    internalCode: "JM-23-06",
    photoEssay: [
      { src: "/images/image-10-modernist-suburban.jpg", aspect: "16:9", caption: "Four pavilions on a single concrete plinth. The pattern that became Selva began here." },
      { src: "/images/image-07-slatted-wood-facade.jpg", aspect: "4:5", caption: "Operable guanacaste screens — the children's pavilion closes when they sleep." },
      { src: "/images/brand/detail-03.jpg", aspect: "4:5", caption: "Polished concrete throughout. Lime-washed clay infill at the walls." },
      { src: "/images/image-05-modernist-blue.jpg", aspect: "16:9", caption: "Standing-seam copper roof, two years into its patina." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "3:2", caption: "Living pavilion at dusk. Screens half-open in the dry season." },
      { src: "/images/brand/detail-08.jpg", aspect: "4:5", caption: "Connecting walkway between pavilions. Forged steel railings." },
    ],
  },

  // === 2022 ===
  {
    slug: "tahir-pavilion",
    name: "Tahir Pavilion",
    location: "Baa Atoll, Maldives",
    region: "Maldives",
    typology: "Pavilion",
    year: 2022,
    size: "220 m²",
    hero: "/images/hero-luxury-cover.jpeg",
    thumb: "/images/hero-luxury-cover.jpeg",
    lead:
      "Tahir is a single overwater pavilion on a small private island in the Baa Atoll. The brief was a guesthouse that would feel less like a hotel room and more like a borrowed building.",
    body: [
      "The pavilion is a single 22-meter span, supported on four stone piers driven through the reef shelf. The roof is a deep timber overhang shading a polished concrete deck. The walls are minimal — full-height bronze-framed glazing on three sides, a single solid wall to the west.",
      "Inside, the floor is pale oak laid in a single direction across the entire span. Lime plaster ceiling, hand-troweled. A single ceramic tub carved from local volcanic stone occupies the eastern bay.",
      "The pavilion is rented by the night. The studio retained the design as a portfolio piece and a study in spans.",
    ],
    materials: [
      { label: "Structure", value: "Cast-in-place stone piers · Timber span beam" },
      { label: "Walls", value: "Bronze-framed glazing · Single lime-plastered wall" },
      { label: "Floor", value: "Pale oak (single span direction)" },
      { label: "Bath", value: "Carved local volcanic stone" },
      { label: "Roof", value: "Timber decking with copper underlayment" },
    ],
    credits: "Photography by Joachim Wichmann",
    internalCode: "JM-22-01",
    photoEssay: [
      { src: "/images/brand/maldives-cover.jpeg", aspect: "16:9", caption: "The pavilion at first light. Twenty-two-meter span, four stone piers." },
      { src: "/images/image-06-white-villa-dusk.jpg", aspect: "4:5", caption: "West-facing, evening. The single solid wall holds the bath behind it." },
      { src: "/images/brand/livingroom-22.jpeg", aspect: "4:5", caption: "Interior. Pale oak floor in a single direction across the span." },
      { src: "/images/image-08-cream-villa-column.jpg", aspect: "16:9", caption: "Looking south. The roof's deep overhang shades the polished concrete deck." },
      { src: "/images/brand/detail-06.jpg", aspect: "3:2", caption: "Reflection in the lagoon at dawn." },
      { src: "/images/brand/detail-07.jpg", aspect: "4:5", caption: "Bronze-framed glazing detail. Patinates slowly in the salt air." },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : projects[projects.length - 1],
    next: idx < projects.length - 1 ? projects[idx + 1] : projects[0],
  };
}
