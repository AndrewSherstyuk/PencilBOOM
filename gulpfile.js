var $        = require('gulp-load-plugins')()
  , gulp     = require('gulp')
  , del      = require('del')
  , sc2      = require('stream-combiner2').obj
  , resolver = require('stylus').resolver;

const publicPath = "public/";
const frontendPath = "frontend/"
const bowerPath = "bower_components/"
var conf = {
    "vendors": {
        "css": {
            "src": bowerPath + "chosen/chosen.css",
            "dest": ""
        },
        "js": {
            "src": [
                bowerPath + "jquery/dist/jquery.min.js",
                bowerPath + "chosen/chosen.jquery.js"
            ]
        },
        "images": {
            "src": bowerPath + "chosen/*.png",
            "dest": publicPath + "css"
        }
    },
    "js": {
        "src": frontendPath + "js",
        "dest": publicPath + "js"
    },
    "css": {
        "src": frontendPath + "css/grabber.styl",
        "dest": publicPath + "css"
    },
    "images": {
        "src": frontendPath + "images",
        "dest": publicPath + "images"
    },
    "index": {
        "src": frontendPath + "pages/index.pug",
        "dest": publicPath
    },
    "fonts": {
        "src": frontendPath + "fonts",
        "dest": publicPath + "fonts"
    },
    "html": {
        "src": [
            frontendPath+ "**/*.pug",
            "!" + frontendPath + "index/*.pug",
            "!" + frontendPath + "layout.pug",
            "!" + frontendPath + "pages/parts/*.pug"
        ],
        "dest": publicPath
    }
};
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', () => del(publicPath));

gulp.task('vendor:css', () => sc2(
    gulp.src(conf.vendors.css.src),
    $.concat('vendor.min.css'),
    gulp.dest(conf.css.dest)
));
gulp.task('vendor:js', () => sc2(
    gulp.src(conf.vendors.js.src),
    $.concat('vendor.min.js'),
    gulp.dest(conf.js.dest)
));
gulp.task('vendor:images', () => sc2(
    gulp.src(conf.vendors.images.src),
    gulp.dest(conf.vendors.images.dest)
));

gulp.task('css', () => sc2(
    gulp.src(conf.css.src),
    $.stylus({
        define: {
            url: resolver()
        }
    }),
    $.if(!isDevelopment, $.cssnano()),
    gulp.dest(conf.css.dest)
));
gulp.task('js', () => sc2(
    gulp.src(conf.js.src + '**/*.js'),
    $.babel( { presets: ['es2015'] } ),
    $.concat('all.min.js'),
    gulp.dest(conf.js.dest)
));
gulp.task('images', () => sc2(
    gulp.src(conf.images.src + '/**/*.*'),
    gulp.dest(conf.images.dest)
));
gulp.task('index', () => sc2(
    gulp.src(conf.index.src),
    $.pug(),
    gulp.dest(conf.html.dest)
));
gulp.task('html', () => sc2(
    gulp.src(conf.html.src),
    $.pug(),
    gulp.dest(conf.html.dest)
));
gulp.task('fonts', () => sc2(
    gulp.src(conf.fonts.src + '/**/*.*'),
    gulp.dest(conf.fonts.dest)
));

gulp.task('watch', () => {
    gulp.watch(frontendPath + 'css/**/*.styl', gulp.series('css'));
    gulp.watch(conf.js.src + '**/*.js', gulp.series('js'));
    gulp.watch(conf.images.src + '**/*.*', gulp.series('images'));
    gulp.watch(frontendPath + 'pages/**/*.pug', gulp.series('html'));
});

gulp.task('development', gulp.series(
    'clean',
    'vendor:css',
    'vendor:js',
    'vendor:images',
    'css',
    'js',
    'images',
    'index',
    'html',
    'fonts',
    'watch',
    (done) => done()
));

gulp.task('default', gulp.series('development', (done) => done()));
