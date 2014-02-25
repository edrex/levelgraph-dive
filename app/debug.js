var db = levelgraph("test");

var q = function(qs) {
  var stream = db.searchStream(qs);

  stream.on("data", function(data) {
    console.log(data);
  });
};
