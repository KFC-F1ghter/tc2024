const { MongoClient } = require('mongodb');
const data = require('./data.js').data; // подключаем подготовленные данные

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test2024';

async function main() {
  // Подключаемся к серверу
  await client.connect();
  console.log('Connected successfully to cats');

  const db = client.db(dbName);
  const collection = db.collection('documents');

  // Проверяем, что данные корректно подключились
  console.log('Подключенные данные:', data);

  // Вставляем данные в коллекцию
  const insertResult = await collection.insertMany(data);
  console.log('Inserted documents =>', insertResult);
  

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
