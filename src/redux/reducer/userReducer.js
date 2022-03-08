const initialState = {
  dataUser: {},
  teacherData: {},
  isLogin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        dataUser: action.payload,
      };
    case 'ADD-TEACHER-DATA':
      return {
        ...state,
        teacherData: [...state.teacherData, action.payload],
      };
    case 'USER-LOGIN':
      return {
        ...state,
        isLogin: true,
        dataUser: action.payload,
      };
    case 'USER-LOGOUT':
      return {
        ...state,
        isLogin: false,
        dataUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
