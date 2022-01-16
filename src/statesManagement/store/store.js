import { createContext, useReducer } from "react";

import Cookies from "js-cookie";
import rootReducers from "./reducer";

export const Store = createContext();

// const getSupplier = async () => {
//   try {
//     const { data } = await makeNetworkCall({ method: "GET", path: "/view-supplier" });
//     supplier = data.data.supplier;
//     Cookies.set("suppliers", supplier);
//   } catch (error) {
//     console.log(error);
//   }
// };

const initialState = {
  userInfo: Cookies.get("user") || null,
  notification: false,
  loading: false,
  success: null,
  error: null,
  suppliers: Cookies.get("suppliers") ? JSON.parse(Cookies.get("suppliers")) : [],
  brands: Cookies.get("brands") ? JSON.parse(Cookies.get("brands")) : [],
  products: Cookies.get("products") ? JSON.parse(Cookies.get("products")) : [],
  productByBarcode: [],
  profile: {},
  staff: Cookies.get("staff") ? JSON.parse(Cookies.get("staff")) : [],
  purchase: Cookies.get("purchases") ? JSON.parse(Cookies.get("purchases")) : [],
  branch: Cookies.get("branch") ? JSON.parse(Cookies.get("branch")) : [],
  totalSales: [],
  cart: {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
  },
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducers, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
