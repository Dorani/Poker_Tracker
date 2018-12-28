var express = require("express");
var app = express();
var mysql = require("mysql");
require("console.table")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var PORT = 3000;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "playerStatsDB"
});

connection.connect(function(err){
  if (err) throw err;
  console.table("Connection ID: " + connection.threadId);
  viewStats();
});

function viewStats(){
  connection.query("SELECT * from poker_stats", function(err,data){
    if (err) throw err;
    console.log(JSON.stringify(data, null, 2));
  });
}


app.get("/welcome", function(req,res){
  res.send("<h1> WELCOME!! <h1>");
});

app.get("/api/player", function(req,res){
  connection.query("Select * from poker_stats", function(err,data){
    res.render("index", { player: data });
  });
});

app.post("/api/player", function(req, res) {
  var query = "INSERT INTO poker_stats (player_name, player_type, player_aggression, player_winRate, player_bb_per100, games_played) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(query, [req.body.player_name, req.body.player_type, req.body.player_aggression, req.body.player_winRate, req.body.player_bb_per100, req.body.games_played], function(err, result) {
    if (err) {
      throw err;
    }

    viewStats();
    res.json(result)
  });
});








app.listen(PORT, function(){
  console.log("we are live on port: " + PORT);
});
