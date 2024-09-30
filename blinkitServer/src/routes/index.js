import { authRoutes } from "./auth-route.js";
import { orderRoutes } from "./order-route.js";
import { categoryRoutes, productRoutes } from "./product-route.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix });
  fastify.register(productRoutes, { prefix });
  fastify.register(categoryRoutes, { prefix });
  fastify.register(orderRoutes, { prefix });
}
