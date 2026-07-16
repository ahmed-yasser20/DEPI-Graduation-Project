// Seeds your database with the sample catalog (categories + products + images)
// by calling your real API as an authenticated Admin.
//
// Usage:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/seed-data.mjs
//
// NODE_TLS_REJECT_UNAUTHORIZED=0 is needed because the ASP.NET Core dev HTTPS
// certificate is self-signed; Node's fetch rejects it by default. Fine for a
// local one-off script - never do this for anything talking to a real server.

const API_BASE = process.env.VITE_API_BASE_URL || "https://localhost:7000/api";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables first.");
  process.exit(1);
}

const CATEGORIES = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
  { name: "Accessories" },
  { name: "Home" },
];

const img = (seed) => `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=800&q=80`;

const PRODUCTS = [
  { name: "Wireless Headphones", price: 189, category: "Electronics", stock: 12, image: img("1505740420928-5e560c06d30e"), description: "Studio-grade sound with active noise cancellation and 30h battery." },
  { name: "Minimalist Watch", price: 129, category: "Accessories", stock: 8, image: img("1524805444758-089113d48a6d"), description: "Sapphire crystal, brushed steel, and a leather strap." },
  { name: "Linen Overshirt", price: 89, category: "Clothing", stock: 20, image: img("1516762689617-e1cffcef479d"), description: "Breathable linen with a relaxed drape. Made to be layered." },
  { name: "Ceramic Pour-Over", price: 42, category: "Home", stock: 30, image: img("1495474472287-4d71bcdd2085"), description: "Slow coffee made simple. Hand-thrown ceramic dripper." },
  { name: "Design Reader", price: 24, category: "Books", stock: 0, image: img("1544947950-fa07a98d237f"), description: "Essays on craft, restraint, and the objects we choose." },
  { name: "Leather Cardholder", price: 55, category: "Accessories", stock: 15, image: img("1590874103328-eac38a683ce7"), description: "Full-grain leather that ages beautifully with everyday use." },
  { name: "Smart Speaker", price: 149, category: "Electronics", stock: 6, image: img("1608043152269-423dbba4e7e1"), description: "Room-filling sound in a compact fabric-wrapped body." },
  { name: "Wool Beanie", price: 34, category: "Clothing", stock: 25, image: img("1576871337622-98d48d1cf531"), description: "Merino wool, ribbed knit, warm without the weight." },
  { name: "Desk Lamp", price: 78, category: "Home", stock: 10, image: img("1507473885765-e6ed057f782c"), description: "Adjustable arm, warm dimmable light, matte finish." },
  { name: "Everyday Backpack", price: 165, category: "Accessories", stock: 4, image: img("1553062407-98eeb64c6a62"), description: "Water-resistant canvas, padded laptop sleeve, 22L." },
  { name: "Cotton Tee", price: 29, category: "Clothing", stock: 40, image: img("1521572163474-6864f9cf17ab"), description: "Heavyweight cotton, boxy fit, built to outlast trends." },
  { name: "The Craft of Product", price: 32, category: "Books", stock: 18, image: img("1512820790803-83ca734da794"), description: "A field guide to shipping thoughtful software." },
];

let token;

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${options.method || "GET"} ${path} -> ${res.status} ${text}`);
  }
  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : null;
}

async function login() {
  console.log("Logging in as", ADMIN_EMAIL, "...");
  const data = await api("/Auth/Login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  token = data.token;
  console.log("Logged in.");
}

async function seedCategories() {
  console.log("Creating categories...");
  const nameToId = {};
  for (const c of CATEGORIES) {
    try {
      const created = await api("/Category", {
        method: "POST",
        body: JSON.stringify({ category_Name: c.name }),
      });
      nameToId[c.name] = created.categoryId;
      console.log(`  + ${c.name} (id ${created.categoryId})`);
    } catch (err) {
      // Likely already exists (409 Conflict) - fetch existing categories and reuse the id.
      console.log(`  ~ ${c.name} already exists, looking it up...`);
      const all = await api("/Category");
      const match = all.find((x) => x.category_Name === c.name);
      if (match) nameToId[c.name] = match.categoryId;
    }
  }
  return nameToId;
}

async function seedProducts(nameToId) {
  console.log("Creating products...");
  for (const p of PRODUCTS) {
    const categoryId = nameToId[p.category];
    const created = await api("/Product", {
      method: "POST",
      body: JSON.stringify({
        pName: p.name,
        price: p.price,
        description: p.description,
        stock: p.stock,
        categoryId,
      }),
    });
    console.log(`  + ${p.name} (id ${created.pId})`);
    await uploadImage(created.pId, p.image, p.name);
  }
}

async function uploadImage(productId, imageUrl, name) {
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    console.log(`    ! couldn't download image for ${name}, skipping`);
    return;
  }
  const blob = await imgRes.blob();
  const form = new FormData();
  form.append("file", blob, `${productId}.jpg`);
  await api(`/Product/${productId}/image`, { method: "POST", body: form });
  console.log(`    + image uploaded for ${name}`);
}

async function main() {
  await login();
  const nameToId = await seedCategories();
  await seedProducts(nameToId);
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
