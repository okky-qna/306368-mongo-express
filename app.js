var express = require('express'); // node_modules에 express폴더에 들어 있는 index.js를 호출
var path = require('path'); // 경로 관리
var serveStatic = require('serve-static');
var logger = require('morgan'); //log를 남겨줌
var cookieParser = require('cookie-parser'); // 쿠키를 처리
var bodyParser = require('body-parser'); // http가 전송 될때 바디를 처리

var connectMongoDB = require('./src/connectMongoDB');
var connectRoutes = require('./src/connectRoutes');
var connectErrorHandlers = require('./src/connectErrorHandlers');

var app = express(); //express 객체 생성
// view engine setup
app.set('views', path.join(__dirname, 'views')); // 어떤 view를 사용 할 것인지 현재 폴더에 있는 views를 사용
app.set('view engine', 'ejs'); // view engine을 ejs를 쓰겟다. 기본값은 jade

app.use(logger('dev')); // 개발 모드 에러 메시지 볼수 있음, product모드
app.use(bodyParser.json()); // bodyparser가 json 관련 처리를 해줌
app.use(bodyParser.urlencoded({extended: false})); // urlencoding 해줌
app.use(cookieParser()); // 쿠키 파서
app.use(serveStatic(path.join(__dirname, 'public'))); // 정적인 데이터 설정 /  현재 폴더의 public

function startApp(app) {
  var port = 3000;
  app.listen(port, function (err) {
    if (err) {
      console.log('Error createing a server at port: ' + 3000);
      process.exit(1);
    }
    console.log('서버가 ' + port + '번 포트에서 실행 중입니다.!!');
  });
}

// 몽고디비는 비동기식으로 연결되기 때문에 callback이 필요하다.
connectMongoDB(app, function (err) {
  if (err) {
    console.log('몽고디비 연결 실패');
    console.error(err);
    process.exit(1);
  }

  connectRoutes(app);
  connectErrorHandlers(app);
  startApp(app);
});
