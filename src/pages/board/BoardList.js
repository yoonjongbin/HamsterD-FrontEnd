import {
  searchBoardList,
  searchPostContent,
  searchPostTitle,
} from "../../api/boardFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateBoardView } from "../../api/boardFile";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const BoardStyle = styled.div`
  .boardListHead1 {
    display: flex;
    flex-direction: column;
    width: 1000px;

    font-size: 20px;
  }

  .boardListHead2 {
    display: flex;
    justify-content: end;
  }

  .btn-outline-dark {
    width: 160px;
    height: 40px;
    margin-bottom: 20px;
  }

  #boardView :hover {
    cursor: pointer;
  }

  .searchBar {
    display: flex;
    justify-content: center;
  }

  .searchIcon {
    width: 20px;
    height: 20px;
    margin: 10px;
  }
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  //페이지 번호 상태관리
  const [page, setPage] = useState(1);

  // post 전체 데이터 개수 -> pagination에 보내줘야하는 값
  const [totalDataCount, setTotalDataCount] = useState(0);

  //페이지 바뀔때마다 상태관리하기
  const [pageShow, setPageShow] = useState(false);

  //검색창 value값
  const [searchPost, setSearchPost] = useState("");

  //검색창 option 값 상태관리
  const [searchOption, setSearchOption] = useState("searchPostTitle");

  //검색창이 작성되면 onChange
  const onChangePost = (e) => {
    setSearchPost(e.target.value);
    console.log(setSearchPost);
  };

  //option 값 변경될때마다 바꿔주는 onChange
  const onChangeOption = (e) => {
    console.log("값이 뭐야 ?" + e.target.value);
    setSearchOption(e.target.value);
  };

  //검색창 클릭
  const searchPostClick = async () => {
    if (searchOption == "searchPostContent") {
      const result = await searchPostContent(searchPost, page);
      setBoardList(result.contents);
      console.log(result.contents);
      const jsonString = JSON.stringify(result.total);
      setTotalDataCount(parseInt(jsonString, 10));
    } else if (searchOption == "searchPostTitle") {
      const result = await searchPostTitle(searchPost, page);
      setBoardList(result.title);
      const jsonString = JSON.stringify(result.total);
      setTotalDataCount(parseInt(jsonString, 10));
    }
    //페이지 1로 초기화 해주고 검색창 input값 null값으로 처리해주기
    setPage(1);
    setSearchPost("");
  };

  //페이지 바뀔때 페이지 번호 바꿔주고 true로 변환
  const handlePageChange = (page) => {
    console.log("페이지바뀜");
    setPage(page);
    setPageShow(true);
  };

  //처음 화면 boardList
  useEffect(() => {
    const fetchData = async () => {
      const res = await searchBoardList(page);
      //boardList에 total이랑 contents 따로 있어서 contents만 받아와야함
      setBoardList(res.contents);
      //Pagination에 Post전체 값 보내줘야함
      //Pagination totalDataCount는 int형으로 넣어줘야함
      //db에서 값 받아올때 String으로 받아와졌으므로 int로 형변환 하기
      const jsonString = JSON.stringify(res.total);
      setTotalDataCount(parseInt(jsonString, 10));
      // console.log("페이지 나와라" + res);
      // console.log(JSON.stringify(res));
      // console.log("개수 나와 제발" + JSON.stringify(res.total));
    };
    fetchData();
  }, []);

  //페이지 변경될때 boardList 뿌리기
  useEffect(() => {
    const fetchData = async () => {
      if (pageShow == true) {
        const res = await searchBoardList(page);
        setBoardList(res.contents);
      }
    };
    fetchData();
    setPageShow(false);
  }, [handlePageChange]);

  //게시판 작성하기
  const onClick = () => {
    navigate("/board");
  };

  //조회수 1씩 업데이트하기
  const onClickView = async (postNo) => {
    await updateBoardView(postNo);
    navigate(`/post/${postNo}`);
  };

  return (
    <BoardStyle>
      <div>
        <div className="boardListHead1">
          <div className="boardListHead2">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={onClick}
            >
              게시물 작성
            </button>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {boardList?.map((item, index) => (
                <tr
                  id="boardView"
                  key={item?.postNo}
                  onClick={() => onClickView(item?.postNo)}
                >
                  {console.log(item)}
                  <td>{index + 1}</td>
                  <td>{item?.postTitle}</td>
                  <td>
                    {item?.securityCheck === "y"
                      ? "익명"
                      : item?.member?.nickname}
                  </td>
                  <td>{item?.createTime}</td>
                  <td>{item?.boardView}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationBox>
            <Pagination
              // 현재 보고있는 페이지
              activePage={page}
              // 한페이지에 출력할 아이템수
              itemsCountPerPage={5}
              // 총 아이템수
              totalItemsCount={totalDataCount}
              // 표시할 페이지수
              pageRangeDisplayed={3}
              // 함수
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
        <div className="searchBar">
          <select value={searchOption} onChange={onChangeOption}>
            <option value="searchPostTitle">제목</option>
            <option value="searchPostContent">내용</option>
          </select>
          <input type="text" value={searchPost} onChange={onChangePost}></input>
          <FontAwesomeIcon
            className="searchIcon"
            icon={faMagnifyingGlass}
            onClick={searchPostClick}
          />
        </div>
      </div>
    </BoardStyle>
  );
};
export default BoardList;
