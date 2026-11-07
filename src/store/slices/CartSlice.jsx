import { createSlice } from "@reduxjs/toolkit";
import { load } from "../../utils/storage";

function loadCart() {
  var saved = load("skypark_cart", []);
  return Array.isArray(saved) ? saved : [];
}

var CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartitems: loadCart(),
  },
  reducers: {
    addtocart: (state, action) => {
      var ind = state.cartitems.findIndex(
        (obj) => obj.productId == action.payload.productId,
      );
      if (ind == -1) {
        state.cartitems.push(action.payload);
      } else {
        state.cartitems[ind].quantity = state.cartitems[ind].quantity + 1;
      }
    },
    decreasecart: (state, action) => {
      var ind = state.cartitems.findIndex(
        (obj) => obj.productId == action.payload,
      );
      if (ind != -1 && state.cartitems[ind].quantity > 1) {
        state.cartitems[ind].quantity = state.cartitems[ind].quantity - 1;
      }
    },
    removefromcart: (state, action) => {
      state.cartitems = state.cartitems.filter(
        (obj) => obj.productId != action.payload,
      );
    },
    clearcart: (state) => {
      state.cartitems = [];
    },
  },
});

export const { addtocart, decreasecart, removefromcart, clearcart } =
  CartSlice.actions;
export default CartSlice.reducer;
