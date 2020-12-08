import * as ActionTypes from '../ActionTypes';
import {baseUrl}  from '../../assets/shared/baseUrl';
import fetch from 'cross-fetch';

export const postFavorite = (dishId) => (dispatch) =>{
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};
export const addFavorite = (dishId) => ({
    type:ActionTypes.ADD_FAVORITE,
    payload:dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload:dishId
})