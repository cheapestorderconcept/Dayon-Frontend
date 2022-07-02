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
  GET_PRODUCT_BY_BARCODE_REQUEST,
  GET_PRODUCT_BY_BARCODE_SUCCESS,
  GET_PRODUCT_BY_BARCODE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_FAIL,
  ADD_STORE_SUCCESS,
  GET_PAYMENT_TYPE_REQUEST,
  GET_PAYMENT_TYPE_SUCCESS,
  GET_PAYMENT_TYPE_FAIL,
  ADD_PAYMENT_TYPE_FAIL,
  ADD_PAYMENT_TYPE_SUCCESS,
  ADD_PAYMENT_TYPE_REQUEST,
  GET_EXPENSES_CARTEGORY_REQUEST,
  GET_EXPENSES_CARTEGORY_SUCCESS,
  GET_EXPENSES_CARTEGORY_FAIL,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAIL,
  ADD_EXPENSES_CATEGORY_REQUEST,
  ADD_EXPENSES_CATEGORY_SUCCESS,
  ADD_EXPENSES_CATEGORY_FAIL,
  ADD_EXPENSES_REQUEST,
  ADD_EXPENSES_SUCCESS,
  ADD_EXPENSES_FAIL,
  DELETE_EXPENSES_REQUEST,
  DELETE_EXPENSES_SUCCESS,
  DELETE_EXPENSES_FAIL,
  UPDATE_EXPENSES_REQUEST,
  UPDATE_EXPENSES_SUCCESS,
  UPDATE_EXPENSES_FAIL,
  ADD_DEPOSIT_REQUEST,
  ADD_DEPOSIT_SUCCESS,
  ADD_DEPOSIT_FAIL,
  UPDATE_DEPOSIT_REQUEST,
  UPDATE_DEPOSIT_SUCCESS,
  UPDATE_DEPOSIT_FAIL,
  GET_TOTAL_DEPOSIT_REQUEST,
  GET_TOTAL_DEPOSIT_SUCCESS,
  GET_TOTAL_DEPOSIT_FAIL,
  GET_SALES_REPORT_REQUEST,
  GET_SALES_REPORT_SUCCESS,
  GET_DEPOSIT_REPORT_REQUEST,
  GET_DEPOSIT_REPORT_SUCCESS,
  GET_DEPOSIT_REPORT_FAIL,
  GET_SALES_REPORT_FAIL,
  GET_OUT_OF_STOCK_REQUEST,
  GET_OUT_OF_STOCK_SUCCESS,
  GET_OUT_OF_STOCK_FAIL,
  GET_PRODUCT_PRICE_REQUEST,
  GET_PRODUCT_PRICE_SUCCESS,
  GET_PRODUCT_PRICE_FAIL,
  GET_STOCK_LEVEL_REPORT_REQUEST,
  GET_STOCK_LEVEL_REPORT_SUCCESS,
  GET_STOCK_LEVEL_REPORT_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  GET_PROFIT_OR_LOSS_LEVEL_REPORT_REQUEST,
  GET_PROFIT_OR_LOSS_LEVEL_REPORT_SUCCESS,
  GET_PROFIT_OR_LOSS_LEVEL_REPORT_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  DELETE_STORE_FAIL,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_REQUEST,
  DELETE_SALES_REQUEST,
  DELETE_SALES_SUCCESS,
  DELETE_SALES_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  SUSPEND_STAFF_REQUEST,
  SUSPEND_STAFF_SUCCESS,
  SUSPEND_STAFF_FAIL,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_FAIL,
  DELETE_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_FAIL,
  UPDATE_SALES_REQUEST,
  UPDATE_SALES_SUCCESS,
  UPDATE_SALES_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAIL,
  REGISTER_CUSTOMERS_REQUEST,
  REGISTER_CUSTOMERS_SUCCESS,
  REGISTER_CUSTOMERS_FAIL,
  GET_CUSTOMERS_DEPOSITS_REQUEST,
  GET_CUSTOMERS_DEPOSITS_SUCCESS,
  GET_CUSTOMERS_DEPOSITS_FAIL,
  GET_CUSTOMERS_PURCHASED_REQUEST,
  GET_CUSTOMERS_PURCHASED_SUCCESS,
  GET_CUSTOMERS_PURCHASED_FAIL,
  GET_CUSTOMERS_TRANSACTIONS_REQUEST,
  GET_CUSTOMERS_TRANSACTIONS_SUCCESS,
  GET_CUSTOMERS_TRANSACTIONS_FAIL,
  UPDATE_CUSTOMERS_REQUEST,
  UPDATE_CUSTOMERS_SUCCESS,
  UPDATE_CUSTOMERS_FAIL,
  DELETE_PAYMENT_TYPE_REQUEST,
  DELETE_PAYMENT_TYPE_SUCCESS,
  DELETE_PAYMENT_TYPE_FAIL,
  GET_RECEIPT_REPRINT_FAIL,
  GET_RECEIPT_REPRINT_SUCCESS,
  GET_RECEIPT_REPRINT_REQUEST,
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
    case GET_PRODUCT_BY_BARCODE_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_BY_BARCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        productByBarcode: [...state.productByBarcode, action.payload],
      };
    case GET_PRODUCT_BY_BARCODE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productById: [...state.productById, action.payload],
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_SUCCESS: {
      if (Cookies.get("products")) {
        Cookies.remove("products");
        Cookies.set("products", JSON.stringify(action.payload));
      } else {
        Cookies.set("products", JSON.stringify(action.payload));
      }

      return { ...state, loading: false, products: action?.payload };
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

    case DELETE_STAFF_REQUEST:
      return { ...state, loading: true };
    case DELETE_STAFF_SUCCESS:
      return { ...state, loading: false };
    case DELETE_STAFF_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SUSPEND_STAFF_REQUEST:
      return { ...state, loading: true };
    case SUSPEND_STAFF_SUCCESS:
      return { ...state, loading: false };
    case SUSPEND_STAFF_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_STAFF_REQUEST:
      return { ...state, loading: true };
    case UPDATE_STAFF_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_STAFF_FAIL:
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
    case UPDATE_PURCHASE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PURCHASE_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PURCHASE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PURCHASE_REQUEST:
      return { ...state, loading: true };
    case DELETE_PURCHASE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PURCHASE_FAIL:
      return { ...state, loading: false, error: action.payload };

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

    case ADD_STORE_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_STORE_SUCCESS:
      return { ...state, loading: false, notification: true, success: action.payload };
    case ADD_STORE_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    case UPDATE_STORE_REQUEST:
      return { ...state, loading: true, notification: false };
    case UPDATE_STORE_SUCCESS:
      return { ...state, loading: false, notification: true, success: action.payload };
    case UPDATE_STORE_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    case DELETE_STORE_REQUEST:
      return { ...state, loading: true, notification: false };
    case DELETE_STORE_SUCCESS:
      return { ...state, loading: false, notification: true, success: action.payload };
    case DELETE_STORE_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    // Get Sales Reducer

    case ADD_SALES_DATA_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_SALES_DATASUCCESS: {
      return { ...state, loading: false, notification: true, success: action.payload };
    }
    case ADD_SALES_DATA_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    // case ADD_SALES_SUCCESS: {
    //   const newSales = action.payload;
    //   const existingProduct = state.cart.cartItems.find(
    //     (sale) => sale.product_barcode === newSales.product_barcode
    //   );
    //   const cartItems = existingProduct
    //     ? state.cart.cartItems.map((sale) =>
    //         sale.product_barcode === existingProduct.product_barcode
    //           ? {
    //               ...newSales,
    //               purchased_qty: Number(sale.purchased_qty) + Number(newSales.purchased_qty),
    //               total_amount: Number(sale.unit_price) * Number(newSales.purchased_qty),
    //             }
    //           : sale
    //       )
    //     : [...state.cart.cartItems, newSales];
    //   Cookies.set("cartItems", JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }

    // case ADD_SALES_FAIL:
    //   return { ...state, loading: false, error: action.payload };

    case GET_TOTAL_SALES_REQUEST:
      return { ...state, loading: true };
    case GET_TOTAL_SALES_SUCCESS:
      {
        if (Cookies.get("sales")) {
          Cookies.remove("sales");
          Cookies.set("sales", JSON.stringify(action.payload));
        } else {
          Cookies.set("sales", JSON.stringify(action.payload));
        }
      }
      return { ...state, loading: false, totalSales: action?.payload };
    case GET_TOTAL_SALES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_SALES_REQUEST:
      return { ...state, loading: true };
    case DELETE_SALES_SUCCESS:
      return { ...state, loading: false };
    case DELETE_SALES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_SALES_REQUEST:
      return { ...state, loading: true, notification: false };
    case UPDATE_SALES_SUCCESS:
      return { ...state, loading: false, notification: true, success: action.payload };
    case UPDATE_SALES_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    // Paymnet MMethod Redcuer

    case GET_PAYMENT_TYPE_REQUEST:
      return { ...state, loading: true };
    case GET_PAYMENT_TYPE_SUCCESS: {
      if (Cookies.get("paymentType")) {
        Cookies.remove("paymentType");
        Cookies.set("paymentType", JSON.stringify(action.payload));
      } else {
        Cookies.set("paymentType", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, paymentType: action?.payload };
    }
    case GET_PAYMENT_TYPE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_PAYMENT_TYPE_REQUEST:
      return { ...state, loading: true };
    case ADD_PAYMENT_TYPE_SUCCESS:
      return { ...state, loading: false };
    case ADD_PAYMENT_TYPE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PAYMENT_TYPE_REQUEST:
      return { ...state, loading: true };
    case DELETE_PAYMENT_TYPE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PAYMENT_TYPE_FAIL:
      return { ...state, loading: false, error: action.payload };
    // Expenses Reducers

    case GET_EXPENSES_CARTEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_EXPENSES_CARTEGORY_SUCCESS: {
      if (Cookies.get("expensesCategories")) {
        Cookies.remove("expensesCategories");
        Cookies.set("expensesCategories", JSON.stringify(action.payload));
      } else {
        Cookies.set("expensesCategories", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, expensesCategories: action?.payload };
    }
    case GET_EXPENSES_CARTEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case GET_EXPENSES_SUCCESS: {
      if (Cookies.get("expenses")) {
        Cookies.remove("expenses");
        Cookies.set("expenses", JSON.stringify(action.payload));
      } else {
        Cookies.set("expenses", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, expenses: action?.payload };
    }
    case GET_EXPENSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_EXPENSES_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_EXPENSES_CATEGORY_SUCCESS:
      return { ...state, loading: false };
    case ADD_EXPENSES_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case ADD_EXPENSES_SUCCESS:
      return { ...state, loading: false };
    case ADD_EXPENSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case DELETE_EXPENSES_SUCCESS:
      return { ...state, loading: false };
    case DELETE_EXPENSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case UPDATE_EXPENSES_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_EXPENSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    // deposits reducers

    case ADD_DEPOSIT_REQUEST:
      return { ...state, loading: true, notification: false };
    case ADD_DEPOSIT_SUCCESS: {
      return { ...state, loading: false, notification: true, success: action.payload };
    }
    case ADD_DEPOSIT_FAIL:
      return { ...state, loading: false, notification: true, success: null, error: action.payload };

    case GET_TOTAL_DEPOSIT_REQUEST:
      return { ...state, loading: true };
    case GET_TOTAL_DEPOSIT_SUCCESS: {
      if (Cookies.get("deposits")) {
        Cookies.remove("deposits");
        Cookies.set("deposits", JSON.stringify(action.payload));
      } else {
        Cookies.set("deposits", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, deposits: action?.payload };
    }
    case GET_TOTAL_DEPOSIT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_DEPOSIT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_DEPOSIT_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_DEPOSIT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Sales reporting
    case GET_SALES_REPORT_REQUEST:
      return { ...state, loading: true };
    case GET_SALES_REPORT_SUCCESS:
      return { ...state, loading: false, receipts: action?.payload };
    case GET_SALES_REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Reprint Receipt reporting
    case GET_RECEIPT_REPRINT_REQUEST:
      return { ...state, loading: true };
    case GET_RECEIPT_REPRINT_SUCCESS:
      return { ...state, loading: false, salesReport: action?.payload };
    case GET_RECEIPT_REPRINT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // deposits reports

    case GET_DEPOSIT_REPORT_REQUEST:
      return { ...state, loading: true };
    case GET_DEPOSIT_REPORT_SUCCESS:
      return { ...state, loading: false, depositReport: action?.payload };
    case GET_DEPOSIT_REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Out Of Stokcs
    case GET_OUT_OF_STOCK_REQUEST:
      return { ...state, loading: true };
    case GET_OUT_OF_STOCK_SUCCESS:
      return { ...state, loading: false, outOfStocksReport: action?.payload };
    case GET_OUT_OF_STOCK_FAIL:
      return { ...state, loading: false, error: action.payload };

    // product price

    case GET_PRODUCT_PRICE_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_PRICE_SUCCESS:
      return { ...state, loading: false, productPrice: action?.payload };
    case GET_PRODUCT_PRICE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // STOCK LEVEL REPORT

    case GET_STOCK_LEVEL_REPORT_REQUEST:
      return { ...state, loading: true };
    case GET_STOCK_LEVEL_REPORT_SUCCESS:
      return { ...state, loading: false, stockLevel: action?.payload };
    case GET_STOCK_LEVEL_REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };

    //PROFIT OR LOSS REPORT
    case GET_PROFIT_OR_LOSS_LEVEL_REPORT_REQUEST:
      return { ...state, loading: true };
    case GET_PROFIT_OR_LOSS_LEVEL_REPORT_SUCCESS:
      return { ...state, loading: false, profitOrLossReport: action?.payload };
    case GET_PROFIT_OR_LOSS_LEVEL_REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };

    //CUSTOMERS REDUCERS
    case GET_ALL_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CUSTOMERS_SUCCESS:
      if (Cookies.get("customers")) {
        Cookies.remove("customers");
        Cookies.set("customers", JSON.stringify(action.payload));
      } else {
        Cookies.set("customers", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, customers: action?.payload };
    case GET_ALL_CUSTOMERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case REGISTER_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case REGISTER_CUSTOMERS_SUCCESS:
      return { ...state, loading: false };
    case REGISTER_CUSTOMERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_CUSTOMERS_DEPOSITS_REQUEST:
      return { ...state, loading: true };
    case GET_CUSTOMERS_DEPOSITS_SUCCESS:
      return { ...state, loading: false, customerDeposit: action?.payload };
    case GET_CUSTOMERS_DEPOSITS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_CUSTOMERS_PURCHASED_REQUEST:
      return { ...state, loading: true };
    case GET_CUSTOMERS_PURCHASED_SUCCESS:
      return { ...state, loading: false, customerPurchased: action?.payload };
    case GET_CUSTOMERS_PURCHASED_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_CUSTOMERS_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case GET_CUSTOMERS_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, customerTransactions: action?.payload };
    case GET_CUSTOMERS_TRANSACTIONS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CUSTOMERS_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_CUSTOMERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
};
export default rootReducers;
