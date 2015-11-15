angular.module('zfpxchat').controller('MessageSendCtrl',function($rootScope,$scope,socket){
    $scope.newMessage = '';
    $scope.createMessage =  function(){
        if($scope.newMessage){
            socket.emit('createMessage',{
                content:$scope.newMessage,
                creator:$rootScope.me,
                createAt:new Date()
            });
            $scope.newMessage = '';
        }
    }
});