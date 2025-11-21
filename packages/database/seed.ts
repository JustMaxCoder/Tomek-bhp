
import { db } from "./db";
import { products, sizes, gallery, settings } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Seed sizes
  const sizeData = [
    { name: "XS", displayOrder: 1 },
    { name: "S", displayOrder: 2 },
    { name: "M", displayOrder: 3 },
    { name: "L", displayOrder: 4 },
    { name: "XL", displayOrder: 5 },
    { name: "XXL", displayOrder: 6 },
    { name: "XXXL", displayOrder: 7 },
    { name: "36", displayOrder: 8 },
    { name: "37", displayOrder: 9 },
    { name: "38", displayOrder: 10 },
    { name: "39", displayOrder: 11 },
    { name: "40", displayOrder: 12 },
    { name: "41", displayOrder: 13 },
    { name: "42", displayOrder: 14 },
    { name: "43", displayOrder: 15 },
    { name: "44", displayOrder: 16 },
    { name: "45", displayOrder: 17 },
    { name: "46", displayOrder: 18 },
    { name: "47", displayOrder: 19 },
    { name: "48", displayOrder: 20 },
  ];

  await db.insert(sizes).values(sizeData);

  // Seed settings
  await db.insert(settings).values([
    { key: "siteName", value: "Sklep BHP Perfekt" },
    { key: "bannerShow", value: "true" },
    { key: "bannerText", value: "Promocja! -20% na całą odzież roboczą!" },
    { key: "bannerLink", value: "/products" },
  ]);

  // Seed sample products
  await db.insert(products).values([
    {
      name: "Bluza robocza BHP Perfect",
      description: "Wytrzymała bluza robocza z wysokiej jakości materiału.",
      price: "89.99",
      image: "/attached_assets/Bluza robocza BHP_1763265481399.jpg",
      category: "odziez-robocza",
      stock: 50,
      available: true,
      hasSizes: true,
      popularity: 85,
    },
    {
      name: "Buty robocze S3 Premium",
      description: "Bezpieczne buty robocze z podnoskiem stalowym.",
      price: "159.99",
      image: "/attached_assets/Buty robocze S3 Premium_1763265481403.jpg",
      category: "obuwie",
      stock: 40,
      available: true,
      hasSizes: true,
      popularity: 92,
    },
  ]);

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
