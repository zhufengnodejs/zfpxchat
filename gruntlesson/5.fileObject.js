module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        copy:{
            html:{
                src:'app/index.html',//源文件
                dest:'dist/index.html'//目标文件
            }
        }
    });

    grunt.registerTask('default',[
        'copy'
    ]);
}