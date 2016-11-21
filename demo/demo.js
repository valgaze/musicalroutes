var app = require('express')();
var musicalroutes = require("./index.js");
var port = process.env.port || 8080;
var response = function(req,res) { res.send("You hit " + req.baseUrl)}

app.use("/right", musicalroutes({source:"https://www.youtube.com/watch?v=barWV7RWkq0"}), response);

app.use("/wrong", musicalroutes({source:"https://www.youtube.com/watch?v=_asNhzXq72w"}), response);

app.use("/tunes", musicalroutes(), response);

app.listen(port, () => {
  console.log("Visit localhost:" + port + "/tunes");
  console.log("listening on", port);
});
