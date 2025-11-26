const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');

var schema = mongoose.Schema({ name: String })


schema.methods.meow = function(){
   console.log(this.name + " сказал мяу")
}

const Cat = mongoose.model('Cat', schema);


const kitty = new Cat({ name: 'Пушок' });
kitty.save().then(() => kitty.meow());