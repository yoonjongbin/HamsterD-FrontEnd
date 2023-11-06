import { configureStore } from "@reduxjs/toolkit";
// import commentSlice from "./commentSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";

// configureStore 함수를 사용하여 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    // 스토어의 각 슬라이스를 해당 리듀서 함수로 연결
    // comment: commentSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});

export default store;
