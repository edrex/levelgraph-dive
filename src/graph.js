var leveljs = require("level-js");
var levelup = require("levelup");
var levelgraph = require("levelgraph");
var levelgraphN3 = require('levelgraph-n3');

angular.module('graph', [])

  .factory('g', function() {
    return levelgraph(levelup("test", {
      db: function (location) {
        return new leveljs(location)
      }
    }));
  })

  .factory('n3graph', function(g) {
    return levelgraphN3(g);
  })

  .directive('graphSearch', function(graph) {

    return {
      scope: true,
      compile: function(scope, element, attrs) {
        // parse search and groupby attrs
        var search

        , groupBy;

        function refresh() {
          graph.search(search, function(err, solutions) {
            if (groupBy) {
              // FOO
            } else {
              $scope.graphResults = solutions;
            }
            $scope.$digest();
          });
        }
        // - make update on db changed (level-up hook?)

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('input', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  });
