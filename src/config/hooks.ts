import { useState, useEffect } from "react";
import { Subscription } from "rxjs";
import { Order } from "../model/Order";
import { UID } from "../service/authService/AuthServiceFire";
import { orderService, productService } from "./service-config";
import { useSelectorAuth } from "../redux/store";
import { Product } from "../model/Product";

// export function useDispatchCode() {
//   const dispatch = useDispatch();
//   return (error: string, successMessage: string) => {
//       let code: CodeType = CodeType.OK;
//       let message: string = '';
      
//       if (error.includes('Authentication')) {

//           code = CodeType.AUTH_ERROR;
//           message = "Authentication error, mooving to Sign In";
//       } else {
//           code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
//               CodeType.UNKNOWN;
//           message = error;
//       }
//       dispatch(codeActions.set({ code, message: message || successMessage }))
//   }
// }


export function useSelectorOrders() {
  const userData = useSelectorAuth()
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const subscription: Subscription = orderService.getOrders(userData!.role == 'user' ? localStorage.getItem(UID)! : undefined)
        .subscribe({
            next(orders: Order[] | string) {
                let errorMessage: string = '';
                if (typeof orders === 'string') {
                    errorMessage = orders;
                } else {
                    setOrders(orders);
                }
            }
        });
    return () => subscription.unsubscribe();
}, [])
  return orders;
}

export function useSelectorProducts(){
  const[products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const subscription: Subscription = productService.getProducts()
        .subscribe({
            next(products: Product[] | string) {
                let errorMessage: string = '';
                if (typeof products === 'string') {
                    errorMessage = products;
                } else {
                    setProducts(products);
                }
            }
        });
    return () => subscription.unsubscribe();
}, [])
return products;
}