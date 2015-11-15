angular.module('zfpxchat').controller('RegCtrl',function($rootScope,$scope,$http,$location,socket){
    $scope.user = {};
    $scope.save = function(){
        $http({
            url:'/users/reg',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/');
        }).error(function(){
            $location.path('/reg');
        });
    }

});