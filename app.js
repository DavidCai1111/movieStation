var express = require("express");
var path = require("path");
var port = 3000;
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var fs = require('fs');

var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect(dbUrl);

//models loading
var models_path = __dirname + '/app/models';
var walk = function(path){
    fs
        .readdirSync(path)
        .forEach(function(file){
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if(stat.isFile()){
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(newPath)
                }
            }
            else if (stat.isDirectory()){
                walk(newPath);
            }
        })
};
walk(models_path);

app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('connect-multiparty')());
app.use(session({
    secret:'imooc',
    store: new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

if (app.get('env') === 'development'){
    app.set('showStackError',true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

app.use(express.static(path.join(__dirname,'public')));

require('./config/routes')(app);

app.locals.moment = require('moment');
app.listen(port);
console.log("immoc is started at"+port);

