import { createReducer, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../model/Product'
import { Cart } from '../../model/Cart'

const CART_ITEM = 'cart-item';

function getCartItems(){
    const userDataJson = localStorage.getItem(CART_ITEM) || ''
    let res = [];
    if (userDataJson) {
        res = JSON.parse(userDataJson);
    }
    return res;
}

const initialState: {cart: Cart[]} = {
    cart: getCartItems()
}

const slice = createSlice({
    initialState: initialState,
    name: "cartState",
    reducers: {
        addToCart: (state, data) => {
            if(data.payload){
                const index = state.cart.findIndex( (el) => el.product?.id === data.payload.id);
                if(index >= 0){
                    state.cart[index].amount++
                } else{
                    state.cart.push({product: data.payload, amount: 1});
                }
            }
            localStorage.setItem(CART_ITEM, JSON.stringify(state.cart))
        },
        removeFromCart:  (state, data) => {
            if(data.payload){
                const index = state.cart.findIndex( (el) => el.product?.id === data.payload.id);
                if(index >= 0){
                    state.cart[index].amount > 0 ?   state.cart[index].amount-- : state.cart.splice(index, 1);
                    if( state.cart[index].amount == 0){
                        state.cart.splice(index, 1)
                    }
                }
                localStorage.setItem(CART_ITEM, JSON.stringify(state.cart))
            }
        },
        clearCart: (state) => {
            localStorage.removeItem(CART_ITEM);
            state.cart = [];
        }
    }
})

export const cartActions = slice.actions;
export const cartReducer = slice.reducer;
