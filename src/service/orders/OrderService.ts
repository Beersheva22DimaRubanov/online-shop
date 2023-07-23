import { Observable } from "rxjs";
import { Order } from "../../model/Order";

export default interface OrderService{
    addOrder(order: Order): Promise <Order>;
    getOrders(uid: string| undefined): Observable <string | Order[]>;
    deleteOrder(id: any): Promise <void>; 
    updateOrder(order: Order): Promise <Order>; 
}