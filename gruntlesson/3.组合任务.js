module.exports = function(grunt){
    //1.如何创建组合任务
    grunt.registerTask('buy',function(){
        console.log('buy ');
    });

    grunt.registerTask('cook',function(){
        console.log('cook ');
    });

    grunt.registerTask('eat',function(){
        console.log('eat ');
    });

    grunt.registerTask('dinner',['buy','cook','eat']);

}