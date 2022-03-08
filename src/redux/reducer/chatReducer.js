const initialState = {
  data: {},
  target: {},
  chat: '',
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT-DATA':
      return {
        ...state,
        chatData: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
