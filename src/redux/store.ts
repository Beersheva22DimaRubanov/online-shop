import { configureStore } from "@reduxjs/toolkit";
import { authActions, authReducer } from "./slices/AuthSlice";
import { useSelector } from "react-redux";
import { UserData } from "../model/UserData";
import { stat } from "fs";
import { cartReducer } from "./slices/CartSlice";
import { Product } from "../model/Product";
import { Cart } from "../model/Cart";

export const store = configureStore({
    reducer:{
        authState: authReducer,
        cartState: cartReducer,
    }
})

export function useSelectorAuth(){
    return useSelector<any, UserData>(state => state.authState.userData); 
}

export function useSelectorCart(){
    return useSelector<any, Cart[]>(state => state.cartState.cart); 
}