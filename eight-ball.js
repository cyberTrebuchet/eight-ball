  ///////////////////////////////////////////////
 //  Thompson's Magical Ball of Wonder! v0.1  //
///////////////////////////////////////////////
//
// a teller of fortunes
//
// for the people
//
//

var fs = require("fs");
var net = require("net");
var port = 2000;

var totalConnections = 0;

var server = net.createServer(function(client){
  
  totalConnections += 1;
  console.log("Someone connected!");

  var data = fs.readFileSync("replies.json", "utf8");
  var replies = JSON.parse(data);

  client.setEncoding("utf8");

  client.write("Welcome to Thompson's Magical Ball of Wonder!\n");
  client.write("Ask any old question you want!\n");

  client.on("data", function(data){

    var question = data.trim().toLowerCase();

    console.log("Arguments: " + question + "\n");

    if (question[question.length - 1] === "?"){

      var reply = replies[Math.floor(Math.random() * replies.length)].reply + "\n";

      console.log(reply);

      client.write(reply);

    } else {
      client.write("Questions, bro, questions. Try again.\n");
    }
  });
});

server.listen(port, function(){
  console.log("Server up and running. Listening on port " + port + ".");
});

