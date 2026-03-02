const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/userModel');
const Product = require('./src/models/productModel');
const connectDB = require('./src/config/db');

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@trendhub.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'user',
  },
];

const products = [
  {
    name: 'Classic White T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    brand: 'TrendHub',
    category: 'Men',
    price: 29.99,
    countInStock: 100,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Slim Fit Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    description: 'Modern slim fit jeans with stretch denim for comfort and style.',
    brand: 'TrendHub',
    category: 'Men',
    price: 79.99,
    countInStock: 75,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Leather Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    description: 'Genuine leather jacket with classic design. A timeless wardrobe essential.',
    brand: 'TrendHub',
    category: 'Men',
    price: 299.99,
    countInStock: 30,
    rating: 5.0,
    numReviews: 15,
  },
  {
    name: 'Casual Sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    description: 'Comfortable sneakers perfect for daily wear. Lightweight and breathable.',
    brand: 'TrendHub',
    category: 'Men',
    price: 89.99,
    countInStock: 120,
    rating: 4.5,
    numReviews: 20,
  },
  {
    name: 'Floral Summer Dress',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    description: 'Beautiful floral print dress perfect for summer occasions.',
    brand: 'TrendHub',
    category: 'Women',
    price: 69.99,
    countInStock: 60,
    rating: 4.8,
    numReviews: 18,
  },
  {
    name: 'High-Waisted Jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    description: 'Trendy high-waisted jeans with a flattering fit.',
    brand: 'TrendHub',
    category: 'Women',
    price: 74.99,
    countInStock: 85,
    rating: 4.3,
    numReviews: 10,
  },
  {
    name: 'Elegant Blazer',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
    description: 'Professional blazer perfect for office wear or formal occasions.',
    brand: 'TrendHub',
    category: 'Women',
    price: 129.99,
    countInStock: 45,
    rating: 4.7,
    numReviews: 14,
  },
  {
    name: 'Silk Blouse',
    image: 'https://images.unsplash.com/photo-1564257577-d18b5b6c4b3d?w=500',
    description: 'Luxurious silk blouse with elegant draping.',
    brand: 'TrendHub',
    category: 'Women',
    price: 89.99,
    countInStock: 70,
    rating: 4.6,
    numReviews: 11,
  },
  {
    name: 'Kids Graphic T-Shirt',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    description: 'Fun graphic t-shirt for kids. Soft and comfortable cotton.',
    brand: 'TrendHub',
    category: 'Kids',
    price: 19.99,
    countInStock: 150,
    rating: 4.4,
    numReviews: 25,
  },
  {
    name: 'Kids Denim Shorts',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
    description: 'Durable denim shorts perfect for active kids.',
    brand: 'TrendHub',
    category: 'Kids',
    price: 34.99,
    countInStock: 100,
    rating: 4.2,
    numReviews: 16,
  },
  {
    name: 'Leather Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    description: 'Premium leather wallet with multiple card slots.',
    brand: 'TrendHub',
    category: 'Accessories',
    price: 49.99,
    countInStock: 200,
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: 'Designer Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    description: 'Stylish sunglasses with UV protection.',
    brand: 'TrendHub',
    category: 'Accessories',
    price: 129.99,
    countInStock: 80,
    rating: 4.7,
    numReviews: 22,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('✅ Data Imported Successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@trendhub.com / admin123');
    console.log('User: john@example.com / password123');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();

    console.log('✅ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
