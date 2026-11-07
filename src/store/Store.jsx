import { configureStore } from "@reduxjs/toolkit";

import Auth from "./slices/authSlice";
import Restaurants from "./slices/restaurantSlice";
import Products from "./slices/productSlice";
import Cart from "./slices/CartSlice";
import { save } from "../utils/storage";
import menu from "../data/menu.json";
export const store = configureStore({
  reducer: {
    Auth: Auth,
    Restaurant: Restaurants,
    Product: Products,
    Cart: Cart,
  },
});

// keep the cart, the users and the login in the browser, so a refresh does not lose them
var lastC = null;
var lastU = null;
var lastS = null;
var lastP = store.getState().Product.productList; // saved only when the admin changes it
store.subscribe(() => {
  var state = store.getState();
  if (state.Cart.cartitems !== lastC) {
    lastC = state.Cart.cartitems;
    save("skypark_cart", lastC);
  }
  if (state.Auth.users !== lastU) {
    lastU = state.Auth.users;
    save("skypark_users", lastU);
  }
  if (state.Auth.session !== lastS) {
    lastS = state.Auth.session;
    save("skypark_session", lastS);
  }
  if (state.Product.productList !== lastP) {
    lastP = state.Product.productList;
    if (lastP === menu) {
      localStorage.removeItem("skypark_products"); // back to menu.json
    } else {
      save("skypark_products", lastP);
    }
  }
});
