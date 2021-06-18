// Run the following two npm installs to get all the requirements set up
// npm install --global gulp-cli
// npm install --save-dev gulp gulp-pug node-sass gulp-sass gulp-autoprefixer gulp-babel @babel/core @babel/preset-env gulp-uglify

// You can configure the following variables to your liking
var sourceDir = 'src/';
var destDir = 'docs/';
var pugGlob = `${sourceDir}**.pug`;
var sassGlob = `${sourceDir}**.scss`;
var jsGlob = `${sourceDir}**.js`;

// The following is the actual gulpfile code:
const { series, parallel, src, dest } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

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

function watch() {
    // TODO a livereload without requiring an extension, and fixing the watch in general
    watch(pugGlob, compilePugToHtml);
    watch(sassGlob, compileSassToCSS);
    watch(jsGlob, compileJavascript);
}


exports.compile = parallel(compilePugToHtml, compileSassToCSS, compileJavascript)
exports.default = series(exports.compile);