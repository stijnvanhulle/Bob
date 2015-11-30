var gulp = require("gulp"),
    csslint = require("gulp-csslint"),
    cssminifier = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    jshint = require("gulp-jshint"),
    hintstylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    imagemin= require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    apidoc = require('gulp-apidoc');

gulp.task("default", function() {
    var apiDocWatcher = gulp.watch("./routes/api/*", ["apidoc"]);
    apiDocWatcher.on("change", function(event) {
        console.log("File: " + event.path + " was " + event.typed);
    });
});

//tasks
gulp.task('apidoc', function(done){
    apidoc({
        src: "routes/api/",
        dest: "public/api/",
        debug:true
    },done);
});


