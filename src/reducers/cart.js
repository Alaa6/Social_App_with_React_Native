import { MODIFY_CART, FAVORITE_COUNT } from '../actions/types';

const INITIAL_STATE = {
    products: [],
    productsCount: 0,
    favCount: 0,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFY_CART:
            return { ...state, products: action.payload, productsCount: action.payload.length };
        case FAVORITE_COUNT:
            return { ...state, favCount: action.payload };
        default:
            return state;
    }
}

export default reducer;