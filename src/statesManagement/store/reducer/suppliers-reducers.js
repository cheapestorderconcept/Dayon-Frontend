import { ADD_BRAND_FAIL, ADD_BRAND_REQUEST, ADD_BRAND_SUCCESS } from "../constants";

const supplierReducer = (state, action) => {
  switch (action.type) {
    case GET_SUPPLIERS_REQUEST:
      return { ...state, loading: true };
    case GET_SUPPLIERS_SUCCESS:
      return { ...state, loading: false, suppliers: action?.payload?.supplier };
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
    case DELETE_SUPPLIERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Brands Reducers

    case ADD_BRAND__REQUEST:
      return { ...state, loading: true };
    case ADD_BRAND_SUCCESS:
      return { ...state, loading: false };
    case ADD_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default supplierReducer;
