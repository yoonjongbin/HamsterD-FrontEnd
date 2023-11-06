import React, { useEffect, useState } from "react";
import {
  addgComment,
  getgCommentOfGroup,
  deletegComment,
  updategComment,
} from "../../api/groupcomment";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const CommentStyle = styled.div`
  .inputgComment {
    display: flex;
  }
  .form-control {
    width: 552px;
  }

  .gCommentList div {
    margin-top: 10px;
  }

  .comment {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
  }

  .index {
    width: 50px;
    padding-left: 10px;
  }

  .commentContent {
    width: 350px;
  }

  .nickName {
    width: 100px;
  }

  button {
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: 10%;
    margin-left: 10px;
    background-color: white;
  }

  .commentContentInput {
    width: 320px;
    border: none;
    background-color: beige;
  }
`;

const GroupComment = (props) => {
  // 그룹별 댓글 목록
  const [gComments, setgComments] = useState([]);

  // 현재 들어온 grouppage에 해당하는 그룹넘버를 초기값으로 담음
  const [groupNo, setGroupNo] = useState(props.groupNo);

  // 댓글 입력값
  const [newComment, setNewComment] = useState();

  // 유저 정보(수정, 삭제 활성화 위해)
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  // 댓글 상태 지정(수정 input 박스 넣기 위해)
  const [selectedCommentNo, setSelectedCommentNo] = useState(0);

  // 그룹별 댓글 목록 받아와서 뿌리기
  const gCommentOfGroup = async () => {
    const result = await getgCommentOfGroup(groupNo);
    setgComments(result.data);
  };

  useEffect(() => {
    gCommentOfGroup();
  }, [groupNo]);

  // 댓글 작성
  const creategComment = async (e) => {
    console.log(groupNo);
    if (newComment) {
      const formData = new FormData();
      formData.append("newComment", newComment);
      formData.append("groupNo", groupNo);
      formData.append("token", token);

      console.log(formData);

      try {
        await addgComment(formData);
        gCommentOfGroup();
        e.target.value = null;
      } catch (error) {
        console.error("오류 발생 : ", error);
      }
    } else {
      alert("댓글을 입력해주세요!");
    }
  };

  // 댓글 수정 버튼
  const update = async (e) => {
    if (newComment) {
      const formData = new FormData();
      formData.append("newComment", newComment);
      formData.append("groupNo", groupNo);
      formData.append("gcommentNo", selectedCommentNo);
      formData.append("token", token);
      await updategComment(formData);
      gCommentOfGroup();
      setSelectedCommentNo(0);
    } else {
      alert("댓글을 입력해주세요!");
    }
  };

  const handler = async (e) => {
    setNewComment(e.target.value);
  };

  // 수정하기 버튼 클릭 시 댓글번호 확인
  // 클릭 시 gCommentNo를 selectedCommentNo로 세팅함
  const openUpdate = async (e) => {
    setSelectedCommentNo(e.target.closest(".comment").id);
  };
  console.log("selectedCommentNo : " + selectedCommentNo);

  const closeTab = () => {
    setSelectedCommentNo(0);
  };

  // 댓글 삭제(아래에서 유저 정보 확인하여 일치할때만 활성화 처리)
  const minusgComment = async (gcommentNo) => {
    try {
      await deletegComment(gcommentNo);
      gCommentOfGroup();
      setNewComment("");
    } catch (error) {
      console.error("오류 발생 : " + error);
    }
  };

  return (
    <CommentStyle>
      <div className="inputgComment">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="댓글을 입력하세요"
          onChange={handler}
        />
        <button onClick={creategComment}>등록</button>
      </div>
      {/* selectedCommentNo가 0 이하인 경우 목록만 출력 */}
      {selectedCommentNo <= 0 ? (
        <div className="gCommentList">
          {gComments.map((item, index) => (
            <div
              key={item.gcommentNo}
              id={`${item.gcommentNo}`}
              className="comment"
            >
              <div className="index">{index + 1}</div>
              <div className="commentContent">{item.commentContent}</div>
              <div className="nickName">{item.member.nickname}</div>
              {/* <button onClick={openUpdate}>수정</button>
                <button>삭제</button> */}
              {id == item.member.id ? (
                <button onClick={openUpdate}>수정</button>
              ) : null}
              {id == item.member.id ? (
                <button onClick={() => minusgComment(item.gcommentNo)}>
                  삭제
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        // 선택된 댓글과 해당 댓글 번호 같으면 input 활성화
        <div className="gCommentList">
          {gComments.map((item, index) => (
            <div
              key={item.gcommentNo}
              id={`${item.gcommentNo}`}
              className="comment"
            >
              {/* {console.log("selected " + selectedCommentNo)}
              {console.log("item " + item.gcommentNo)} */}
              {selectedCommentNo == item.gcommentNo ? (
                <div className="comment">
                  <div className="index">{index + 1}</div>
                  <div className="commentContent">
                    <input
                      type="text"
                      className="commentContentInput"
                      placeholder={item.commentContent}
                      onChange={handler}
                    />
                  </div>
                  <div className="nickName">{item.member.nickname}</div>
                  {/* <button onClick={update}>수정</button>
                  <button>삭제</button> */}
                  {id == item.member.id ? (
                    <button onClick={update}>수정</button>
                  ) : null}
                  {id == item.member.id ? (
                    <button onClick={() => minusgComment(item.gcommentNo)}>
                      삭제
                    </button>
                  ) : null}
                  {id == item.member.id ? (
                    <button onClick={closeTab}>취소</button>
                  ) : null}
                </div>
              ) : (
                <div className="comment">
                  <div className="index">{index + 1}</div>
                  <div className="commentContent">{item.commentContent}</div>
                  <div className="nickName">{item.member.nickname}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </CommentStyle>
  );
};

export default GroupComment;
