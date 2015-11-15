module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        copy:{
            html:{
                'app/index.html':'dist/index.html'//目标文件
            }
        }
    });

    grunt.registerTask('default',[
        'copy'
    ]);
}