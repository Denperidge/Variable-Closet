// Run the following two npm installs to get all the requirements set up
// npm install --global gulp-cli
// npm install --save-dev gulp gulp-pug node-sass gulp-sass gulp-clean-css gulp-autoprefixer gulp-postcss gulp-babel @babel/core @babel/preset-env gulp-uglify

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
//const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel');

sass.compiler = require('node-sass');

function compilePugToHtml() {
    return src(pugGlob)
        .pipe(pug({
           // Pug options 
        }))
        .pipe(dest(destDir));
}

function compileSassToCSS() {
    console.log(this)

    return src('src/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(destDir + 'css/'));
}

function compileJavascript() {
    return src(jsGlob)
        //.pipe()
        .pipe(dest(destDir + 'js/'))
}

function prefixCSS() {
    return src(sourceDir + '**.scss')
        .pipe(cleanCSS({compatibility: '*', debug: true}) //autoprefixer({
            // Autoprefixer options
        /*})*/)
        .pipe(dest(destDir + 'css/test'));
}

function watch() {
    watch(pugGlob, compilePugToHtml);
    watch(sassGlob, compileSassToCSS);
    watch(jsGlob, compileJavascript);
}


// Compile gets it working, without worrying about optimization/minimizing.
exports.compile = parallel(compilePugToHtml, compileSassToCSS, compileJavascript)
// Optimize does the same as compiling, but includes optimizations and minimizing
exports.optimize = series(exports.compile, prefixCSS)
exports.default = series(exports.compile);