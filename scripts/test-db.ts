import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...')
    
    // Test 1: Basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test 2: Count products
    const productCount = await prisma.product.count()
    console.log(`📦 Total products in database: ${productCount}`)
    
    // Test 3: Get first 5 products
    const products = await prisma.product.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        inStock: true,
      },
    })
    
    console.log('\n📋 Sample products:')
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.price.toLocaleString('vi-VN')} VNĐ - ${product.category} - ${product.inStock ? 'In Stock' : 'Out of Stock'}`)
    })
    
    // Test 4: Get products by category
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    })
    
    console.log('\n📊 Products by category:')
    categories.forEach((cat) => {
      console.log(`  ${cat.category}: ${cat._count.category} products`)
    })
    
    // Test 5: Get products by brand
    const brands = await prisma.product.groupBy({
      by: ['brand'],
      where: {
        brand: {
          not: null,
        },
      },
      _count: {
        brand: true,
      },
    })
    
    console.log('\n🏷️  Products by brand:')
    brands.forEach((brand) => {
      console.log(`  ${brand.brand}: ${brand._count.brand} products`)
    })
    
    console.log('\n✅ All tests passed!')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

