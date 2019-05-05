import { createStore, combineReducers } from 'redux'
import { UserState, userReducer } from './reducers/user';
import { UserAction } from './reducers/user/action';

const store = createStore<{user: UserState}, UserAction, {}, {}>(
    combineReducers({
        user: userReducer
    })
)

export default store