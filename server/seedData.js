require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = require('./data/products');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed the products
const seedProducts = async () => {
  try {
    // Delete existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Inserted ${createdProducts.length} products`);

    console.log('Data seeding completed!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedProducts();