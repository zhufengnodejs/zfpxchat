module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-inline-angular-templates');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.initConfig({
        copy:{
            main:{
                files:[
                    {expand:true,cwd:'app/lib/bootstrap/fonts/',src:['**'],dest:'build/fonts'},
                    {'build/index.html':'app/index.html'},
                ]
            }
        },
        useminPrepare:{
            html:'app/index.html',
            options:{
                dest:'build'
            }
        },
        rev:{
            options:{
                encoding:'utf8',
                algorithm:'md5',
                length:8
            },
            assets:{
                files:[{
                    src:['build/**/*.{js,css}']
                }
                ]
            }
        },
        usemin:{
            html:'build/index.html'
        },
        clean:{
            main:['.tmp','build']
        },uglify:{
            options:{
                mangle:false//混淆变量名
            }
        },
        inline_angular_templates:{
            dist:{
                options:{
                    base:'app/',
                    prefix:'/'
                },
                files:{
                    'build/index.html':['app/pages/*.html']
                }
            }
        }
    });

    grunt.registerTask('default',[
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'inline_angular_templates'
    ]);
}