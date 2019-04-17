import { createStore, combineReducers } from 'redux';

const initialMessages = [];

const msgReducer = (state = initialMessages, action) => {
  switch (action.type) {
  case 'UPDATE_MESSAGES':
    return { ...state, messages: action.messages };
  case 'ADD_MESSAGE':
    return { ...state, messages: [...state.messages, action.message] };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  msgReducer: msgReducer,
});

const store = createStore(rootReducer);

export default store;