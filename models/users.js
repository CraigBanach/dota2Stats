var db = require("./db");

module.exports = {
    searchForUser: function(steamID_32) {
        var connection = db.getConnection();
        connection.query("INSERT INTO users VALUES ('123546', 'cragsify')", function(err, result) {
          if (err) throw err;
        
          console.log("inserted");
        });
    }
};