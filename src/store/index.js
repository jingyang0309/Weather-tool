import { createStore } from 'redux'
import choosePlace from '../reducer/choosePlace'
// Store 的工作就是在應用程式中負責整合所有的 Reducer

const store = createStore(choosePlace)

export default store

/* 如果有多個 Reducer 的情況，就得使用 combileReducer 先將 Reducer 給組合起來，再將組合後的結果送給 createStore 創建 Store：

import { createStore, combineReducers } from 'redux';
import choosePlace from '../reducer/choosePlace'
import otherReducer from '../reducer/other';

const rootReducer = combineReducers({
  choosePlace,
  otherReducer,
});

const store = createStore(rootReducer); */