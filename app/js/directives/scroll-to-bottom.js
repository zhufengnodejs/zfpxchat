angular.module('zfpxchat').directive('scrollToBottom',function(){
    return {
        link:function(scope,element,attrs){
            scope.$watch(function(){
                return element.children().length;
            },function(){
                console.log(element.prop('scrollHeight'));
                element.animate({
                    scrollTop:element.prop('scrollHeight')
                },1000);
            });
        }
    }
});