var gulp = require('gulp'),
	uglify = require('gulp-uglify'), // Минификация JS
	csso = require('gulp-csso')
	concat = require('gulp-concat'); // Склейка файлов
	debug = require('gulp-debug'); // Склейка файлов
	sourcemaps = require('gulp-sourcemaps');
	notify = require('gulp-notify');
	sftp = require('gulp-sftp-up4');
	svgSprite = require('gulp-svg-sprite');
	svg2png = require('gulp-svg2png-update');
	spritesmith = require('gulp.spritesmith');
	imageResize = require('gulp-image-resize');
	del = require('del');
	browserSync = require('browser-sync').create();



//--------------------------------- Готовим отдельно спрайты ----------------------------------
//--------------------------------- Иконки для тулбаров ----------------------------------------
//ресайзим картинки и кладем их в temp/
	gulp.task('resizePng32', function () {
		var spriteData = gulp.src('src/StringFld/assets/img/**/*.png').pipe(imageResize({
			width : 32,
			height : 32,
			crop : true,
			upscale : false
		}));
		return spriteData.pipe(gulp.dest('temp/'));
		});
	
gulp.task('resizePng24', function () {
	var spriteData = gulp.src('src/StringFld/assets/img/**/*.png').pipe(imageResize({
		width : 24,
		height : 24,
		crop : true,
		upscale : false
	}));
	return spriteData.pipe(gulp.dest('temp/'));
  });

  //берем картики из temp и делаеам из них спрайты и css
	gulp.task('spritePng32', function () {
		var spriteData = gulp.src('temp/**/*.png').pipe(spritesmith({
			imgName: 'sprite_32.png',
			cssName: 'sprite_32.css',
			algorithm:'left-right',
			cssOpts: {
				cssSelector: function (sprite) {
					return '.st_icon_32_' + sprite.name;
				}
			}
		}));
		return spriteData.pipe(gulp.dest('src/StringFld/assets/'));
		});


gulp.task('spritePng24', function () {
	var spriteData = gulp.src('temp/**/*.png').pipe(spritesmith({
	  imgName: 'sprite_24.png',
		cssName: 'sprite_24.css',
		algorithm:'left-right',
		cssOpts: {
			cssSelector: function (sprite) {
				return '.st_icon_24_' + sprite.name;
			}
		}
	}));
	return spriteData.pipe(gulp.dest('src/StringFld/assets/'));
  });
  //очищаем clean
	gulp.task('clean', function () {
		return del('temp/');
	});
  // --------------- Иконка для якореей (сворачивания\разворачивания вершин) в дереве
	gulp.task('resizeTree16', function () {
		var spriteData = gulp.src('src/Tree/assets/img/*.png').pipe(imageResize({
			width : 16,
			height : 16,
			crop : true,
			upscale : false
		}));
		return spriteData.pipe(gulp.dest('src/Tree/assets/img/temp/'));
		});
  	gulp.task('spriteTree16', function () {
      var spriteData = gulp.src('src/Tree/assets/img/temp/**/*.png').pipe(spritesmith({
        imgName: 'sprite_16.png',
        cssName: 'sprite_16.css',
        algorithm:'left-right',
        cssOpts: {
          cssSelector: function (sprite) {
            return '.st_icon_16_' + sprite.name;
          }
        }
      }));
      return spriteData.pipe(gulp.dest('src/Tree/assets/'));
      });

  //очищаем clean
	gulp.task('cleanTree16', function () {
		return del('src/Tree/assets/img/temp/');
	});
	
gulp.task('sprite', gulp.series(
      'clean', 'resizePng32', 'spritePng32', 'resizePng24', 'spritePng24','clean'/*, 
      'cleanTree16', 'resizeTree16','spriteTree16','cleanTree16'*/));
//--------------------------------------------


//создаем css в ассетс
//собираем css  в папку tempProd c минификацией без sourcemaps
//gulp.task('css', function() {
//	return gulp.src([
//				'src/**/*.css',
//			], 	{ allowEmpty: true }/*{since: gulp.lastRun('build')}*/)
//.pipe(concat('st-grid.css')) 
//.pipe(csso()).on('error', notify.onError())
//.pipe(sourcemaps.write('.'))
//.pipe(gulp.dest('./build/assets'))		
//});

//копируем спрайты в ассетс
/*gulp.task('copySprite', function(){
	return gulp.src([
     'src/Checkbox/black.png', 
     'src/Tree/assets/sprite_16.png',
     'src/StringFld/assets/sprite_24.png',
		 'src/StringFld/assets/sprite_32.png',
      ])
 .pipe(gulp.dest('./build/assets/'));
});*/