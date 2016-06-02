var db = require("./db");
var strftime = require("strftime");

module.exports = {
    findMatch: function(matchID, callback) {
        var connection = db.getConnection();
        connection.query("SELECT matchID FROM matches WHERE matchID=?", [matchID], function(err, result) {
          if (err) throw err;
          callback(result);
        });
    },
    addMatch: function(match) {
      var connection = db.getConnection();
      match.start_time = strftime("%Y-%m-%d %H:%M:%S", new Date(+match.start_time * 1000));
      connection.query("INSERT INTO matches VALUES ( ?, ?, ? )", [match.match_id, match.start_time, match.lobby_type], function(err, result) {
        if (err) throw err;
      });
    }
};

