
// npm install @faker-js/faker
// node generate-sublease-listing.js

import { faker } from "@faker-js/faker";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COUNT = 30; // number of listings to generate

const users = JSON.parse(readFileSync(resolve(__dirname, "../data/users_mock.json"), "utf-8"));
const primaryTenantIds = users
  .filter(u => u.role.includes("tenant") && u.tenant_profile?.tenant_role === "primary")
  .map(u => u._id);

const properties = JSON.parse(readFileSync(resolve(__dirname, "../data/properties_final.json"), "utf-8"));
const leaseUnitPairs = [];
for (const property of properties) {
  for (const unit of property.units) {
    leaseUnitPairs.push({
      lease_id: unit.current_lease.lease_id,
      unit_id:  unit.unit_id,
    });
  }
}

function getLeasePair() {
  return faker.helpers.arrayElement(leaseUnitPairs);
}

function generateListing() {
  const availableFrom = faker.date.between({ from: "2025-01-01", to: "2026-12-01" }).toISOString().split("T")[0];
  const availableTo   = faker.date.between({ from: availableFrom, to: "2028-01-01" }).toISOString().split("T")[0];
  const createdAt     = faker.date.between({ from: "2024-01-01", to: availableFrom }).toISOString().split("T")[0];
  const { lease_id } = getLeasePair();

  return {
    listing_id:         faker.string.uuid(),
    lease_id,
    poster_id:          faker.helpers.arrayElement(primaryTenantIds),
    listing_price:      parseFloat(faker.commerce.price({ min: 600, max: 4000, dec: 2 })),
    listing_status:     faker.helpers.arrayElement(["open", "closed", "pending"]),
    "available-from":   availableFrom,
    "available-to":     availableTo,
    listing_created_at: createdAt,
  };
}

const listings = Array.from({ length: COUNT }, generateListing);

const outPath = resolve(__dirname, "../data/sublease_listings_mock.json");
writeFileSync(outPath, JSON.stringify(listings, null, 2));
console.log(`✓ Generated ${listings.length} sublease listings → ${outPath}`);
