const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');


var Cat = require('./models/cat.js').Cat


var cat = new Cat({
   title: "Коржик",
   nick: "korzhik",
})


cat.save();
