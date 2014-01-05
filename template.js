/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
     //Prompt for these values.
    //{
    //  name: 'dom',
    //  message: 'Is the DOM involved in ANY way?',
    //  default: 'Y/n',
    //  warning: 'Yes: QUnit unit tests + JSHint "browser" globals. No: Nodeunit unit tests.'
    //},
    {
      name: 'min_concat',
      message: '合并之后是否要压缩?',
      default: 'Y/n',
      warning: 'Yes: 合并并压缩. No: 我就看看.'
    },
    {
      name: 'package_json',
      message: '是否需要package.json文件?',
      default: 'Y/n',
      warning: '这个改变会覆盖你的package.json'
    }
  ], function(err, props) {
    //props.dom = /y/i.test(props.dom);
    props.min_concat = /y/i.test(props.min_concat);
    props.package_json = /y/i.test(props.package_json);
    //props.test_task = props.dom ? 'qunit' : 'nodeunit';
    props.file_name = props.package_json ? '<%= pkg.name %>' : 'FILE_NAME';

    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['lib', 'src']);
    props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);


    // If is package_json true, generate package.json
    if (props.package_json) {
      var devDependencies = {
        'grunt': '~0.4.2',
        'grunt-contrib-jshint': '~0.7.2',
        'grunt-contrib-watch': '~0.5.3'
      };

      //if (props.dom) {
      //  devDependencies['grunt-contrib-qunit'] = '~0.3.0';
      //} else {
      //  devDependencies['grunt-contrib-nodeunit'] = '~0.2.2';
      //}

      if (props.min_concat) {
        devDependencies['grunt-contrib-concat'] = '~0.3.0';
        devDependencies['grunt-contrib-uglify'] = '~0.2.7';
        devDependencies['grunt-contrib-cssmin'] = '~0.7.0';
      }

      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('package.json', {
        name: 'index',
        description: "someone different",
        version: "1.0.0",
        author: {
            name: "yeyongyi1986",
            email: "yeyy1986@gmail.com"
        },
        node_version: '>= 0.10.0',
        devDependencies: devDependencies
      });
    }

    // All done!
    done();
  });

};
