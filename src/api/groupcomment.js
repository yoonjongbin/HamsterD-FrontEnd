import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 그룹 댓글 등록
export const addgComment = async (data) => {
  return await instance.post("studyGroup/gcomment", data);
};

// 특정 그룹 댓글 목록 받아오기
export const getgCommentOfGroup = async (groupNo) => {
  return await instance.get(`studyGroup/${groupNo}/gcomment`);
};

// 스케줄 1개 삭제
export const deletegComment = async (groupCommentNo) => {
  return await instance.delete(`/studyGroup/gcomment/${groupCommentNo}`);
};

// 스케줄 수정
export const updategComment = async (data) => {
  console.log(data);
  return await instance.put("studyGroup/gcomment", data);
};
