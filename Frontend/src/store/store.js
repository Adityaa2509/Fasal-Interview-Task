
import {configureStore} from '@reduxjs/toolkit'
import UserReducer from '../features/User'

const store = configureStore({
    reducer:{
        User:UserReducer,
    }
})

export default store;