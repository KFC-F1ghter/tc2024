const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');


const Cat = mongoose.model('Cat', { name: String });


const kitty = new Cat({ name: 'Пушок' });
kitty.save().then(() => console.log('Мяу'));