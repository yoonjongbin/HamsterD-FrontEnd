import { useState, useEffect } from "react";
import {
  addInComment,
  viewInComment,
  deleteInComment,
  updateInComment,
} from "../../api/board_comment";
import { useParams } from "react-router-dom"; //BoardComment에서 값 받아옴
import styled from "styled-components";

const BoardInCommentStyle = styled.div`
  /* 스타일 내용 입력 */

  .deleteClick,
  .updateClick {
    border: 0px;
  }
  .buttonClick {
    display: flex;
    justify-content: flex-end;
  }

  .clickButton .form-check {
    display: flex;
    justify-content: flex-end;
  }

  .nickname,
  .inCommentContent,
  .updateClick,
  .deleteClick {
    padding: 5px;
  }

  .nickname {
    font-weight: bold;
  }
  .comment {
    padding-left: 30px;
    width: 1000px;
  }

  .content2 {
    /* display: flex; */
    /* justify-content: flex-end; */
  }

  .comments {
    width: 1000px;
  }

  .inComment2 {
    display: flex;
  }

  .form-control {
    width: 900px;
  }

  .inCommentView {
    display: flex;
    padding-top: 10px;
    padding-left: 30px;
  }

  .inCommentBox {
    display: flex;
  }

  .commentContent {
    width: 880px;
  }

  .updateButtonClick {
    border: 0;
    /* padding: 0px; */
    width: 100px;
    height: 0px;
  }
`;

const BoardInComment = ({ commentNo }) => {
  //router에서 param값 받아옴
  const { postNo } = useParams();

  const [text, setText] = useState("");
  const [succ, setSucc] = useState(false);
  const [inComments, setInComments] = useState([]);

  //대댓글 번호 확인하기 위한 상태관리
  const [selectedInCommentIndex, setSelectedInCommentIndex] = useState(0);

  //input란에 값 댓글 추가할 값 넣으면 setText로 값 이동
  const handler = async (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  //해당 메서드 실행되면 대댓글 값 나타남
  const getInCommentHandler = async () => {
    const response = await viewInComment(postNo, commentNo);

    setInComments([...response]);
  };

  //실행되면 바로 대댓글 뿌리기~~
  useEffect(() => {
    getInCommentHandler();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  //대댓글 추가하기 버튼
  const onClick = async () => {
    const data = {
      inCoCon: text,
      postComment: { commentNo: commentNo },
      post: { postNo: postNo },
      member: { memberNo: user.memberNo },
    };
    const result = await addInComment(data);
    console.log(result);
    if (result) setSucc(true);

    await getInCommentHandler();

    setText("");
  };
  //대댓글 추가하면 다시 화면에 띄우게 하려고 useEffect 씀
  useEffect(() => {
    if (succ) {
      setSucc(false);
      getInCommentHandler();
    }
  }, [succ]);

  const updateClick = async (e) => {
    console.log("updateClick 됨 ?");
    const data = {
      inCoNo: e.target.closest(".inComment").id,
      inCoCon: text,
    };
    await updateInComment(data);
    setSelectedInCommentIndex(0);
    getInCommentHandler();
  };
  //대댓글 삭제버튼
  const deleteClick = async (e) => {
    await deleteInComment(e.target.closest(".inComment").id);
    getInCommentHandler();
  };

  //수정하기 버튼을 클릭하면 대댓글 번호가 index로 넘어감
  const openUpdateModal = async (e) => {
    console.log("수정되게 해줘");
    setSelectedInCommentIndex(e.target.closest(".inComment").id);
  };
  console.log(inComments);
  return (
    <BoardInCommentStyle>
      <div>
        {/* 값이 0 초기값일때는 기본 댓글만 보여짐 */}
        {selectedInCommentIndex <= 0 ? (
          <div>
            {console.log(inComments)}
            {inComments?.map((item) => (
              <div
                key={item?.inCoNo}
                id={`${item?.inCoNo}`}
                className="inComment"
              >
                <div className="inCommentView">
                  <label className="nickname">{item?.member?.nickname}</label>
                  <label className="inCommentContent">{item?.inCoCon}</label>
                </div>
                {item?.member?.memberNo == user?.memberNo ? (
                  <div className="content2">
                    <div>
                      <button className="updateClick" onClick={openUpdateModal}>
                        수정하기
                      </button>
                    </div>
                    <div>
                      <button className="deleteClick" onClick={deleteClick}>
                        삭제하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <hr />
              </div>
              //map뿌리는거 끝남
            ))}
            <div className="comment">
              <label style={{ padding: "10px" }}>대댓글 작성</label>
              <div className="inComment2">
                <input
                  type="text"
                  class="form-control"
                  value={text}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  onChange={handler}
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={onClick}
                >
                  작성
                </button>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          //내가 선택한 댓글 넘버와 index 번호 일치 시 댓글 수정 가능
          <div>
            {inComments?.map((item) => (
              <div
                key={item.inCoNo}
                id={`${item.inCoNo}`}
                className="inComment"
              >
                {selectedInCommentIndex == item.inCoNo ? (
                  <div className="inCommentBox">
                    <label className="nickname">{item?.member?.nickname}</label>
                    <div className="commentContent">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={item?.commentContent}
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={handler}
                      />
                    </div>
                    <div className="content2">
                      <button
                        className="updateButtonClick"
                        onClick={updateClick}
                      >
                        수정하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="nicknameInComment">
                      {item?.member?.nickname}
                    </label>
                    <label className="commentContent">{item?.inCoCon}</label>
                    <div className="content2">
                      <div>
                        <button className="updateClick" onClick={updateClick}>
                          수정하기
                        </button>
                      </div>
                      <div>
                        <button className="deleteClick" onClick={deleteClick}>
                          삭제하기
                        </button>
                      </div>
                    </div>
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
    </BoardInCommentStyle>
  );
};

export default BoardInComment;
