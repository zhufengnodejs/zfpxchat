module.exports = function(grunt){
    //1.如何创建任务
    grunt.registerTask('default',function(world){
        console.log('hello '+world);
    });
}