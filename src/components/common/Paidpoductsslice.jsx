import { createSlice } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../axiosconfig/AxiosConfig";
const initialState = {
  orders: [], // Array to store orders, each with an ID and items
};

const Paidpoductsslice = createSlice({
  name: "paid",
  initialState,
  reducers: {
    // Action to add paid products (assuming this is needed)
    addOrder: (state, action) => {
      const {
        orderId,
        usern_name,
        usern_email,
        totalPrice,
        paymentDate,
        items,
      } = action.payload;
      const existingOrderIndex = state.orders.findIndex(
        (order) => order.orderId === orderId
      );

      if (existingOrderIndex === -1) {
        // Order ID does not exist, add new order
        const updateOrders = AxiosConfig({
          method: "post",
          url: `https://five5-08t6.onrender.com/orders`,
          data: {
            orderId: orderId,
            usern_name: usern_name || "guest",
            usern_email: usern_email || "not found",
            totalPrice: totalPrice,
            paymentDate: paymentDate,
            delivered: "no",
            items: items.map((e) => e.product_name), // Implicit return
          },
        });

        state.orders.push({
          orderId,
          usern_name,
          usern_email,
          totalPrice,
          paymentDate,
          items,
        });
      } else {
        console.log("order id excists");
      }
    },
    // addPaidProducts: (state, action) => {
    //   state.items = action.payload;
    // },
    // // Action to set the order ID
    // setOrderId: (state, action) => {
    //   console.log("setOrderId payload:", action.payload); // Debugging line

    //   state.orderIds.push(action.payload);
    // },
    // Action to clear the entire state (both products and order ID)
    clearPaidState: () => initialState,
  },
});

export const { clearPaidState, addOrder } = Paidpoductsslice.actions;

export default Paidpoductsslice.reducer;
