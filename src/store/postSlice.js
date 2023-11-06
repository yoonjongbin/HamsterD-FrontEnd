import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { detailBoard } from "../api/boardFile";
// redux-toolkit : createSlice 사용

//게시판 번호별 조회 액션 생성
const viewPostNo = createAsyncThunk("postSlice/viewPostNo", async (postNo) => {
  const result = await detailBoard(postNo);
  return result.data;
});

//게시판 수정 액션 생성
const updatePost = createAsyncThunk(
  "postSlice/updatePost"
  // async (data) => {
  //     const result = await
  // }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewPostNo.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

//생성한 slice 와 액션 생성자 export 해주기
export default postSlice;
export { updatePost, viewPostNo };
