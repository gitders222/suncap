const products = [
  {
    _id: "001",
    name: "Klassisk Norsk Genser",
    description: "Vår bestselgende genser laget av 100% merinoull. Perfekt for kalde vinterdager, med en tradisjonell norsk design som aldri går av moten.",
    price: 899,
    discount: 0,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlYXRlcnxlbnwwfHwwfHx8MA%3D%3D",
    additionalImages: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlYXRlciUyMGRldGFpbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN3ZWF0ZXIlMjBjbG9zZXVwfGVufDB8fDB8fHww"
    ],
    features: [
      "100% merinoull fra norske sauer",
      "Håndlaget i Norge",
      "Pustende og vannavvisende",
      "Varmer selv når den blir våt"
    ],
    specifications: {
      "Materiale": "100% merinoull",
      "Vekt": "400g",
      "Vedlikehold": "Håndvask eller skånsom maskinvask",
      "Opprinnelse": "Norge"
    },
    stock: 25,
    sku: "NG-001-BLK",
    featured: true,
    isActive: true,
    reviews: [
      {
        name: "Anders Haugen",
        rating: 5,
        comment: "Fantastisk kvalitet og veldig varm. Perfekt for fjellturer!",
        date: "2023-10-15"
      },
      {
        name: "Maria Johansen",
        rating: 4,
        comment: "Pen design og god kvalitet. Litt klø, men det er forventet med ull.",
        date: "2023-09-22"
      }
    ],
    rating: 4.5,
    numReviews: 2
  },
  {
    _id: "002",
    name: "Norske Ullsokker",
    description: "Tykke og komfortable ullsokker laget for å holde føttene varme selv i de kaldeste vinterforholdene. Perfekt for hytteturer og lange vandringer.",
    price: 199,
    discount: 0,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1586350977771-b3714d58f2fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvb2wlMjBzb2Nrc3xlbnwwfHwwfHx8MA%3D%3D",
    additionalImages: [
      "https://images.unsplash.com/photo-1606755371853-c601e3a78b11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vbCUyMHNvY2tzfGVufDB8fDB8fHww"
    ],
    features: [
      "80% ull og 20% nylon for holdbarhet",
      "Forsterket hæl og tå",
      "Puster og regulerer temperatur",
      "Antibakteriell"
    ],
    specifications: {
      "Materiale": "80% ull, 20% nylon",
      "Størrelser": "36-46",
      "Vedlikehold": "Maskinvask 30°C",
      "Opprinnelse": "Norge"
    },
    stock: 150,
    sku: "US-002-GRY",
    featured: false,
    isActive: true,
    reviews: [
      {
        name: "Kristian Berg",
        rating: 5,
        comment: "Beste sokkene jeg har hatt. Bruker de hver vinter.",
        date: "2023-11-10"
      }
    ],
    rating: 5,
    numReviews: 1
  },
  {
    _id: "003",
    name: "Fjellsko Ekstrem",
    description: "Robuste fjellsko utviklet for de tøffeste forholdene. Vanntett, med god støtte og grep, ideelle for fjellklatring og lange turer i utfordrende terreng.",
    price: 2499,
    discount: 15,
    category: "footwear",
    imageUrl: "https://images.unsplash.com/photo-1542827387-98f0888f21be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhpa2luZyUyMGJvb3RzfGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1520219306100-ec69c86268a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhpa2luZyUyMGJvb3RzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1606335543042-57c525922933?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhpa2luZyUyMGJvb3RzfGVufDB8fDB8fHww"
    ],
    features: [
      "100% vanntett Gore-Tex membran",
      "Vibram® såle med dypt mønster",
      "Støtdempende mellomsåle",
      "Forsterket tåbeskyttelse",
      "Pustende materiale"
    ],
    specifications: {
      "Materiale": "Fullnarvet lær og Gore-Tex",
      "Vekt": "620g per sko (str. 42)",
      "Størrelser": "36-48",
      "Farger": "Brun, Sort",
      "Vedlikehold": "Rens og impregnering anbefales"
    },
    stock: 18,
    sku: "FS-003-BRN",
    featured: true,
    isActive: true,
    reviews: [
      {
        name: "Thomas Olsen",
        rating: 5,
        comment: "Disse skoene har tatt meg gjennom Jotunheimen uten problemer. Verdt hver krone!",
        date: "2023-08-15"
      },
      {
        name: "Ida Nilsen",
        rating: 4,
        comment: "Fantastiske sko, men trenger litt tid å gå inn. Etter det er de perfekte.",
        date: "2023-09-05"
      },
      {
        name: "Fredrik Hansen",
        rating: 5,
        comment: "100% vanntette selv etter å ha krysset flere bekker.",
        date: "2023-10-20"
      }
    ],
    rating: 4.7,
    numReviews: 3
  },
  {
    _id: "004",
    name: "Norsk Vinterjakke",
    description: "Vår premiumjakke for de kaldeste vinterdagene. Designet med moderne teknologi og testet i norske vinterforhold, garanterer denne jakken å holde deg varm selv ved -30°C.",
    price: 3499,
    discount: 0,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1516431883659-655d41c09bf9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1489931026188-f252e571b214?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpbnRlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D"
    ],
    features: [
      "Dunfylt (800 fill power) for maksimal varme",
      "Vanntett og vindtett yttermateriale",
      "Avtakbar hette med pelskant",
      "Flere innvendige og utvendige lommer",
      "Varmereflekterende teknologi"
    ],
    specifications: {
      "Materiale": "Ytter: 100% polyester, Fyll: 90% dun, 10% fjær",
      "Isolasjon": "800 fill power premium dun",
      "Vekt": "1.2kg",
      "Størrelser": "XS-XXL",
      "Farger": "Sort, Marineblå, Olivengrønn",
      "Vedlikehold": "Rens anbefales"
    },
    stock: 10,
    sku: "VJ-004-BLK",
    featured: true,
    isActive: true,
    reviews: [
      {
        name: "Erik Pedersen",
        rating: 5,
        comment: "Beste vinterjakken jeg har eid. Holder meg varm selv på de kaldeste dagene i Tromsø.",
        date: "2023-01-15"
      },
      {
        name: "Silje Bakken",
        rating: 5,
        comment: "Kvaliteten er utmerket og den er så varm at jeg ikke trenger mange lag under selv på de kaldeste dagene.",
        date: "2023-01-30"
      }
    ],
    rating: 5,
    numReviews: 2
  },
  {
    _id: "005",
    name: "Ullundertøy Sett",
    description: "Komplett sett med ullundertøy i premium merinoull. Perfekt som baselag for alle utendørsaktiviteter i kaldt vær. Holder deg varm, tørr og komfortabel hele dagen.",
    price: 999,
    discount: 10,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1584214261945-b4732cceae76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvb2wlMjB1bmRlcndlYXJ8ZW58MHx8MHx8fDA%3D",
    additionalImages: [],
    features: [
      "100% merinoull",
      "Naturlig antibakteriell og luktresistent",
      "Regulerer kroppstemperatur",
      "Mykt og ikke kløende mot huden",
      "Hurtigtørkende"
    ],
    specifications: {
      "Materiale": "100% merinoull, 200g/m²",
      "Størrelser": "XS-XXL",
      "Innhold": "Langermet overdel og lange underdeler",
      "Farger": "Sort, Marineblå, Grå",
      "Vedlikehold": "Maskinvask 30°C på ullprogram"
    },
    stock: 30,
    sku: "UU-005-BLK",
    featured: false,
    isActive: true,
    reviews: [
      {
        name: "Marte Hansen",
        rating: 5,
        comment: "Utrolig behagelig mot huden og holder meg varm på skiturer. Ingen kløe!",
        date: "2023-02-10"
      }
    ],
    rating: 5,
    numReviews: 1
  },
  {
    _id: "006",
    name: "Turbukse Pro",
    description: "Tekniske turbukser designet for de som er aktive året rundt. Slitesterke, vannavvisende og med stretch for maksimal bevegelsesfrihet. Ideelle for fjellturer, klatring og andre utendørsaktiviteter.",
    price: 1299,
    discount: 0,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1548883354-7622d05539d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhpa2luZyUyMHBhbnRzfGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhpa2luZyUyMHBhbnRzfGVufDB8fDB8fHww"
    ],
    features: [
      "4-veis stretchmateriale",
      "DWR-behandlet for vannavvisning",
      "Forsterkede knær og sete",
      "Ventilasjon med glidelås på lårene",
      "Flere lommer med glidelås"
    ],
    specifications: {
      "Materiale": "88% polyamid, 12% elastan med DWR-behandling",
      "Vekt": "380g",
      "Størrelser": "XS-XXL, korte og lange lengder",
      "Farger": "Sort, Grå, Olivengrønn",
      "Vedlikehold": "Maskinvask 40°C"
    },
    stock: 45,
    sku: "TB-006-BLK",
    featured: false,
    isActive: true,
    reviews: [
      {
        name: "Jonas Lie",
        rating: 5,
        comment: "Disse buksene har overlevd mange turer i tøft terreng og ser fortsatt nesten nye ut.",
        date: "2023-06-15"
      },
      {
        name: "Line Andersen",
        rating: 4,
        comment: "Komfortable og slitesterke. Litt lange i beina for meg, men ellers perfekte.",
        date: "2023-07-22"
      }
    ],
    rating: 4.5,
    numReviews: 2
  },
  {
    _id: "007",
    name: "Refleksvest Premium",
    description: "Høykvalitets refleksvest for synlighet i mørket. Et must for alle som går, løper eller sykler når det er mørkt ute. Justerbar for å passe over jakker og yttertøy.",
    price: 299,
    discount: 0,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1569751274945-4db415bed602?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVmbGVjdGl2ZSUyMHZlc3R8ZW58MHx8MHx8fDA%3D",
    additionalImages: [],
    features: [
      "360° synlighet",
      "EN ISO 20471:2013 sertifisert",
      "Justerbare stropper",
      "Pustende materiale",
      "Reflekterende striper av høy kvalitet"
    ],
    specifications: {
      "Materiale": "100% polyester med reflekterende elementer",
      "Vekt": "120g",
      "Størrelser": "S/M, L/XL",
      "Farger": "Neon gul, Neon oransje",
      "Vedlikehold": "Maskinvask 30°C"
    },
    stock: 100,
    sku: "RV-007-YLW",
    featured: false,
    isActive: true,
    reviews: [
      {
        name: "Petter Olsen",
        rating: 5,
        comment: "Veldig synlig og lett å justere. Passer over vinterjakkene mine.",
        date: "2023-10-25"
      }
    ],
    rating: 5,
    numReviews: 1
  },
  {
    _id: "008",
    name: "Termos Fjell 1L",
    description: "Høykvalitets termos som holder drikken din varm i opptil 24 timer eller kald i opptil 48 timer. Perfekt følgesvenn for lange turer i all slags vær.",
    price: 449,
    discount: 0,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1575377727662-82776be3b6c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGhlcm1vc3xlbnwwfHwwfHx8MA%3D%3D",
    additionalImages: [
      "https://images.unsplash.com/photo-1578522304230-5bcdfa8e0c91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGhlcm1vc3xlbnwwfHwwfHx8MA%3D%3D"
    ],
    features: [
      "Dobbelt vakuumisolert rustfritt stål",
      "Holder varme i 24 timer og kulde i 48 timer",
      "Lekkasjesikker",
      "BPA-fri",
      "Inkluderer kopp som kan brukes som lokk"
    ],
    specifications: {
      "Materiale": "18/8 rustfritt stål",
      "Kapasitet": "1 liter",
      "Vekt": "450g",
      "Dimensjoner": "8.5 x 8.5 x 30.5 cm",
      "Farger": "Sort, Sølv, Blå, Rød",
      "Vedlikehold": "Håndvask anbefales"
    },
    stock: 60,
    sku: "TF-008-SLV",
    featured: true,
    isActive: true,
    reviews: [
      {
        name: "Kari Lund",
        rating: 5,
        comment: "Kaffen var fortsatt varm etter 10 timer på fjellet i -15°C. Imponerende!",
        date: "2023-02-05"
      },
      {
        name: "Ole Johansen",
        rating: 4,
        comment: "Solid termos, men litt tung hvis man går langt. Holder varmen utmerket.",
        date: "2023-03-15"
      }
    ],
    rating: 4.5,
    numReviews: 2
  }
];

module.exports = products;