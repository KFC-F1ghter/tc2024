var express = require('express');
var router = express.Router();
var Cat = require('../models/cat').Cat;
var checkAuth = require("../middlewares/checkAuth.js");

/* Страница котов */
router.get("/:nick", checkAuth, async function(req, res, next) {
   var cats = await Cat.find({nick: req.params.nick});
   console.log(cats)
   if(!cats.length) return next(new Error("Нет такого котенка в мультфильме Три кота"))
       var cat = cats[0];
       res.render('cat', {
           title: cat.title,
           picture: cat.avatar,
           desc: cat.desc
       })
});


module.exports = router;
