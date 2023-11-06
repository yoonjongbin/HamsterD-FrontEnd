import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

export const findId = async (id) => {
  const result = await instance.get(`member/id/${id}`);
  return result.data;
  // return await instance.get("member", member);

  //
};
export const findNickname = async (nickName) => {
  const result = await instance.get(`member/nick/${nickName}`);
  return result.data;
  // return await instance.get("member", member);

  //
};

export const login = async (data) => {
  return await instance.post("member/signin", data);
};

export const addMember = async (member) => {
  return await instance.post("member", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

export const updateMember = async (member) => {
  console.log("들어온 아이디 값 : " + member.get("profile"));

  return await instance.put("member", member);
};

export const deleteMember = async (id) => {
  console.log(id);
  return await instance.delete(`member/${id}`);
};

//memberNo으로 member정보 가져오기
export const showMemberbyMemberNO = async (memberNo) => {
  const result = await instance.get(`member/memberno/${memberNo}`);
  return result.data;
};
