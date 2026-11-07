import { createSlice } from "@reduxjs/toolkit";
import { load } from "../../utils/storage";
import menu from "../../data/menu.json";

// The dishes saved by the admin (in the browser), or src/data/menu.json the first time.
function loadList() {
  var saved = load("skypark_products", null);
  if (Array.isArray(saved)) {
    return saved;
  }
  return menu;
}

var ProductSlice = createSlice({
  name: "products",
  initialState: {
    productList: loadList(),
    selectedProduct: null,
  },
  reducers: {
    // add a new dish at the end of the list
    addtolist: (state, action) => {
      state.productList.push(action.payload);
    },
    // remove the dish whose productId is in the payload
    deletefromlist: (state, action) => {
      state.productList = state.productList.filter(
        (obj) => obj.productId != action.payload,
      );
    },
    // replace the dish that has the same productId
    updateproduct: (state, action) => {
      var ind = state.productList.findIndex(
        (obj) => obj.productId == action.payload.productId,
      );
      if (ind != -1) {
        state.productList[ind] = action.payload;
      }
    },
    // a reducer cannot return a value, so the dish we find is stored in selectedProduct
    getone: (state, action) => {
      state.selectedProduct =
        state.productList.find((obj) => obj.productId == action.payload) ||
        null;
    },
    // throw away the admin changes and use menu.json again
    resetproducts: (state) => {
      state.productList = menu;
      state.selectedProduct = null;
    },
  },
});

export const {
  addtolist,
  deletefromlist,
  updateproduct,
  getone,
  resetproducts,
} = ProductSlice.actions;
export default ProductSlice.reducer;
