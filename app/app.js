angular.module('dive', ['ngRoute'])

  .constant('TPL_PATH', 'templates')

  .factory('graph', function() {
    return levelgraph("test");
  })

  .factory('n3graph', function(graph) {
    return levelgraphN3(graph);
  })


  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
      templateUrl : TPL_PATH + '/index.html'
    })
    .when('/export', {
      controller : 'ExportCtrl',
      templateUrl : TPL_PATH + '/export.html'
    })
    .when('/import', {
      controller : 'ImportCtrl',
      templateUrl : TPL_PATH + '/import.html'
    })
    .when('/all-facts', {
      controller : 'FactListCtrl',
      templateUrl : TPL_PATH + '/fact_list.html'
    })
    .when('/n/:node', {
      controller : 'NodeCtrl',
      templateUrl : TPL_PATH + '/node.html'
    });
  })

  .directive('node', function() {
    return {
      replace: true,
      scope: {
        node: '='
      },
      template: '<a href="#n/{{node}}">{{node}}</a>'
    };
  })

  .controller('FactListCtrl', function($scope, $routeParams, graph) {
    $scope.newFact = {}
    function refresh() {
      graph.search([{
        subject: graph.v("subject"),
        predicate: graph.v("predicate"),
        object: graph.v("object")
      }], function(err, facts) {
        $scope.facts = facts;
        $scope.$digest();
      });
    }
    $scope.pushFact = function() {
      if(event.keyCode == 13){
        graph.put([$scope.newFact], function () {
          refresh();
        });
        for(i in $scope.newFact) {$scope.newFact[i] = null}
      }
    };

    $scope.delFact = function(fact) {
      graph.del(fact, function (err) {
        refresh();
      });
    };

    refresh();

  })

  .controller('ExportCtrl', function($scope, n3graph) {
    $scope.export = function() {
      n3graph.search([{
        subject: n3graph.v("subject"),
        predicate: n3graph.v("predicate"),
        object: n3graph.v("object")
      }], {
        n3: {
          subject: n3graph.v("subject"),
          predicate: n3graph.v("predicate"),
          object: n3graph.v("object")
        }
      }, function(err, turtle) {
        $scope.dump = turtle;
        $scope.$digest();
      });
    }
  })

  .controller('ImportCtrl', function($scope, n3graph) {
    $scope.data = "<matteo> <friend> <daniele>.\n<marco> <friend> <davide>.\n<daniele> <friend> <marco>.\n<lucio> <friend> <marco>.\n<lucio> <friend> <matteo>.\n<daniele> <friend> <matteo>."
    $scope.import = function() {
      $scope.status = "Importing..."
      n3graph.n3.put($scope.data, function(err) {
        if (err) {
          $scope.status = "Error importing data.";
          console.log(err);
        } else {
          $scope.status = "Import complete.";
          $scope.data = "";
        }
        $scope.$digest();
      });
    }
  })


  .controller('NodeCtrl', function($scope, $routeParams) {
    $scope.node = $routeParams.node;
  })
;
