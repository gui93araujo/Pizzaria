import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import {
  createProductsSchema,
  listProductsSchema,
  listProductsByCategorySchema,
} from "./schemas/productSchema";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { addItemSchema, createOrderSchema } from "./schemas/orderSchema";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { AddItemController } from "./controllers/order/AddItemController";

const router = Router();
const upload = multer(uploadConfig);

// ROTAS DE USUÁRIO
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// ROTAS DE CATEGORIA
router.get("/category", isAuthenticated, new ListCategoryController().handle);

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle,
);

// ROTAS DE PRODUTO
router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductsController().handle,
);

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductsSchema),
  new CreateProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

// ROTAS DE PEDIDO
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

router.get("/orders", isAuthenticated, new ListOrderController().handle);

// Adicionar item a order
router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemController().handle,
);

export { router };
