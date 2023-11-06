import {
  addComment,
  viewComment,
  updateComment,
  deleteComment,
} from "../../api/board_comment";
import { useState, useEffect } from "react";
import BoardInComment from "../board/BoardInComment";
import styled from "styled-components";

const BoardCommentStyle = styled.div`
  /* 스타일 내용 입력 */
  .inCommentClick,
  .deleteClick,
  .openUpdateModal {
    border: 0px;
  }

  .btnn {
    display: flex;
    justify-content: flex-end;
  }

  .form-check {
    display: flex;
    justify-content: flex-end;
  }

  .nickname,
  .commentContent {
    padding: 5px;
  }

  .nickname {
    font-weight: bold;
  }

  .comment {
    width: 1000px;
  }

  .content2 {
    display: flex;
    justify-content: flex-end;
  }

  .comments {
    width: 1000px;
  }

  .updateComment {
    display: flex;
  }
`;

const BoardComment = ({ postNo }) => {
  //댓글 저장해서 db로 넘기는 곳
  const [comments, setComments] = useState([]);

  //댓글 값 넣는 곳
  const [text, setText] = useState("");

  //댓글 수정 값 넣는곳
  const [updateText, setUpdateText] = useState("");

  //댓글 번호 확인하기 위한 상태관리
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);

  //댓글 번호 확인하기 위한(대댓글처리) 상태관리
  const [selectedInCommentIndex, setSelectedInCommentIndex] = useState(0);

  //대댓글 컴포넌트로 이동하는 상태관리
  const [inCommentShow, setInCommentShow] = useState(false);

  //user를 직접 사용하기 전에 JSON 문자열을 파싱하여 객체로 변환
  const user = JSON.parse(localStorage.getItem("user"));

  //처음 페이지 들어왔을때 댓글 보기
  const getCommentHandler = async () => {
    const response = await viewComment(postNo);
    setComments(response);
  };

  //댓글 추가하기 버튼
  const onClick = async () => {
    if (!text) {
      alert("댓글을 작성해주세요!");
    } else {
      const data = {
        commentContent: text,
        post: { postNo: postNo },
        member: { memberNo: user.memberNo, nickname: user.nickname },
      };
      const result = await addComment(data);
      console.log(result);
      //추가 시 닉네임 새로고침해야지 받아와짐 변경 필요
      setComments([result, ...comments]);
      setText("");
    }
  };

  //댓글 수정하기 버튼
  const updateClick = async (e) => {
    setSelectedCommentIndex(e.target.closest(".comment").id);

    const data = {
      commentNo: e.target.closest(".comment").id,
      commentContent: updateText,
      post: { postNo: postNo },
    };
    await updateComment(data);
    setSelectedCommentIndex(0);
    getCommentHandler();
    console.log(updateText);
  };

  //댓글 삭제버튼
  const deleteClick = async (e) => {
    await deleteComment(e.target.closest(".comment").id);
    getCommentHandler();
    //페이지 새로고침
    // window.location.reload();
  };

  //수정하기 눌렀을때 댓글 번호 담아주기
  //댓글 번호가 selectedCommentIndex와 같으면 수정할수있음
  const openUpdateModal = async (e) => {
    setSelectedCommentIndex(e.target.closest(".comment").id);
  };
  console.log("selectedCommentIndex" + selectedCommentIndex);

  //input란에 값 댓글 추가할 값 넣으면 setText로 값 이동
  const handler = async (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  //수정할때 input란 값 추가하기
  const updateHandler = async (e) => {
    setUpdateText(e.target.value);
  };
  //댓글번호 클릭하면 대댓글컴포넌트 보여짐
  const inCommentClick = (e) => {
    setInCommentShow(true);
    setSelectedInCommentIndex(e.target.closest(".comment").id);
    console.log(e.target.closest(".comment").id);
  };

  //실행되자마자 댓글 뿌리기
  useEffect(() => {
    getCommentHandler();
  }, [postNo]);

  return (
    <BoardCommentStyle>
      {/* <label>댓글</label> */}

      <div class="input-group mb-3">
        <label></label>
        <input
          type="text"
          class="form-control"
          placeholder="댓글을 작성해보세요"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={text}
          onChange={handler}
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={onClick}
        >
          작성하기
        </button>
      </div>
      <div>
        {/* 값이 0 초기값일때는 기본 댓글만 보여짐 */}
        {selectedCommentIndex <= 0 ? (
          <div>
            {comments?.map((item) => (
              <div
                key={item.commentNo}
                id={`${item.commentNo}`}
                className="comment"
              >
                {console.log("댓글 뿌리기 " + item)}

                <label className="nickname">{item?.member?.nickname}</label>
                <label className="commentContent">{item?.commentContent}</label>
                <div className="content2">
                  {item?.member?.memberNo == user?.memberNo ? (
                    <div>
                      <label>
                        <button
                          className="openUpdateModal"
                          onClick={openUpdateModal}
                        >
                          수정
                        </button>
                      </label>
                      <label>
                        <button className="deleteClick" onClick={deleteClick}>
                          삭제
                        </button>
                      </label>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <label>
                    <button className="inCommentClick" onClick={inCommentClick}>
                      답글 쓰기
                    </button>
                  </label>
                </div>
                <hr />
                {selectedInCommentIndex == item.commentNo &&
                  inCommentShow == true && (
                    <BoardInComment commentNo={selectedInCommentIndex} />
                  )}
              </div>

              //map뿌리는거 끝남
            ))}
          </div>
        ) : (
          <div>
            {comments?.map((item) => (
              <div key={item.commentNo} id={item.commentNo} className="comment">
                {selectedCommentIndex == item.commentNo ? (
                  <div className="comments">
                    <label className="nickname">{item?.member?.nickname}</label>
                    <div className="updateComment">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={item?.commentContent}
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={updateHandler}
                        style={{ width: "900px" }}
                      />
                      <label>
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          onClick={updateClick}
                        >
                          수정하기
                        </button>
                      </label>
                    </div>
                    <hr />
                  </div>
                ) : (
                  <div>
                    <label className="nickname">{item?.member?.nickname}</label>
                    <label className="commentContent">
                      {item?.commentContent}
                    </label>
                    <div className="content2">
                      <div className="content2">
                        <label>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={updateClick}
                          >
                            수정하기
                          </button>
                        </label>
                        <label>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={deleteClick}
                          >
                            삭제하기
                          </button>
                        </label>
                      </div>
                    </div>
                    <hr />
                  </div>
                  //수정 commentNo 일치여부 확인
                )}
              </div>
              //map 뿌리는거 여기서 끝남
            ))}
          </div>
          //맨처음
        )}
      </div>
    </BoardCommentStyle>
  );
};

export default BoardComment;
