//---------QUERY2---------
//Return the emails of all primary tenants
use("SubleaseDB");
    db.users.aggregate([
        {
            $match : {
                role : "tenant",
                "tenant_profile.tenant_role" : "primary"
            }
        },
        {
            $project : {
                _id : 0,
                email : 1
            }
        }])