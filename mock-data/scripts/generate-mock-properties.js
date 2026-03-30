
// npm install @faker-js/faker
// node generate-mock-properties.js

import { faker } from "@faker-js/faker";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COUNT = 50; // number of properties to generate

const users = JSON.parse(readFileSync(resolve(__dirname, "../data/users_mock.json"), "utf-8"));
const landlordIds = users.filter(u => u.role.includes("landlord")).map(u => u._id);

function randomDate(start, end) {
  return faker.date.between({ from: start, to: end }).toISOString().split("T")[0];
}

function generateLease() {
  const start = randomDate("2024-01-01", "2026-06-01");
  const end   = randomDate(start, "2028-01-01");
  return {
    lease_id:         faker.string.uuid(),
    lease_start_date: start,
    lease_end_date:   end,
    sublease_allowed: faker.datatype.boolean(),
    lease_status:     faker.helpers.arrayElement(["active", "expired", "pending"]),
  };
}

function generateUnit() {
  return {
    unit_id:       faker.string.uuid(),
    unit_number:   faker.helpers.arrayElement(["A", "B", "C"]) + faker.number.int({ min: 1, max: 20 }),
    bedrooms:      faker.number.int({ min: 1, max: 5 }),
    bathrooms:     faker.helpers.arrayElement([1, 1.5, 2, 2.5, 3]),
    unit_type:     faker.helpers.arrayElement(["apartment", "studio", "townhouse", "condo"]),
    current_lease: generateLease(),
  };
}

function generateProperty() {
  return {
    property_id: faker.string.uuid(),
    user_id:     faker.helpers.arrayElement(landlordIds),
    address:     faker.location.streetAddress(),
    city:        faker.location.city(),
    state:       faker.location.state({ abbreviated: true }),
    zip_code:    faker.location.zipCode(),
    units:       Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, generateUnit),
  };
}

const properties = Array.from({ length: COUNT }, generateProperty);

const outPath = resolve(__dirname, "../data/properties_final.json");
writeFileSync(outPath, JSON.stringify(properties, null, 2));
console.log(`✓ Generated ${properties.length} properties → ${outPath}`);
