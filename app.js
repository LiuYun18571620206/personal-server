var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

///=======路由信息 （接口地址）开始 存放在./routes目录下===========//
var HomeRouter = require('./routes/Home');
var GameRouter = require('./routes/Game');
var CaseRouter = require('./routes/Case');
var ToolRouter = require('./routes/Tool');

var app = express();

///=======模板 开始===========//  
app.set('views', path.join(__dirname, 'views'));  //设置views键的值为路径views
app.set('view engine', 'jade');                   //设置view engine键值为jade
///=======模板 结束===========//

app.use(logger('dev'));                                      //设置中间件morgan 目的是控制台记录
app.use(express.json());                                     //使用json负载传入的请求
app.use(express.urlencoded({ extended: false }));            //使用urlencodeed负载传入的请求 传入的配置对象表示不允许使用querystring和qs库解析URL编码数据
app.use(cookieParser());                                     //用来实现Cookie的解析
app.use(express.static(path.join(__dirname, 'public')));     //将public加入静态文件列表

app.use('/', HomeRouter);        //在app中注册routes该接口
app.use('/Game', GameRouter);     //在app中注册users接口
app.use('/Case', CaseRouter);
app.use('/Tool', ToolRouter);

// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
