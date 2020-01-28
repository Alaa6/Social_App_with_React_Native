import { MODIFY_CART, FAVORITE_COUNT } from './types';

export const modifyCart = (products) => async (dispatch, store) => {
    dispatch({ type: MODIFY_CART, payload: products });
}

export const favoriteCount = (count) => async (dispatch, store) => {
    dispatch({ type: FAVORITE_COUNT, payload: count });
}