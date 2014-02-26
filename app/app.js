angular.module('dive', ['ngRoute'])

  .constant('TPL_PATH', 'templates')

  .factory('db', function() {
    return levelgraph("test");
  })

  .factory('n3Db', function(db) {
    return levelgraphN3(db);
  })


  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
      templateUrl : TPL_PATH + '/index.html'
    })
    .when('/export', {
      controller : 'ExportCtrl',
      templateUrl : TPL_PATH + '/export.html'
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

  .controller('ExportCtrl', function($scope, n3Db) {
    $scope.export = function() {
      n3Db.search([{
        subject: db.v("subject"),
        predicate: db.v("predicate"),
        object: db.v("object")
      }], {
        n3: {
          subject: db.v("subject"),
          predicate: db.v("predicate"),
          object: db.v("object")
        }
      }, function(err, turtle) {
        $scope.dump = turtle;
        $scope.$digest();
      });
    }
  })

  .controller('NodeCtrl', function($scope, $routeParams) {
    $scope.node = $routeParams.node;
  })
;
