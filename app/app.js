angular.module('dive', ['ngRoute'])

  .constant('TPL_PATH', '/templates')

  .factory('db', function() {
    return levelgraph("test");
  })

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
      templateUrl : TPL_PATH + '/index.html'
    });
    $routeProvider.when('/all-facts', {
      controller : 'FactListCtrl',
      templateUrl : TPL_PATH + '/fact_list.html'
    });
    $routeProvider.when('/n/:node', {
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

  .controller('FactListCtrl', function($scope, $routeParams, db) {
    $scope.newFact = {}
    function refresh() {
      db.search([{
        subject: db.v("subject"),
        predicate: db.v("predicate"),
        object: db.v("object")
      }], function(err, facts) {
        $scope.facts = facts;
        $scope.$digest();
      });
    }
    $scope.pushFact = function() {
      if(event.keyCode == 13){
        db.put([$scope.newFact], function () {
          refresh();
        });
        for(i in $scope.newFact) {$scope.newFact[i] = null}
      }
    };

    $scope.delFact = function(fact) {
      db.del(fact, function (err) {
        refresh();
      });
    };

    refresh();

  })
  .controller('NodeCtrl', function($scope, $routeParams) {
    $scope.node = $routeParams.node;
  })
;
