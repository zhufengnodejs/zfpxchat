angular.module('zfpxchat').controller('LoginCtrl',function($location,$rootScope,$http,$scope,socket){
    $scope.user = {};
    $scope.save = function(){
        $http({
            url:'/users/login',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/');
        }).error(function(){
            $location.path('/login');
        });
    }

});