
// node reshape.js
// Put your downloaded JSON file in the same folder as this script

import { readFileSync, writeFileSync } from "fs";
import { faker } from "@faker-js/faker";

// Change this to your downloaded filename
const raw = JSON.parse(readFileSync("./user_export.json", "utf8"));

function randomDate(start, end) {
  return faker.date.between({ from: start, to: end }).toISOString().split("T")[0];
}

const users = raw.map(row => {
  // Randomly assign role since generatedata outputs it as ""
  const role = faker.helpers.arrayElement(["tenant", "landlord"]);

  const base = {
    _id:                row.user_id,
    email:              row.email,
    role:               [role],
    account_created_at: faker.date.past({ years: 2 }).toISOString(),
  };

  if (role === "tenant") {
    const moveIn  = randomDate("2024-01-01", "2026-01-01");
    const moveOut = randomDate(moveIn, "2027-01-01");
    return {
      ...base,
      tenant_profile: {
        tenant_role:   faker.helpers.arrayElement(["primary", "co-tenant", "guarantor"]),
        move_in_date:  moveIn,
        move_out_date: moveOut,
      },
    };
  }

  if (role === "landlord") {
    return {
      ...base,
    };
  }
});

writeFileSync("../data/users_final.json", JSON.stringify(users, null, 2));
console.log(`✓ Reshaped ${users.length} users → mock-data/data/users_final.json`);