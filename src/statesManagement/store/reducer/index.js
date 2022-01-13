// const { combineReducers } = require("redux");
// import loginReducer from "./login-reducers";
// import supplierReducer from "./suppliers-reducers";
import Cookies from "js-cookie";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  ADD_SUPPLIERS_REQUEST,
  ADD_SUPPLIERS_SUCCESS,
  ADD_SUPPLIERS_FAIL,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_SUCCESS,
  DELETE_SUPPLIERS_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIERS_SUCCESS,
  UPDATE_SUPPLIERS_FAIL,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRANDS_REQUEST,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  UPDATE_BRANDS_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAIL,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAIL,
  GET_PURCHASE_REQUEST,
  GET_PURCHASE_SUCCESS,
  GET_PURCHASE_FAIL,
  ADD_PURCHASE_SUCCESS,
  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  ADD_SALES_FAIL,
  ADD_SALES_REQUEST,
  ADD_SALES_SUCCESS,
  ADD_SALES_DATA_REQUEST,
  ADD_SALES_DATASUCCESS,
  ADD_SALES_DATA_FAIL,
  GET_TOTAL_SALES_REQUEST,
  GET_TOTAL_SALES_SUCCESS,
  GET_TOTAL_SALES_FAIL,
} from "../constants";

// const rootReducers = combineReducers({
//   loginReducer,
//   supplierReducer,
// });

const rootReducers = (state, action) => {
  switch (action.type) {
    // Login Reducers
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, userInfo: null };

    // suppliers reducers

    case GET_SUPPLIERS_REQUEST:
      return { ...state, loading: true };
    case GET_SUPPLIERS_SUCCESS: {
      if (Cookies.get("suppliers")) {
        Cookies.remove("suppliers");
        Cookies.set("suppliers", JSON.stringify(action.payload));
      } else {
        Cookies.set("suppliers", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, suppliers: action?.payload };
    }
    case GET_SUPPLIERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_SUPPLIERS_REQUEST:
      return { ...state, loading: true };
    case ADD_SUPPLIERS_SUCCESS:
      return { ...state, loading: false };
    case ADD_SUPPLIERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_SUPPLIERS_REQUEST:
      return { ...state, loading: true };
    case DELETE_SUPPLIERS_SUCCESS:
      return { ...state, loading: false };
    case DELETE_SUPPLIERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SUPPLIERS_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_SUPPLIERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Brand Reducers
    case GET_BRANDS_REQUEST:
      return { ...state, loading: true };
    case GET_BRAND_SUCCESS: {
      if (Cookies.get("brands")) {
        Cookies.remove("brands");
        Cookies.set("brands", JSON.stringify(action.payload));
      } else {
        Cookies.set("brands", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, brands: action?.payload };
    }
    case GET_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_BRAND_REQUEST:
      return { ...state, loading: true };
    case ADD_BRAND_SUCCESS:
      return { ...state, loading: false };
    case ADD_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_BRAND_REQUEST:
      return { ...state, loading: true };
    case DELETE_BRAND_SUCCESS:
      return { ...state, loading: false };
    case DELETE_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_BRANDS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BRAND_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };
    // Prodducts Reducers
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_SUCCESS: {
      if (Cookies.get("products")) {
        Cookies.remove("products");
        Cookies.set("products", JSON.stringify(action.payload));
      } else {
        Cookies.set("products", JSON.stringify(action.payload));
      }

      return { ...state, loading: false, products: action.payload };
    }
    case GET_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case ADD_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // profile reudcer
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action?.payload };
    case GET_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    // Staff Reducer
    case ADD_STAFF_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_STAFF_SUCCESS:
      return { ...state, loading: false, notification: true, sussess: action.payload };
    case ADD_STAFF_FAIL:
      return { ...state, loading: false, notification: true, error: action.payload };

    case GET_STAFF_REQUEST:
      return { ...state, loading: true };
    case GET_STAFF_SUCCESS: {
      if (Cookies.get("staff")) {
        Cookies.remove("staff");
        Cookies.set("staff", JSON.stringify(action.payload));
      } else {
        Cookies.set("staff", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, staff: action?.payload };
    }
    case GET_STAFF_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Puerchase Reducer

    case GET_PURCHASE_REQUEST:
      return { ...state, loading: true };
    case GET_PURCHASE_SUCCESS: {
      if (Cookies.get("purchases")) {
        Cookies.remove("purchases");
        Cookies.set("purchases", JSON.stringify(action.payload));
      } else {
        Cookies.set("suppliers", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, purchase: action.payload };
    }
    case GET_PURCHASE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_PURCHASE_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_PURCHASE_SUCCESS:
      return { ...state, loading: false, notification: true, success: action.payload };
    case ADD_PURCHASE_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    // Store/Branch Reducer
    case GET_STORE_REQUEST:
      return { ...state, loading: true };
    case GET_STORE_SUCCESS: {
      if (Cookies.get("branch")) {
        Cookies.remove("branch");
        Cookies.set("branch", JSON.stringify(action.payload));
      } else {
        Cookies.set("branch", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, branch: action?.payload };
    }
    case GET_STORE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Get Sales Reducer

    case ADD_SALES_DATA_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_SALES_DATASUCCESS: {
      Cookies.remove("cartItems");

      return { ...state, loading: false, notification: true, success: action.payload };
    }
    case ADD_SALES_DATA_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    case ADD_SALES_SUCCESS: {
      const newSales = action.payload;
      const existingProduct = state.cart.cartItems.find(
        (sale) => sale.product_barcode === newSales.product_barcode
      );
      const cartItems = existingProduct
        ? state.cart.cartItems.map((sale) =>
            sale.product_barcode === existingProduct.product_barcode
              ? {
                  ...newSales,
                  purchased_qty: Number(sale.purchased_qty) + Number(newSales.purchased_qty),
                  total_amount: Number(sale.unit_price) * Number(newSales.purchased_qty),
                }
              : sale
          )
        : [...state.cart.cartItems, newSales];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case ADD_SALES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_TOTAL_SALES_REQUEST:
      return { ...state, loading: true };
    case GET_TOTAL_SALES_SUCCESS:
      return { ...state, loading: false, totalSales: action?.payload };
    case GET_TOTAL_SALES_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
};
export default rootReducers;
