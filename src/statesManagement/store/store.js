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
  suppliers: [],
  brands: [],
  stores: [],
  products: [],
  profile: {},
  staff: [],
  purchase: [],
  branch: [],
  sales: [],
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducers, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
