"use strict";

let project_folder = 'dist' // Готовый проект после build
let source_folder = 'src'   // Исходные файлы

let path = {
    build: {
        html:   project_folder + "/",
        css:    project_folder + "/css/",
        js:     project_folder + "/js/",
        img:    project_folder + "/img/",
        fonts:  project_folder + "/fonts/"
    },
    src: {
        html: [ source_folder + "/*.html ", "!" + source_folder + "/_*.html" ],
        css:    source_folder + "/scss/style.scss",
        js:     source_folder + "/js/script.js",
        img:    source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:  source_folder + "/fonts/*.ttf"
    }, 
    watch: {
        html:   source_folder + "/**/*.html",
        css:    source_folder + "/scss/**/*.scss",
        js:     source_folder + "/js/**/*.js ",
        img:    source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + project_folder + "/"
}

let { src, dest }   = require('gulp'),
     gulp           = require('gulp'),
     browsersync    = require("browser-sync").create(),
     fileinclude    = require("gulp-file-include"),
     del            = require("del"),
     scss           = require("gulp-sass"),
     autoprefixer   = require("gulp-autoprefixer"),
     group_media    = require("gulp-group-css-media-queries"),
     clean_css      = require("gulp-clean-css"),
     rename         = require("gulp-rename"),
     uglify         = require("gulp-uglify-es").default,
     imagemin       = require('gulp-imagemin'),
     webp           = require('gulp-webp'),
     webphtml        = require('gulp-webp-html'), 
     webpcss        = require('gulp-webp-css');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3003,
        notify: false
    })
}

// Обработка HTML
function html() {
    return src(path.src.html)
    .pipe(webphtml())
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
    .pipe(
        webpcss()
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
// Обработка JS
function js() {
    return src(path.src.js)
    .pipe(fileinclude())        // собирать в один файл все js скрипты
    .pipe(dest(path.build.js))  // выгрузка файла *.js
    .pipe(
        uglify())               // сжатие
    .pipe(
        rename({
            extname: ".min.js"  // переименовывание
        })
    )
    .pipe(dest(path.build.js))  // выгрузка сжатого файла
    .pipe(browsersync.stream())
}

// Обработка IMAGES
function images() {
    return src(path.src.img) 
    // .pipe(fileinclude())        // собирать в один файл все js скрипты
    .pipe(  
        webp({                  // сохранение в формат webp
            quality: 70         // качество изображения
        })
    )
    .pipe(dest(path.build.img)) // выгружаем формат webp 
    .pipe(src(path.src.img))    // снова обращение к исходникам
    .pipe(
        imagemin({              // сжатие картинки и настройки
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,       // работа с другими форматами изображений
            optimizationLevel: 3    // 0 до 7 (как сильно сжать изображение)
        })
    )  
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

// Подключение внешних файлов и отслеживание
function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

// Очистка от лишних фалов в папке dist
function clean (params) {
    return del(path.clean)
}
  
let build = gulp.series(clean, gulp.parallel(js, css, html, images))    // процесс выполнения
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch