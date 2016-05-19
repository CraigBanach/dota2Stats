function getMatchHistory() {
    var url = "https://dota2stats-cragsify.c9users.io/matchHistory";
    $.ajax({
        type: "POST",
        url: url,
        accepts: "application/json",
        error: function() {alert("error");},
        success: function(data) {},
        complete: function() {}
    });
}