import { detailBoard, deletePost } from "../../api/boardFile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardComment from "../board/BoardComment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BoardUpdate from "../board/BoardUpdate";

const BoardDetailStyle = styled.div`
  .button {
    display: flex;
    justify-content: flex-end;
  }
  .header {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
  }
  .onClickUpdate,
  .onClickDelete {
    border: 0px;
  }

  .BoardView {
    width: 1000px;
  }

  .time,
  .postUser {
    margin: 5px;
  }
`;

const BoardDetail = () => {
  const { postNo } = useParams();
  const [board, setBoard] = useState([]);

  const navigate = useNavigate();

  const getLoding = async (postNo) => {
    console.log("getLoading " + postNo);
    const resp = await detailBoard(postNo);
    console.log("getloading " + resp);
    setBoard(resp);
  };

  useEffect(() => {
    getLoding(postNo);
  }, []);

  //updateVisible이 true로 바뀌면 수정하기 컴포넌트로 이동하기 위한 상태관리
  const [updateVisible, setUpdateVisible] = useState(false);

  //함수 내에서 컴포넌트 호출 불가
  //state 만들고 처리 후 return에서 컴포넌트 호출하기
  const onClickUpdate = () => {
    setUpdateVisible(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("보드멤버 " + board.member.memberNo);
  // console.log("유저정보 " + user.memberNo);
  //삭제하기 버튼 클릭 시 해당 게시물 삭제 후 게시판 전체조회로 이동
  const onClickDelete = async () => {
    if (postNo) {
      await deletePost(postNo);
      navigate("/boardList");
    }

    console.log("delete resp : " + (await deletePost(postNo)));
    console.log("delete postNo : " + postNo);
  };
  return (
    <div>
      <BoardDetailStyle>
        {!updateVisible ? (
          <div className="BoardView">
            <p hidden value={postNo} />
            <h2>{board.postTitle}</h2>
            <div className="header">
              {board.securityCheck === "n" ? (
                <label className="postUser">
                  작성자 : {board?.member?.nickname}
                </label>
              ) : (
                <label className="postUser">작성자 : 익명</label>
              )}
              {!board.updateTime ? (
                <label className="time">작성일자 : {board.createTime}</label>
              ) : (
                <label className="time">수정일자 : {board.updateTime}</label>
              )}
            </div>

            <div className="button">
              {board?.member?.memberNo === user?.memberNo ? (
                <div>
                  <button className="onClickUpdate" onClick={onClickUpdate}>
                    수정하기
                  </button>
                  <button className="onClickDelete" onClick={onClickDelete}>
                    삭제하기
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* } */}
            <hr />
            {/* quill 라이브러리 사용으로 인하여 p태그로 db에 들어갔기때문에 db에서 화면단으로 가져올때 
              dangerouslySetInnerHTML 사용해서 가져와야함 */}
            <div dangerouslySetInnerHTML={{ __html: board.postContent }} />
            <BoardComment postNo={postNo} />
          </div>
        ) : (
          <BoardUpdate
            postNo={postNo}
            initialTitle={board.postTitle}
            initialDesc={board.postContent}
          />
        )}
      </BoardDetailStyle>
    </div>
  );
};
export default BoardDetail;
