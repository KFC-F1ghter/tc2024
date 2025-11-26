// createDB.js
const mongoose = require('mongoose');
const Cat = require('./models/cat').Cat; // модель Cat
const data = require('./data.js').data;  // подготовленные данные

// Подключаемся к базе
mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');

async function main() {
  try {
    // Чистим коллекцию, чтобы не дублировать данные
    await Cat.deleteMany({});
    console.log('Старые записи удалены');

    // Вставляем подготовленные данные
    const result = await Cat.insertMany(data);
    console.log('Данные успешно добавлены:', result);

  } catch (err) {
    console.error('Ошибка при вставке данных:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Соединение с MongoDB закрыто');
  }
}

main();
