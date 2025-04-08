// src/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const Game = require('./models/Game');
const User = require('./models/User');
const News = require('./models/News');
const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Read sample data
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'games.json'), 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'users.json'), 'utf-8')
);

const news = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'news.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    // Hash passwords for sample users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );
    
    await Game.create(games);
    await User.create(hashedUsers);
    await News.create(news);
    
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Game.deleteMany();
    await User.deleteMany();
    await News.deleteMany();
    await Review.deleteMany();
    
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Command line arg processing
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please add proper command: -i (import) or -d (delete)');
  process.exit();
}