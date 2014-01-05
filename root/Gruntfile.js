/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({{% if (min_concat) { %}
    // Metadata.{% if (package_json) { %}
    pkg: grunt.file.readJSON('package.json'),
    //{% } else { %}
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',{% } } %}
    // Task configuration.{% if (min_concat) { %}
    // 合并文件
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        separator: ';'
      },
      js: {//合并js
        src: ['src/**/*.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      },
      css : {//合并css
        src: ['src/**/*.css'],
        dest:'build/css/<%= pkg.name %>.css'
      }
    },
    uglify: {//压缩js
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
            'build/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },{% } %}
    cssmin: {//压缩css  
      options: {  
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */  
      },  
      minify: {  
        expand: true,  
        cwd: 'css/',  
        src: ['src/css/*.css'],
        dest: 'build/css/<%= pkg.name %>.css',  
        ext: '.min.css'  
      },  
      combine: {
        files: {
          'build/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },  
    jshint: {
      //这里是覆盖JSHint默认配置的选项
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        globals: {{% if (jquery) { %}
          jQuery: true
        {% } %}}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
    }
    //watch: {
    //  gruntfile: {
    //    files: '<%= jshint.gruntfile.src %>',
    //    tasks: ['jshint:gruntfile']
    //  }
    //}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat','cssmin', 'uglify']);

};
