var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');
var Catetory = require('../models/catetory');


//admin page
module.exports.new =function(req,res){
    res.render('catetory_admin',{
        title : 'imooc 后台分类录入页',
        catetory:{}
    });
};

//admin post movie
module.exports.save =function(req,res){
    var _catetory = req.body.catetory;

    var catetory = new Catetory(_catetory);

    catetory.save(function(err,caterory){
            if(err){
                console.log(err);
            }
            res.redirect('/admin/catetory/list');
        })
};

//list page
module.exports.list =function(req,res) {

    Catetory.fetch(function (err, catetories) {
        if (err) {
            console.log(err);
        }
        res.render('catetorylist', {
            title: 'imooc 分类列表页',
            catetories: catetories
        });

    })
};



