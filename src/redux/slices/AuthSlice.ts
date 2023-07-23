import { createReducer, createSlice } from '@reduxjs/toolkit'
import { UserData } from '../../model/UserData'

const AUTH_ITEM = 'auth-item';

function getUserData() {
    const userDataJson = localStorage.getItem(AUTH_ITEM) || ''
    let res = null;
    if (userDataJson) {
        res = JSON.parse(userDataJson);
    }
    return res;
}

const initialState: { userData: UserData } = {
    userData: getUserData()
}

const slice = createSlice({
    initialState: initialState,
    name: "authState",
    reducers: {
        setUser: (state, data) => {
            if (data.payload) {
                localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload))
                state.userData = data.payload
            }
        },
        reset: (state) => {
            localStorage.removeItem(AUTH_ITEM)
            state.userData = null;
        }
    }
})

export const authActions = slice.actions;
export const authReducer = slice.reducer;