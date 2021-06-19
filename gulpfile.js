// Run the following two npm installs to get all the requirements set up
// npm install --global gulp-cli
// npm install --save-dev gulp gulp-pug node-sass gulp-sass gulp-autoprefixer gulp-babel @babel/core @babel/preset-env gulp-uglify browser-sync

// You can configure the following variables to your liking
var sourceDir = 'src/';
var destDir = 'docs/';
var pugGlob = `${sourceDir}**.pug`;
var sassGlob = `${sourceDir}**.scss`;
var jsGlob = `${sourceDir}**.js`;

// The following is the actual gulpfile code:
const { series, parallel, src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function compilePugToHtml() {
    return src(pugGlob)
        .pipe(pug({
           // Pug options 
        }))
        .pipe(dest(destDir));
}

function compileSassToCSS() {
    return src('src/**.scss')
        .pipe(sass({
            // Sass options
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            // Autoprefixer options
        }))
        .pipe(dest(destDir + 'css/'));
}

function compileJavascript() {
    return src(jsGlob)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest(destDir + 'js/'))
}

function reloadPug(cb) {
    compilePugToHtml();
    browserSync.reload();
    cb();
}

function reloadCSS() {
    return compileSassToCSS().pipe(browserSync.stream());
}

function reloadJS(cb) {
    compileJavascript();
    browserSync.reload();
    cb();
}


function watchForChanges(cb) {
    browserSync.init({
        server: destDir
    });
    // TODO a livereload without requiring an extension, and fixing the watch in general
    watch(pugGlob, reloadPug);
    watch(sassGlob, reloadCSS);
    watch(jsGlob, reloadJS);
    cb();
}


exports.compile = parallel(compilePugToHtml, compileSassToCSS, compileJavascript)
exports.default = series(exports.compile, watchForChanges);