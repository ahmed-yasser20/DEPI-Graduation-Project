export const CATEGORIES = [
  { id: "electronics", name: "Electronics", blurb: "Modern tech essentials" },
  { id: "clothing", name: "Clothing", blurb: "Curated wardrobe pieces" },
  { id: "books", name: "Books", blurb: "Reads worth your time" },
  { id: "accessories", name: "Accessories", blurb: "Finishing touches" },
  { id: "home", name: "Home", blurb: "Everyday objects, elevated" },
];

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=800&q=80`;

export const PRODUCTS = [
  { id: "p1", name: "Wireless Headphones", price: 189, category: "electronics", stock: 12, image: img("1505740420928-5e560c06d30e"), description: "Studio-grade sound with active noise cancellation and 30h battery." },
  { id: "p2", name: "Minimalist Watch", price: 129, category: "accessories", stock: 8, image: img("1524805444758-089113d48a6d"), description: "Sapphire crystal, brushed steel, and a leather strap." },
  { id: "p3", name: "Linen Overshirt", price: 89, category: "clothing", stock: 20, image: img("1516762689617-e1cffcef479d"), description: "Breathable linen with a relaxed drape. Made to be layered." },
  { id: "p4", name: "Ceramic Pour-Over", price: 42, category: "home", stock: 30, image: img("1495474472287-4d71bcdd2085"), description: "Slow coffee made simple. Hand-thrown ceramic dripper." },
  { id: "p5", name: "Design Reader", price: 24, category: "books", stock: 0, image: img("1544947950-fa07a98d237f"), description: "Essays on craft, restraint, and the objects we choose." },
  { id: "p6", name: "Leather Cardholder", price: 55, category: "accessories", stock: 15, image: img("1590874103328-eac38a683ce7"), description: "Full-grain leather that ages beautifully with everyday use." },
  { id: "p7", name: "Smart Speaker", price: 149, category: "electronics", stock: 6, image: img("1608043152269-423dbba4e7e1"), description: "Room-filling sound in a compact fabric-wrapped body." },
  { id: "p8", name: "Wool Beanie", price: 34, category: "clothing", stock: 25, image: img("1576871337622-98d48d1cf531"), description: "Merino wool, ribbed knit, warm without the weight." },
  { id: "p9", name: "Desk Lamp", price: 78, category: "home", stock: 10, image: img("1507473885765-e6ed057f782c"), description: "Adjustable arm, warm dimmable light, matte finish." },
  { id: "p10", name: "Everyday Backpack", price: 165, category: "accessories", stock: 4, image: img("1553062407-98eeb64c6a62"), description: "Water-resistant canvas, padded laptop sleeve, 22L." },
  { id: "p11", name: "Cotton Tee", price: 29, category: "clothing", stock: 40, image: img("1521572163474-6864f9cf17ab"), description: "Heavyweight cotton, boxy fit, built to outlast trends." },
  { id: "p12", name: "The Craft of Product", price: 32, category: "books", stock: 18, image: img("1512820790803-83ca734da794"), description: "A field guide to shipping thoughtful software." },
];
