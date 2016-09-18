var $        = require('gulp-load-plugins')()
  , gulp     = require('gulp')
  , del      = require('del')
  , sc2      = require('stream-combiner2').obj
  , resolver = require('stylus').resolver;

var conf = {
    "vendors": {
        "css": {
            "src": [
                "bower_components/bootstrap/dist/css/bootstrap.min.css"
            ]
        },
        "js": {
            "src": [
            ]
        },
        "images": {
        }
    },
    "js": {
        "src": "resources/assets/js",
        "dest": "public/js"
    },
    "styles": {
        "src": "resources/assets/styl/grabber.styl",
        "dest": "public/css"
    },
    "images": {
        "src": ["resources/assets/images"],
        "dest": "public/img"
    }
};
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('vendor:css', function() {
    return sc2(
        gulp.src(conf.vendors.css.src),
        $.concat('vendor.min.css'),
        gulp.dest(conf.styles.dest)
    );
});
gulp.task('vendor:js', function() {
    return sc2(
        gulp.src(conf.vendors.js.src),
        $.concat('vendor.min.js'),
        gulp.dest(conf.js.dest)
    );
});
gulp.task('vendor:images', function() {
    return sc2(
        gulp.src(conf.vendors.images.src),
        gulp.dest(conf.vendors.images.dest)
    );
});
gulp.task('css', function() {
    return sc2(
        gulp.src(conf.styles.src),
        $.stylus({
            define: {
                url: resolver()
            }
        }),
        $.if(!isDevelopment, $.cssnano()),
        gulp.dest(conf.styles.dest)
    );
});
gulp.task('js', function() {
    return sc2(
        gulp.src(conf.js.src + '/**/*.*'),
        $.babel( { presets: ['es2015'] } ),
        $.concat('all.min.js'),
        //$.if(isDevelopment, $.uglify()),
        gulp.dest(conf.js.dest)
    );
});
gulp.task('images', function() {
    return sc2(
        gulp.src(conf.images.src + '/**/*.*'),
        gulp.dest(conf.images.dest)
    );
});
gulp.task('clean', function() {
    del(conf.styles.dest);
    del(conf.images.dest);
});

gulp.task('watch', function() {
    gulp.watch('resources/assets/styl' + '/*.*', ['css']);
    gulp.watch(conf.js.src + '/*.*', ['js']);
    gulp.watch(conf.images.src + '/*.*', ['images']);
});
gulp.task('dev', ['vendor:css', 'vendor:js', 'vendor:images', 'css', 'js', 'images', 'watch']);
gulp.task('default', ['clean'], function() {
    gulp.run('dev');
});
