import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

export const addMember = async (member) => {
  return await instance.post("member", member);
};
////