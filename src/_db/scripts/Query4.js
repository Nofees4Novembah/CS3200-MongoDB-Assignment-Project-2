//---------QUERY4----------
// Count all 'open' listings by landlords
use("SubleaseDB");

db.listings.aggregate([
    {
        $match: {
            "listing_status": "open" // Using the corrected field name
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "poster_id",
            foreignField: "_id",
            as: "landlord"
        }
    },
    {
        $unwind: "$landlord"
    },
    {
        $count: "total_open_listings"
    }
]);