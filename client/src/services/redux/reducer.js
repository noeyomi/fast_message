import { createStore, combineReducers } from 'redux';

const initialLists = {
  messages: [],
  users: [],
  writings: [],
};

const msgReducer = (state = initialLists, action) => {
  switch (action.type) {
  case 'UPDATE_MESSAGES':
    return { ...state, messages: action.messages };
  case 'ADD_MESSAGE':
    return { ...state, messages: [...state.messages, action.message] };
  case 'UPDATE_USERS':
    return { ...state, users: action.users };
  case 'ADD_USER':
    return { ...state, users: [...state.users, action.user] };
  case 'RM_USER':
    state.users.splice(state.users.indexOf(action.name), 1);
    return { ...state, users: [...state.users, action.user] };
  case 'RM_WRITING':
    state.writings.splice(state.writings.indexOf(action.name), 1);
    return { ...state, writings: [...state.writings] };
  case 'ADD_WRITING':
    return { ...state, writings: [...state.writings, action.name] };
  default:
    return state;
  }
};

const initialUser = [];

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'UPDATE_NAME':
    return { ...state, name: action.name };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  msgReducer: msgReducer,
  userReducer: userReducer,
});

const store = createStore(rootReducer);

export default store;