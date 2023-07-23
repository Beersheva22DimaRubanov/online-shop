import AuthServiceFire from "../service/authService/AuthServiceFire";
import Auth from "../service/authService/Auth";
import ProductService from "../service/products/ProductsService";
import ProductServiceFire from "../service/products/ProductsServiceFire";
import OrderServiceFire from "../service/orders/OrderServiceFire";
import OrderService from "../service/orders/OrderService";

export const authService: Auth = new AuthServiceFire();
export const productService: ProductService = new ProductServiceFire();
export const orderService: OrderService = new OrderServiceFire();