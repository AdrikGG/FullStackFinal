import { createStore } from 'redux';

const initState = {
  user: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'login':
      localStorage.setItem('JWT_PAYLOAD', action.token);
      localStorage.setItem('_ID', action._id);

      return {
        ...state,
        user: action.user
      };
    case 'set_user':
    case 'update_user':
      console.log(action.user);
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
