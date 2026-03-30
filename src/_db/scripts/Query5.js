// --------- QUERY 5 ----------
// Scenario: Disable a listing (flip 'is_active' to false)
use("SubleaseDB");
db.listings.updateOne(
    {"listing_id": "8b836921-db25-4993-ac73-e5c17790a1ea"},
    { $set : {"listing_status": "pending"}}
)

