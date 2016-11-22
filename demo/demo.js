var app = require('express')();
var musicalroutes = require("./../");
var port = process.env.port || 8080;
var response = function(req,res) { res.send("You hit " + req.baseUrl)}

musicalroutes.demo();

app.use("/win", musicalroutes({source:"https://www.youtube.com/watch?v=TsdiIB15R-0"}), response);

app.use("/lose", musicalroutes({source:"https://www.youtube.com/watch?v=_asNhzXq72w"}), response);

app.use("/tunes", musicalroutes(), response);

app.listen(port, () => {
  console.log("Visit localhost:" + port + "/tunes");
  console.log("Visit localhost:" + port + "/win [or /lose]");

  console.log("listening on", port);
});
