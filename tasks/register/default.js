/**
 * `tasks/register/default.js`
 *
 * ---------------------------------------------------------------
 *
 * This is the default Grunt tasklist that will be executed if you
 * run `grunt` in the top level directory of your app.  It is also
 * called automatically when you start Sails in development mode using
 * `sails lift` or `node app` in a development environment.
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/default-js
 *
 */
module.exports = function (grunt) {


  grunt.registerTask('default', [
    // 'polyfill:dev', // <-- uncomment if you need/want to transpile code to ES2015 in development.
    'compileAssets',
    // 'babel',        // <-- uncomment if you need/want to transpile code to ES2015 in development.
    'linkAssets',
    'watch'
  ]);


};
