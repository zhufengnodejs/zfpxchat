angular.module('zfpxchat').factory('socket',function($rootScope){
    var socket = io.connect('http://'+window.location.host);
    return {
        on:function(eventName,callback){//事件的名称和事件发生时回调函数
            socket.on(eventName,function(){
                var args = arguments;
                $rootScope.$apply(function(){//强行刷新视图 检测脏数据
                    callback.apply(socket,args);
                });
            });
        },
        emit:function(eventName,data){// 发射事件
            socket.emit(eventName,data);
        }
    }
})