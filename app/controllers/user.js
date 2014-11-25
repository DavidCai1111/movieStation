var User = require('../models/user');

//sighup
module.exports.signup =function(req,res){
    var _user = req.body.user;


    User.findOne({name: _user.name},  function(err, user) {
        if (err) {
            console.log(err)
        }

        if (user) {
            console.log(user + ' has already been signuped');
            return res.redirect('/signin')
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                console.log(user + ' signuped');
                res.redirect('/');
            })
        }
    })

};
//show signup
module.exports.showSignup = function(req,res){
    res.render('signup',{
        title:'注册页面'
    })
};
//show signin
module.exports.showSignin = function(req,res){
    res.render('signin',{
        title:'登陆页面'
    })
};

//signin
module.exports.signin =function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/signup');
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                console.log('password is matched');
                req.session.user = user;
                return res.redirect('/');
            }else{
                return res.redirect('/signin');
                console.log('password is not matched');
            }
        });
    });
};

//logout
module.exports.logout=function(req,res){
    delete req.session.user;
    //delete app.locals.user;

    res.redirect('/');
};

//user list page
module.exports.list =function(req,res) {

        User.fetch(function (err, users) {
            if (err) {
                console.log(err);
            }
            res.render('userlist', {
                title: 'imooc 用户列表页',
                users: users
            });

        })
};

//midware for user
module.exports.signinRequired = function(req,res,next){
    var user = req.session.user;
    if(!user){
        return res.redirect('/signin');
    }

    next();
};

module.exports.adminRequired = function(req,res,next){
    var user = req.session.user;
    console.log(user);
    if(user.role <= 10){
        return res.redirect('/signin');
    }

    next();
};
