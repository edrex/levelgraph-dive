require('./graph.js');

require.ensure([], function(require) {
  require('./lib/angular/angular.js');
  require('./lib/angular-route/angular-route.js');

  angular.module('dive', ['ngRoute', 'graph'])

    .constant('TPL_PATH', 'templates')

    .config(['$routeProvider', 'TPL_PATH', function($routeProvider, TPL_PATH) {
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
    }])

    .directive('node', function() {
      return {
        replace: true,
        scope: {
          node: '='
        },
        template: '<a href="#n/{{node}}">{{node}}</a>'
      };
    })

    .controller('FactListCtrl', ['$scope', '$routeParams', 'g', function($scope, $routeParams, g) {
      $scope.newFact = {}
      function refresh() {
        g.get({}, function(err, facts) {
          $scope.facts = facts;
          $scope.$digest();
        });
      }
      $scope.pushFact = function() {
        if(event.keyCode == 13){
          g.put([$scope.newFact], function () {
            refresh();
          });
          for(i in $scope.newFact) {$scope.newFact[i] = null}
        }
      };

      $scope.delFact = function(fact) {
        g.del(fact, function (err) {
          refresh();
        });
      };

      refresh();

    }])

    .controller('ExportCtrl', ['$scope', 'n3graph', function($scope, n3graph) {
      $scope.export = function() {
        n3graph.n3.get({}, function(err, turtle) {
          $scope.dump = turtle;
          $scope.$digest();
        });
      }
    }])

    .controller('ImportCtrl', ['$scope', 'n3graph', function($scope, n3graph) {
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
    }])

    .controller('NodeCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
      $scope.node = $routeParams.node;
    }])
}, 'libs');

