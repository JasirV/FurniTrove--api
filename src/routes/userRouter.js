import express from "express";
import { getAllProducts, getproductWithCategory, getProductWithId, getUniqueProductCategories,} from "../controllers/userControllers/productController.js";
import { loadWishListPage, removeFromWishList, toggleWishListItem } from "../controllers/userControllers/wishListController.js";
import { loadCart, removeCart } from "../controllers/userControllers/cartController.js";
import handleCartAction from "../middleware/handleCartAction.js";
import checkAuth from "../middleware/checkAuth.js";
import { returnOrCancelOrder, createOrder,  createOrderbyCart,  getOrdersByUser } from "../controllers/userControllers/orderController.js";
import { addAddress , deleteAddress, getAllAddresses, updateAddress } from "../controllers/userControllers/addressController.js";
import handleController from "../utils/constant.js";
import { stripeIntent, successPayment } from "../controllers/userControllers/stripeController.js";
import { searchProducts } from "../controllers/userControllers/searchController.js";
import { login, signUp } from "../controllers/authController/authController.js";
import { sendMessage } from "../controllers/userControllers/contactController.js";
import { createOrUpdateWallet, createWalletTransaction, getWalletData } from "../controllers/userControllers/walletController.js";
import { getUserInfo, updateUserInfo } from "../controllers/userControllers/userInfoController.js";

const userRouter = express.Router();

userRouter.post("/register", signUp);
userRouter.post("/login", login);

userRouter.get("/products", getAllProducts);
userRouter.get("/products/:id", getProductWithId);
userRouter.get("/products/category/:categoryname", getproductWithCategory);
userRouter.get("/products/categorylist/unique", getUniqueProductCategories);

userRouter.get("/search/products",searchProducts)

userRouter.get("/:id/wishlist",checkAuth,loadWishListPage);
userRouter.post("/:id/wishlist",checkAuth,toggleWishListItem);
userRouter.delete("/:id/wishlist",checkAuth,removeFromWishList);

userRouter.get("/:id/cart",checkAuth,loadCart);
userRouter.post("/:id/cart",checkAuth, handleCartAction, handleController);
userRouter.delete("/:id/cart",checkAuth,removeCart);

userRouter.post("/payment/:id",checkAuth,stripeIntent)
userRouter.get("/payment/success/:id",successPayment)

userRouter.get("/orders/:id",checkAuth, getOrdersByUser);
userRouter.post("/orders/cancel/:orderId",checkAuth, returnOrCancelOrder);
userRouter.post("/orders",checkAuth, createOrder);
userRouter.post("/cart/orders",checkAuth, createOrderbyCart);


userRouter.post("/wallet",checkAuth, createOrUpdateWallet);
userRouter.post("/wallet/transaction",checkAuth, createWalletTransaction);
userRouter.get("/wallet/:id",checkAuth, getWalletData);

userRouter.get("/profile/:userId", checkAuth, getUserInfo);
userRouter.put("/profile/:userId", checkAuth, updateUserInfo);

userRouter.post("/address/:id",checkAuth,addAddress)
userRouter.get("/address/:id",checkAuth,getAllAddresses)
userRouter.put("/address/:id",checkAuth,updateAddress)
userRouter.delete("/address/:id",checkAuth,deleteAddress)

userRouter.post("/:id/contact",checkAuth,sendMessage)



export default userRouter;
