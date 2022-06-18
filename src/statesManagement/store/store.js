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
  suppliers: Cookies.get("suppliers") ? JSON.parse(Cookies.get("suppliers")) : [],
  brands: Cookies.get("brands") ? JSON.parse(Cookies.get("brands")) : [],
  products: Cookies.get("products") ? JSON.parse(Cookies.get("products")) : [],
  productByBarcode: [],
  productById: [],
  profile: {},
  salesReport: [],
  depositReport: [],
  outOfStocksReport: [],
  profitOrLossReport: [],
  productPrice: [],
  stockLevel: [],
  paymentType: Cookies.get("paymentType") ? JSON.parse(Cookies.get("paymentType")) : [],
  staff: Cookies.get("staff") ? JSON.parse(Cookies.get("staff")) : [],
  purchase: Cookies.get("purchases") ? JSON.parse(Cookies.get("purchases")) : [],
  branch: Cookies.get("branch") ? JSON.parse(Cookies.get("branch")) : [],
  selectedBranch: Cookies.get("selectedBranch") || "",
  expenses: Cookies.get("expenses") ? JSON.parse(Cookies.get("expenses")) : [],
  deposits: Cookies.get("deposits") ? JSON.parse(Cookies.get("deposits")) : [],
  expensesCategories: Cookies.get("expensesCategories")
    ? JSON.parse(Cookies.get("expensesCategories"))
    : [],
  totalSales: Cookies.get("sales") ? JSON.parse(Cookies.get("sales")) : [],
  customers: Cookies.get("customers")?JSON.parse(Cookies.get("customers")): [],
  customerTransactions:[],
  customerDeposit:[],
  customerPurchased:[],

};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducers, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
