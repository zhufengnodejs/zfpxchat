angular.module('zfpxchat').controller('MessageSendCtrl',function($scope,socket){
    $scope.newMessage = '';
    $scope.createMessage =  function(){
        if($scope.newMessage){
            socket.emit('createMessage',$scope.newMessage);
            $scope.newMessage = '';
        }
    }
});