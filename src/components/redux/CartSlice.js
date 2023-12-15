import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    isLoggedIn : false,
    email: null,
    password:null,
    previousURL: "",
    shippingAddress: "",
    orders:[]
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  
  reducers: {
    ADD_TO_CARD:(state, action)=>{
      const productIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id)

      if(productIndex >= 0){
        //if the product exists the quantity with increase
        state.cartItems[productIndex].cartTotalQuantity += 1
      }else{
        const tempProduct = {...action.payload, cartTotalQuantity: 1,}
        state.cartItems.push(tempProduct)
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    DECREASE_CART:(state, action)=>{
      const productIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id)

      if(state.cartItems[productIndex].cartTotalQuantity > 1){
        state.cartItems[productIndex].cartTotalQuantity -= 1
      }else if (state.cartItems[productIndex].cartTotalQuantity === 1){
        const newCartItem = state.cartItems.filter((item)=> item._id !== action.payload._id)
        state.cartItems = newCartItem
      }
    },
    DELETE_CART: (state, action) => {
      const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id);
      state.cartItems = updatedCartItems;
    
      const updatedLocalStorageCartItems = JSON.parse(localStorage.getItem("cartItems")).filter(
        item => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedLocalStorageCartItems));
    },
    
    CLEAR_CART:(state, action)=>{
      state.cartItems = [];
      window.localStorage.removeItem("cartItems", JSON.stringify(state.cartItems))
    },
    CALCULATE_SUBTOTAL:(state)=>{
      const array = []
      state.cartItems?.map((item)=>{
        const {price, cartTotalQuantity} = item
        const cartItemAmount = price * cartTotalQuantity
        return array.push(cartItemAmount)
      })
      const reducer = array?.reduce((a, b)=> {
        return a + b
      }, 0)
      state.cartTotalAmount = reducer
    },
    CALCULATE_TOTAL_QUANTITY:(state, action)=>{
      const array = []
      state.cartItems?.map((item)=>{
        const {cartTotalQuantity} = item
        const quantity = cartTotalQuantity
        return array.push(quantity)
      })
      const reducer = array?.reduce((a, b)=> {
        return a + b
      }, 0)
      state.cartTotalQuantity = reducer
    },
    SET_ACTIVATE_USER: (state, action) => {
      const { email, password } = action.payload;
      return {
          ...state,
          isLoggedIn: true,
          email: email,
          password: password,
      };
    },
    SET_REMOVE_USER:(state)=>{
      state.isLoggedIn = false;
      state.email = null;
      state.password = null;
    },
    SAVE_SHIPPING_ADDRESS:(state, action)=>{
      state.shippingAddress = action.payload
    },
    SAVE_ORDERS:(state, action)=>{
      state.orders = action.payload
    }
  }
});

export const {SAVE_ORDERS,SAVE_SHIPPING_ADDRESS,SET_REMOVE_USER,ADD_TO_CARD, DECREASE_CART, DELETE_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY,SAVE_URL, SET_ACTIVATE_USER} = cartSlice.actions

export default cartSlice.reducer