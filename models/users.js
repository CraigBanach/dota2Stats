var db = require("./db");

module.exports = {
    searchForUser: function(steamID_32, username) {
        var connection = db.getConnection();
        if (steamID_32 > 2147483647) {
            steamID_32 = steamID_32 - 76561197960265728;
        } else {
            steamID_32 = steamID_32;
        }
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM users WHERE steamID_32=? AND registered=1", [steamID_32], function(err, result) {
              if (err) throw err;
            
              if (result.length == 0) {         // if there is nothing in the result (no entry in DB)
                  reject({steamID_32: steamID_32, username: username});
              } else {
                  resolve();
              }
            });
        });
    },
    addNewUser: function(steamID_32, username, registered) {
        console.log(registered);
        var connection = db.getConnection();
        return new Promise(function(resolve, reject) {
            connection.query("INSERT INTO users VALUES (?, ?, ?)", [steamID_32, username, registered], function(err, result) {
              if (err) throw err;
            
              resolve();
            });
        });
    }
};