angular.module('dive', ['ngRoute'])

  .constant('TPL_PATH', '/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
      controller : 'AllCtrl',
      templateUrl : TPL_PATH + '/all.html'
    });
    $routeProvider.when('/:id', {
      controller : 'NodeCtrl',
      templateUrl : TPL_PATH + '/node.html'
    });
  })

  .controller('AllCtrl', function($scope, $routeParams) {
    $scope.foo = "FOOOO";
  })
  .controller('NodeCtrl', function($scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.notices = notices;
  })
;
