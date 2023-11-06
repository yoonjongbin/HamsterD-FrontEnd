import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});
export const addFile = async (data) => {
  return await instance.post("post", data);
};

//기존 게시물에서 수정하기
export const updateBoard = async (data) => {
  try {
    const res = await instance.put("updatePost", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//기존 게시물 조회수 업데이트하기
export const updateBoardView = async (postNo) => {
  try {
    const res = await instance.put(`post/boardView/${postNo}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//db에 있는 데이터 끌어와서 전체 게시물 리스트 보기
export const searchBoardList = async (page) => {
  console.log(page);
  let url = `posts?page=${page}`;
  try {
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//게시물 번호에 해당하는 개별 게시물 보기
export const detailBoard = async (postNo) => {
  try {
    console.log(postNo);
    const res = await instance.get(`post/detail/${postNo}`);
    console.log("api 값 보내기 res.data" + res.data);
    console.log("api 값 보내기 res" + res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//검색창에 조회한 postContent 내용 전체조회
export const searchPostContent = async (postContent, page) => {
  try {
    console.log("검색창 postContent 조회 api 잘 넘어갔닝? 제발 넘어가줘");
    const res = await instance.get(
      `post/search/postContents/${postContent}/page/${page}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//검색창에 조회한 postContent 내용 전체조회
export const searchPostTitle = async (postTitle, page) => {
  try {
    console.log("검색창 postTitle 조회 api 잘 넘어갔닝? 제발 넘어가줘");
    const res = await instance.get(
      `post/search/postTitles/${postTitle}/page/${page}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//게시물 삭제
export const deletePost = async (postNo) => {
  try {
    const res = await instance.delete(`deletePost/${postNo}`);
    console.log("delete의 res" + res);
    console.log("delete의 postNo" + postNo);
    return res;
  } catch (error) {
    console.log(error);
  }
};
