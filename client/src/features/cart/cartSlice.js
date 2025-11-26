import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const save = (items) => localStorage.setItem("cart", JSON.stringify(items));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const prod = action.payload;
      const exists = state.items.find(i => i._id === prod._id);
      if (exists) {
        state.items = state.items.map(i => i._id === prod._id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        state.items.push({ ...prod, qty: 1 });
      }
      save(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
      save(state.items);
    },
    increaseQty: (state, action) => {
      state.items = state.items.map(i => i._id === action.payload ? { ...i, qty: i.qty + 1 } : i);
      save(state.items);
    },
    decreaseQty: (state, action) => {
      state.items = state.items.map(i =>
        i._id === action.payload ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      );
      save(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      save(state.items);
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
