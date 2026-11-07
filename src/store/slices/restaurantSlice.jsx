import { createSlice } from "@reduxjs/toolkit";
import restaurants from "../../data/restaurants.json";

// The restaurants come from src/data/restaurants.json
// Each dish in menu.json has a restaurantId that points to one restaurant here.

var RestaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurantList: restaurants,
  },
  reducers: {
    // add a new restaurant at the end of the list
    addrestaurant: (state, action) => {
      state.restaurantList.push(action.payload);
    },
    // remove the restaurant whose restaurantId is in the payload
    deleterestaurant: (state, action) => {
      state.restaurantList = state.restaurantList.filter(
        (obj) => obj.restaurantId != action.payload,
      );
    },
    // replace the restaurant that has the same restaurantId
    updaterestaurant: (state, action) => {
      var ind = state.restaurantList.findIndex(
        (obj) => obj.restaurantId == action.payload.restaurantId,
      );
      if (ind != -1) {
        state.restaurantList[ind] = action.payload;
      }
    },
  },
});

export const { addrestaurant, deleterestaurant, updaterestaurant } =
  RestaurantSlice.actions;
export default RestaurantSlice.reducer;
