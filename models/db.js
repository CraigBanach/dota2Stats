var mysql      = require('mysql');
var connection = mysql.createConnection({
  hostname: process.env.WEBSITE_URL,
  user: "cragsify",
  password: "",
  database : 'dota2stats'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
/*
module.exports = {
    getConnection : function () {
        if (connection.state == "authenticated") {
            return connection;
        } else {
            throw ("The application is not connected to the database.")
        }
    }
}
*/