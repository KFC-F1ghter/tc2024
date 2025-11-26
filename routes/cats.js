var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с cats');
});

/* Страница котов */
router.get("/:nick", function(req, res, next) {
    res.send(req.params.nick);
});

module.exports = router;
