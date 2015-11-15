module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        copy:{
            html:{
                files:[
                    {src:'',dest:''},
                    {src:'',dest:''}
                ]
            }
        }
    });

    grunt.registerTask('default',[
        'copy'
    ]);
}