module.exports = function connectErrorHandlers(app) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }); // 404 에러가 떳을때 에러 메시지

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      if (!err) {
        next();
        return;
      }
      console.log('dev error', err);
      res.status(err.status || 500); // 404가 아니면 500
      res.render('error', { // error.ejs가 생략 render 이하 json
        message: err.message, // error 발생시 views에 error.ejs로 감 stack
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) { // product 모드 일떄
    if (!err) {
      next();
      return;
    }

    console.log('prod error error', err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {} //에러 메시지를 감춤
    });
  });
};
