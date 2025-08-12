const mongoose = require('mongoose');

const databaseConnection = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/book';

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Hey, database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = databaseConnection;
