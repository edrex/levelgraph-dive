angular.module('graph', [])

  .factory('graph', function() {
    return levelgraph("test");
  })

  .factory('n3graph', function(graph) {
    return levelgraphN3(graph);
  });
