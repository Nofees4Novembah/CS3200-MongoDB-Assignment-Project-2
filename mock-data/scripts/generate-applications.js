
// npm install @faker-js/faker
// node generate-applications.js

import { faker } from "@faker-js/faker";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COUNT = 40; // number of applications to generate

const users = JSON.parse(readFileSync(resolve(__dirname, "../data/users_mock.json"), "utf-8"));
const tenantIds = users.filter(u => u.role.includes("tenant")).map(u => u._id);

const listings = JSON.parse(readFileSync(resolve(__dirname, "../data/sublease_listings_mock.json"), "utf-8"));
const listingIds = listings.map(l => l.listing_id);

function generateApplication() {
  const status = faker.helpers.arrayElement(["approved", "pending", "declined"]);
  const appliedAt = faker.date.between({ from: "2024-01-01", to: "2026-12-01" }).toISOString().split("T")[0];

  const app = {
    _id:                faker.string.uuid(),
    listing_id:         faker.helpers.arrayElement(listingIds),
    applicant_id:       faker.helpers.arrayElement(tenantIds),
    applied_at:         appliedAt,
    application_status: status,
  };

  if (status === "approved") {
    const start = faker.date.between({ from: appliedAt, to: "2027-01-01" }).toISOString().split("T")[0];
    const end   = faker.date.between({ from: start, to: "2029-01-01" }).toISOString().split("T")[0];
    app.contract = {
      contract_id:     faker.string.uuid(),
      start_date:      start,
      end_date:        end,
      contract_status: faker.helpers.arrayElement(["active", "expired", "terminated"]),
      created_at:      faker.date.between({ from: appliedAt, to: start }).toISOString().split("T")[0],
    };
  }

  return app;
}

const applications = Array.from({ length: COUNT }, generateApplication);

const outPath = resolve(__dirname, "../data/applications_mock.json");
writeFileSync(outPath, JSON.stringify(applications, null, 2));
console.log(`✓ Generated ${applications.length} applications → ${outPath}`);
