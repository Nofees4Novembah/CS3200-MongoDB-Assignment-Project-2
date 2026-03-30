//-------------QUERY 1------------------
//FIND ALL THE PROPERTIES IN LOUISIANA,LA
use("SubleaseDB");
    db.properties.find({
        state: "LA"
    });