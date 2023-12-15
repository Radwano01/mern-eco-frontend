import CartSlice from "../components/redux/CartSlice"

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer:{
        cart: CartSlice
    }
})

export default store