//---------QUERY3---------
// Return approved applications with listing details and email of the users that posted the applications
use("SubleaseDB");
db.applications.aggregate([
    {
        $match : {
            "status" : "approved"
        }
    },
    {
        $lookup : {
            from : "listings",
            localField : "listing_id",
            foreignField : "_id",
            as : "listing"
            }
    }, {$unwind : "$listing"},
    {
        $lookup : {
            from : "users",
            localField : "poster_id",
            foreignField : "_id",
            as : "user"
        }
    }, {$unwind : "$user"},
    {
        $project : {
            "user.email" : 1
        }}
]);
