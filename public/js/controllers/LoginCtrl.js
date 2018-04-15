angular.module('instaDJ').controller('LoginCtrl', function($scope, $rootScope, $state) {
    console.log('working');
    $scope.testVar = 'Testing testing';

    $scope.loginPage = function(){
        console.log('function running');
        $state.go('login');
    }
});
