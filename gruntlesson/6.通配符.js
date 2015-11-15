module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig({
        copy:{
           main:{
               files:[
                   {expand:true,cwd:'app/lib/bootstrap/fonts/',src:['**'],dest:'build/fonts'},
                   {'build/index.html':'app/index.html'},
               ]
           }
        }
    });

    grunt.registerTask('default',[
        'copy'
    ]);
}