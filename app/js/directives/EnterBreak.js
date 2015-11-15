/**
 * enter-break
 * 在textarea里回车会换行，我们使用这个指令，可以ctrl+enter换行
 *
 */
angular.module('zfpxchat').directive('enterBreak',function(){
    return function(scope,element,attrs){
        var ctrlDown = false;
        element.bind('keydown',function(event){
            if(event.which == 17){
                ctrlDown= true;
                setTimeout(function(){
                    ctrlDown = false;
                },1000);
            }
            if(event.which == 13){
                if(ctrlDown){
                   element.val(element.val()+'\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.enterBreak);
                    });
                    event.preventDefault();//阻止默认事件
                }
            }
        });
    }
});