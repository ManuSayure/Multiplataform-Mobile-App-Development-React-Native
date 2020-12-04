import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './reducers/dishes';
import {comments} from './reducers/comments';
import {promotions} from './reducers/promotions';
import {leaders} from './reducers/leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            dishes,
            comments,
            promotions,
            leaders

        }), applyMiddleware(thunk, logger)
    );
    return store;
}