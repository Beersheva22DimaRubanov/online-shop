import { Cart } from "./Cart"
import { Product } from "./Product"
import Status from "./Status"
import { UserData } from "./UserData"

export type Order = {
    id?: any,
    userId: any,
    orderTime: string
    userData: UserData,
    cart: Cart[],
    price: string,
    status: 'processing' | 'delivery' | 'deliveried',
    lastDay: string
}