const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb+srv://trizenmart:mlTsdKJ1DMqTsFo5@trizenmart.uihfkzd.mongodb.net/trizenmart?retryWrites=true&w=majority';
    await mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Core Successfully');
  } catch (error) {
    console.error(`Database Connection Failure: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
