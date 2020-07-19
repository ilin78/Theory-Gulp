

let project_folder = 'dist' // Готовый проект после build
let source_folder = 'src'   // Исходные файлы

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [ source_folder + "/*.html ", "!" + source_folder + "/_*.html " ],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js ",
        img: source_folder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js ",
        img: source_folder + "/img/**/*.{jpg, png, svg, gif, ico, webp}"
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
     gulp = require('gulp'),
     browsersync = require("browser-sync").create(),
     fileinclude = require("gulp-file-include"),
     del = require("del"),
     scss = require("gulp-sass"),
     autoprefixer = require("gulp-autoprefixer"),
     group_media =  require("gulp-group-css-media-queries"),
     clean_css = require("gulp-clean-css"),
     rename = require("gulp-rename"); 

function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3003,
        notify: false
    })
}

function html() {
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

// Обработка стилей css
function css() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(
        group_media()
    )
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        })
    )
    .pipe(dest(path.build.css)) // перед переименовыванием выгружаем файл отдельно
    .pipe(clean_css())
    .pipe(
        rename({
            extname: ".min.css"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

// Подключение внешних файлов и обновление
function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
}

// Очистка от лишних фалов в папке dist
function clean (params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(css, html))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch