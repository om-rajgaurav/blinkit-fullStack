import mongoose from "mongoose"
import { Product, Category } from './src/models/index.js'
import 'dotenv/config.js'
import { categories, products } from "./seedData.js"


// data seeding concept
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Product.deleteMany({})
    await Category.deleteMany({})
    const categoryDocs = await Category.insertMany(categories)

    // it will help to make store name with id like this 'Milk, Curd & Paneer': new ObjectId('66eebcb3bcff41f7737c9f21'),
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id
      return map;
    }, {})

    // it will compare and add categoryId to all products like categoryMap.['Milk, Curd & Paneer'] return new ObjectId('66eebcb3bcff41f7737c9f21'),
    const productsWithCategoryIds = products.map(product => ({
      ...product,
      category: categoryMap[product.category]
    }))

    await Product.insertMany(productsWithCategoryIds)
    console.log('database sedded successfully')
  } catch (error) {
    console.error("Error sending database", error)
  } finally {
    mongoose.connection.close()
  }
}
seedDatabase()
