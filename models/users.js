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
            connection.query("SELECT * FROM users WHERE steamID_32=?", [steamID_32], function(err, result) {
              if (err) throw err;

                // Figure out if the ID exists and describe what needs to be inserted/updated.
              if (result.length == 0) {
                  reject({steamID_32: steamID_32, username: username, entryExists: false});
              } else if (result[0].registered == 0) {
                  reject({steamID_32: steamID_32, username: username, entryExists: true});
              } else {
                  resolve();
              }
            });
        });
    },
    addNewUser: function(steamID_32, username, registered) {
        var connection = db.getConnection();
        return new Promise(function(resolve, reject) {
            connection.query("INSERT INTO users VALUES (?, ?, ?)", [steamID_32, username, registered], function(err, result) {
              if (err) throw err;
            
              resolve();
            });
        });
    },
    updateUser: function(steamID_32, username, registered) {
        var connection = db.getConnection();
        return new Promise(function(resolve, reject) {
            connection.query("UPDATE users SET username=?, registered=? WHERE steamID_32=?", [username, registered, steamID_32], function(err, result) {
              if (err) throw err;
            
              resolve();
            });
        });
    },
};