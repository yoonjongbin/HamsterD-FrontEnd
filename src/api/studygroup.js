import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 스터디그룹 등록
export const addStudyGroup = async (data) => {
  console.log(data);
  return await instance.post("studygroup", data);
};

// 스//터디그룹 목록 받아오기
export const getStudyGroupList = async () => {
  return await instance.get("studygroup");
};

// 스터디그룹의 방장 목록 받아오기
export const getManagerList = async () => {
  console.log("dddd");
  return await instance.get("member/manager");
};

// 그룹넘버를 기본키로 가지고 있는 스터디그룹
export const viewStudyGroup = async (groupNo) => {
  const result = await instance.get(`studygroup/${groupNo}`);
  return result.data;
};

// 그룹넘버를 기본키로 가지고 있는 스터디그룹에 속한 멤버 리스트
export const viewMemberList = async (groupNo) => {
  const result = await instance.get(`studygroup/${groupNo}/member`);
  return result.data;
};

// 그룹넘버를 기본키로 가지고 있는 스터디그룹 방장 멤버
export const viewManager = async (groupNo) => {
  // console.log("그룹넘버" + groupNo);
  const result = await instance.get(`studygroup/manager/${groupNo}`);
  // console.log(result.data);
  return result.data;
};

// 멤버 id로 조회
export const showMember = async (id) => {
  const result = await instance.get(`member/${id}`);
  return result.data;
};

// 스터디그룹 가입
export const joinGroup = async (data) => {
  // console.log(data.get("memberNo"));
  return await instance.put("studygroup/join", data);
};

// 스터디그룹 탈퇴
export const fireGroup = async (data) => {
  // console.log(data.get("memberNo"));
  return await instance.put("studygroup/fire", data);
};

// 스터디그룹 평가 생성
export const addGroupReview = async (data) => {
  return await instance.post("groupeval", data);
};

// 스터디그룹 평가 리스트 받아오기
export const getGroupReviewList = async (groupNo) => {
  return await instance.get(`groupeval/groupno/${groupNo}`);
};

// 개인 스터디그룹 평가 받아오기
export const showEval = async (id) => {
  return await instance.get(`groupeval/memberno/${id}`);
};

// 스터디그룹 평가 평균값 받아오기
export const getGroupAVG = async (groupNo) => {
  const result = await instance.get(`groupeval/avg/${groupNo}`);
  return result.data;
};
