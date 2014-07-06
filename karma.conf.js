// Karma configuration
// Generated on Tue Jun 03 2014 12:19:30 GMT-0300 (ART)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    frameworks: ['jasmine'],

    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.DEBUGGER,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
