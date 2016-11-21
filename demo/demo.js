var app = require('express')();
var musicalroutes = require("musicalroutes");
var port = process.env.port || 8080;
var response = function(req,res) { res.send("You hit " + req.baseUrl)}

app.use("/win", musicalroutes({source:"https://www.youtube.com/watch?v=TsdiIB15R-0"}), response);

app.use("/lose", musicalroutes({source:"https://www.youtube.com/watch?v=_asNhzXq72w"}), response);

app.use("/tunes", musicalroutes(), response);

app.listen(port, () => {
  console.log("Visit localhost:" + port + "/tunes");
  console.log("listening on", port);
});
