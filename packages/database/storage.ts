import { db } from './db';
import { 
  users, 
  products, 
  orders, 
  gallery, 
  settings, 
  reviews, 
  wishlist, 
  sizes, 
  productSizes 
} from './schema';
import { eq, and } from 'drizzle-orm';
import type { 
  User, 
  InsertUser, 
  Product, 
  InsertProduct, 
  Order, 
  InsertOrder, 
  Gallery, 
  InsertGallery, 
  Settings, 
  InsertSettings, 
  Size, 
  InsertSize, 
  ProductSize, 
  InsertProductSize,
  ProductWithSizes 
} from './schema';

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;

  // Gallery
  getAllGalleryImages(): Promise<Gallery[]>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
  deleteGalleryImage(id: string): Promise<void>;

  // Settings
  getSetting(key: string): Promise<Settings | undefined>;
  setSetting(key: string, value: string): Promise<Settings>;
  getAllSettings(): Promise<Settings[]>;

  // Reviews
  createReview(data: any): Promise<any>;
  getProductReviews(productId: string): Promise<any[]>;
  deleteReview(id: string): Promise<void>;

  // Wishlist
  addToWishlist(userId: string, productId: string): Promise<any>;
  getUserWishlist(userId: string): Promise<any[]>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;

  // Sizes
  getAllSizes(): Promise<Size[]>;
  createSize(size: InsertSize): Promise<Size>;
  deleteSize(id: string): Promise<void>;

  // Product Sizes
  getProductSizes(productId: string): Promise<(ProductSize & { size: Size })[]>;
  getProductWithSizes(productId: string): Promise<ProductWithSizes | undefined>;
  addProductSize(productId: string, sizeId: string, stock: number): Promise<ProductSize>;
  updateProductSizeStock(productId: string, sizeId: string, stock: number): Promise<ProductSize | undefined>;
  deleteProductSize(productId: string, sizeId: string): Promise<boolean>;
}

export class DBStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Products - ГЛАВНОЕ ДЛЯ СОХРАНЕНИЯ ТОВАРОВ
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Orders
  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  // Gallery
  async getAllGalleryImages(): Promise<Gallery[]> {
    return await db.select().from(gallery);
  }

  async createGalleryImage(image: InsertGallery): Promise<Gallery> {
    const result = await db.insert(gallery).values(image).returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await db.delete(gallery).where(eq(gallery.id, id));
  }

  // Settings
  async getSetting(key: string): Promise<Settings | undefined> {
    const result = await db.select().from(settings).where(eq(settings.key, key));
    return result[0];
  }

  async setSetting(key: string, value: string): Promise<Settings> {
    const existing = await this.getSetting(key);
    if (existing) {
      const result = await db
        .update(settings)
        .set({ value })
        .where(eq(settings.key, key))
        .returning();
      return result[0];
    }
    const result = await db.insert(settings).values({ key, value }).returning();
    return result[0];
  }

  async getAllSettings(): Promise<Settings[]> {
    return await db.select().from(settings);
  }

  // Reviews
  async createReview(data: any): Promise<any> {
    const result = await db.insert(reviews).values(data).returning();
    return result[0];
  }

  async getProductReviews(productId: string): Promise<any[]> {
    return await db.select().from(reviews).where(eq(reviews.productId, productId));
  }

  async deleteReview(id: string): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  // Wishlist
  async addToWishlist(userId: string, productId: string): Promise<any> {
    const result = await db
      .insert(wishlist)
      .values({ userId, productId })
      .returning();
    return result[0];
  }

  async getUserWishlist(userId: string): Promise<any[]> {
    return await db.select().from(wishlist).where(eq(wishlist.userId, userId));
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)));
  }

  // Sizes
  async getAllSizes(): Promise<Size[]> {
    return await db.select().from(sizes);
  }

  async createSize(size: InsertSize): Promise<Size> {
    const result = await db.insert(sizes).values(size).returning();
    return result[0];
  }

  async deleteSize(id: string): Promise<void> {
    await db.delete(sizes).where(eq(sizes.id, id));
  }

  // Product Sizes
  async getProductSizes(productId: string): Promise<(ProductSize & { size: Size })[]> {
    // This would need a join - simplified for now
    return await db
      .select()
      .from(productSizes)
      .where(eq(productSizes.productId, productId));
  }

  async getProductWithSizes(productId: string): Promise<ProductWithSizes | undefined> {
    const product = await this.getProduct(productId);
    if (!product) return undefined;

    const productSizesList = await this.getProductSizes(productId);
    return {
      ...product,
      sizes: productSizesList,
    };
  }

  async addProductSize(productId: string, sizeId: string, stock: number): Promise<ProductSize> {
    const result = await db
      .insert(productSizes)
      .values({ productId, sizeId, stock })
      .returning();
    return result[0];
  }

  async updateProductSizeStock(
    productId: string,
    sizeId: string,
    stock: number
  ): Promise<ProductSize | undefined> {
    const result = await db
      .update(productSizes)
      .set({ stock })
      .where(and(eq(productSizes.productId, productId), eq(productSizes.sizeId, sizeId)))
      .returning();
    return result[0];
  }

  async deleteProductSize(productId: string, sizeId: string): Promise<boolean> {
    const result = await db
      .delete(productSizes)
      .where(and(eq(productSizes.productId, productId), eq(productSizes.sizeId, sizeId)));
    return !!result;
  }
}

// Export singleton instance
export const dbStorage = new DBStorage();
