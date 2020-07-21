### Что делает GULP?

- Конвертирует и подключает шрифты;
- Обновляет браузер;
- Собирает в один несколько html файлов;
- Работает с SCSS и оптимизирует;
- Интегрирует сомостоятельно в HTML и CSS файлы;
- Собирает несколько JS файлов (оптимизирует и сжимает);
- Способен создать SVG;


### GULP GET STARTED
https://gulpjs.com/docs/en/getting-started/quick-start

В этом проекте

Gulp настройка установка плагины. 
 Пошаговая инструкция по настройке сборки Gulp 4 для верстки сайтов

- npm install --save-dev gulp     
- npm i browser-sync --save-dev

- npm i gulp-file-include --save-dev 
https://www.npmjs.com/package/gulp-file-include

- npm i del --save-dev

- npm i gulp-sass --save-dev

- npm i gulp-autoprefixer --save-dev

// группирует медиа запросы (ставит в конец файла)
- npm i --save-dev gulp-group-css-media-queriesc

// Чистит и сжимает файл css
- npm i --save-dev gulp-clean-css

// для вывода двух фалов в директорию dist
- npm i --save-dev gulp-rename

// для сжатия и оптимизации js файлов
npm i --save-dev gulp-uglify-es

// сжать картинку без потери качества
npm i --save-dev gulp-imagemin

// форматирование в webp
npm i --save-dev gulp-webp

// интегрирование webp в html
npm i --save-dev gulp-webp-html


```html
<picture>
    <source srcset="img/image.webp" type="image/webp">
    <img src="img/image.jpg" alt=""> 
</picture>
```
Позволяет заменить эту запись в одну строку

```html
    <img src="img/image.jpg" alt=""> 
```
// для работы со стилями webp
npm i --save-dev gulp-webp-css



Author: Ilyin Oleg
