var gulp = require("gulp");
const zip = require("gulp-zip");

gulp.task("createDeploy", function () {
  return gulp
    .src(["**", "!client/**"])
    .pipe(gulp.dest("./deploy"))
    .pipe(zip("deploy.zip"))
    .pipe(gulp.dest("./"));
});
