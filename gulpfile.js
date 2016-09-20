var $        = require('gulp-load-plugins')()
  , gulp     = require('gulp')
  , del      = require('del')
  , sc2      = require('stream-combiner2').obj
  , resolver = require('stylus').resolver;

const publicPath = "public/";
const frontendPath = "frontend/"
var conf = {
    "vendors": {
        "css": {
            "src": [
                "bower_components/bootstrap/dist/css/bootstrap.min.css"
            ]
        },
        "js": {
            "src": ""
        },
        "images": {
            "src": ""
        }
    },
    "js": {
        "src": frontendPath + "js",
        "dest": publicPath + "js"
    },
    "css": {
        "src": frontendPath,
        "dest": publicPath + "css"
    },
    "images": {
        "src": frontendPath + "images",
        "dest": publicPath + "img"
    },
    "index": {
        "src": frontendPath + "index/index.pug",
        "dest": frontendPath
    },
    "html": {
        "src": [
            frontendPath+ "**/*.pug",
            "!" + frontendPath + "index/*.pug",
            "!" + frontendPath + "layout.pug"
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
// gulp.task('vendor:js', () => sc2(
//     gulp.src(conf.vendors.js.src),
//     $.concat('vendor.min.js'),
//     gulp.dest(conf.js.dest)
// ));

gulp.task('css', () => sc2(
    gulp.src(conf.css.src + '**/*.styl'),
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
    gulp.src(conf.images.src + '*.{jpg,png}'),
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

gulp.task('watch', () => {
    gulp.watch(conf.css.src + '**/*.styl', gulp.series('css'));
    gulp.watch(conf.js.src + '**/*.js', gulp.series('js'));
    gulp.watch(conf.images.src + '*.{jpg,png}', gulp.series('images'));
});

gulp.task('development', gulp.series(
    'clean',
    'vendor:css',
    // 'vendor:js',
    'css',
    'js',
    'images',
    'index',
    'html',
    'watch',
    (done) => done()
));

gulp.task('default', gulp.series('development', (done) => done()));
