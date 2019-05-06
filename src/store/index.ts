/**
 * 创建仓库
 */

 import { createStore, combineReducers, applyMiddleware } from 'redux'
import { UserState, userReducer } from './reducers/user';
import promiseMiddleware from 'redux-promise';
import { xSystemReducer, XSystemState } from './reducers/xsystem';

const store = createStore<any, any, {}, {}>(
    combineReducers({
        user: userReducer,
        xSystem: xSystemReducer
    }),
    applyMiddleware(
        promiseMiddleware
    )
)

export default store

export interface Reducers {
    user: UserState;
    xSystem: XSystemState;
}