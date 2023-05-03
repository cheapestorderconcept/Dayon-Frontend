import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

export const addToCart = async ({ dispatch, product }) => {
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCartAction = async ({ dispatch, product }) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};
