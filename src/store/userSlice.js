import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateMember, deleteMember, login, addMember } from "../api/member";

const registMember = createAsyncThunk(
  "userSlice/registMember",
  async (data) => {
    const result = await addMember(data);
    // console.log(result.data);
    return result.data;
  }
);

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  // console.log(result.data);
  return result.data;
});

const putMember = createAsyncThunk("userSlice/putMember", async (data) => {
  const result = await updateMember(data);
  // console.log(result.data);
  return result.data;
});

const delMember = createAsyncThunk("userSlice/deleteMember", async (data) => {
  //   console.log(data);
  const result = await deleteMember(data);
  // console.log(result.data);
  return result.data;
});

const userSlice = createSlice({
  name: "loginSlice",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registMember.fulfilled, (state, action) => {
      // 회원가입 성공시
      userLogout();
      return {};
    });

    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      // 로그인 성공시 localStorage로 해당 정보 관리
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
      window.location.reload();
      return action.payload;
    });

    // 유저 정상적으로 수정시
    builder.addCase(putMember.fulfilled, (state, action) => {
      // console.log(action);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {};
    });

    // 유저 정상적으로 삭제 시
    builder.addCase(delMember.fulfilled, (state, action) => {
      localStorage.clear();
      userLogout();
      return {};
    });
  },
});

export default userSlice;
export { asyncLogin, putMember, delMember, registMember };
export const { userSave, userLogout } = userSlice.actions;
