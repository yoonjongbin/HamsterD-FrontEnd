import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

//댓글 추가하기
export const addComment = async (data) => {
  console.log(data);
  try {
    const res = await instance.post("post/pcomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//대댓글 추가하기
export const addInComment = async (data) => {
  try {
    console.log(console.log("대댓글추가 api 넘어감"));
    const res = await instance.post("post/pcomment/incomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//댓글 조회하기
export const viewComment = async (postNo) => {
  try {
    console.log("댓글조회 api 넘어감");
    const res = await instance.get(`/post/${postNo}/pcomment`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//대댓글 조회하기
export const viewInComment = async (postNo, commentNo) => {
  try {
    console.log("대댓글조회 api 넘어감");
    const res = await instance.get(
      `/post/${postNo}/pcomment/${commentNo}/incomment`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//댓글 수정하기
export const updateComment = async (data) => {
  try {
    console.log("댓글수정 api 넘어감");
    const res = await instance.put("/post/pcomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//대댓글 수정하기
export const updateInComment = async (data) => {
  try {
    console.log("대댓글수정 api 넘어감");
    const res = await instance.put("/post/pcomment/incomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//댓글 삭제
export const deleteComment = async (CommentNo) => {
  try {
    const res = await instance.delete(`post/pcomment/${CommentNo}`);
    console.log("delete의 res" + res);
    console.log("delete의 CommentNo" + CommentNo);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//대댓글 삭제
export const deleteInComment = async (incono) => {
  try {
    console.log("대댓글삭제 api 넘어감");
    const res = await instance.delete(`post/pcomment/incomment/${incono}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
