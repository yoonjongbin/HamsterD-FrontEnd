import styled from "styled-components";
import profile from "../../resource/종빈22.png";

import { useNavigate, useLocation } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import ScheduleMain from "./ScheduleMain";
import { useSelector } from "react-redux";
import {
  fireGroup,
  getGroupAVG,
  joinGroup,
  showEval,
  viewManager,
} from "../../api/studygroup";
import GroupComment from "./GroupComment";

import ReviewPage from "./ReviewPage";
import { showMemberbyMemberNO } from "../../api/member";

const GroupPageTest = styled.div`
  .mainsection {
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: 1600px;
    height: 1300px;
    margin-top: 30px;
    color: rgba(0, 90, 153, 72);
    //
  }
  .btn {
    padding: 20px;
  } //
  #btn1 {
    height: 40px;
    width: 150px;
    background-color: purple;
    border: 0px;
    font-weight: bold;
    color: white;
  }
  #btn2 {
    height: 40px;
    width: 150px;
    background-color: orange;
    border: 0px;
    font-weight: bold;
    color: white;
    margin-left: 20px;
  }
  .section {
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 50px;
    margin-left: 50px;
    width: 1200px;
    height: 1000px;
  }

  .horizonline {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(163, 157, 139);
    line-height: 0.3em;
    margin: 20px 0 10px;
    opacity: 30%;
  }

  #profile {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
  }

  .profile-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* 조절 가능한 마진 값 */
  }

  .profileimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  #grouptext {
    color: rgba(163, 157, 139);
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px; /* 조절 가능한 마진 값 */
  }
  #academyname {
    margin-top: 2px;
    color: rgba(163, 157, 139);
    font-weight: bold;
    font-size: 15px;
    margin-left: 20px; /* 조절 가능한 마진 값 */
  }

  #group {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
  }
  .group-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* 조절 가능한 마진 값 */
  }

  .groupimg {
    margin: 2px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20%;
  }

  #groupintro {
    margin-left: 30px;
    font-size: 15px;
  }
  #groupname {
    font-size: 25px;
    font-weight: bold;
  }
  .profileimg2 {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  #grouppoint {
    margin-left: 40px;
  }
  #info {
    color: rgba(163, 157, 139);
  }
  #info2 {
    font-weight: bold;
    font-size: 20px;
  }
  .photo {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #schedule {
    font-size: 25px;
    font-weight: bold;
  }

  #comments {
    font-size: 25px;
    font-weight: bold;
  }
  #nickname {
    text-align: center;
  }

  .plusreview {
    display: flex;
    justify-content: space-around;
  }

  #firebutton {
    height: 30px;
    width: 100px;
    background-color: gray;
    border: 0px;
    font-weight: bold;
    color: white;
  }
`;

const GroupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => {
    return state.user;
  });
  // const user = JSON.parse(localStorage.getItem("user"));

  const number = Number(location.state.data);
  const members = location.state.members;
  const group = location.state.group;
  const manager = location.state.manager;
  const avg = location.state.avg;

  // setGroupNo = number;
  const [groupNo, setGroupNo] = useState(number);

  const modalRef = useRef(null);

  const handleClick = () => {
    // Bootstrap Modal을 JavaScript로 열기

    console.log(user.studyGroup);
    // console.log(user.studyGroup.groupNo);
    console.log(number);

    if (user.studyGroup != null && user.studyGroup.groupNo == number) {
      alert("해당 스터디그룹에 이미 가입되어있습니다.");
    } else if (user.studyGroup != null) {
      alert("다른 스터디그룹에 이미 가입되어있습니다.");
    } else {
      const myModal = modalRef.current;
      if (myModal) {
        myModal.classList.add("show");
        myModal.style.display = "block";
      }
    }
  };

  const modalClose = () => {
    // 모달창 닫기
    const myModal = modalRef.current;
    if (myModal) {
      myModal.classList.remove("show");
      myModal.style.display = "none";
    }
  };

  const joinStudyGroup = async () => {
    const joincheck = await showMemberbyMemberNO(user.memberNo);

    console.log(joincheck);
    if (joincheck.studyGroup == null) {
      // 가입
      const formData = new FormData();
      formData.append("memberNo", user.memberNo);
      formData.append("groupNo", number);

      joinGroup(formData);

      modalClose();
      alert(group.groupName + "스터디그룹 가입 완료");
      navigate("/studygroup");
    } else {
      modalClose();
      alert("스터디그룹 가입에 실패했습니다.");
    }
  };

  const groupReview = async () => {
    console.log(user.memberNo);
    const check = await showEval(user.memberNo);

    if (user.studyGroup == null || user.studyGroup.groupNo != number) {
      alert("해당 스터디그룹의 멤버만 평가할 수 있습니다.");
    } else if (check.data != "") {
      alert("이미 해당 스터디그룹의 평가를 완료하였습니다.");
    } else {
      navigate("/groupreview", {
        state: {
          data: number,
          members: members,
          group: group,
          manager: manager,
        },
      });
    }
  };

  const fireClick = async () => {
    const joincheck = await showMemberbyMemberNO(user.memberNo);

    console.log(joincheck);
    if (
      joincheck.studyGroup == null &&
      joincheck.studyGroup.groupNo != user.groupNo
    ) {
      alert(group.groupName + " 스터디그룹에 가입되어 있지 않습니다.");
    } else {
      const formData = new FormData();
      formData.append("memberNo", user.memberNo);
      formData.append("groupNo", number);

      fireGroup(formData);
      alert(
        user.nickname +
          " 님, " +
          group.groupName +
          " 스터디그룹을 탈퇴하셨습니다."
      );
      navigate("/studygroup");
    }
  };

  return (
    <GroupPageTest>
      <div className="mainsection">
        <div className="section">
          <div className="plusreview">
            <div className="groupinfo">
              <div className="group-container">
                <div id="group">
                  <img
                    className="groupimg"
                    src={`/upload/${group.groupImage.split("\\").pop()}`}
                    alt="Group"
                  />
                </div>
                <div id="groupintro">
                  <div id="groupname">{group.groupName}</div>

                  <div id="grouppoint">
                    그룹 점수 {avg}점 &nbsp;&nbsp;&nbsp;그룹인원{" "}
                    {members.length}명
                  </div>
                  <div className="btn">
                    <div className="App">
                      <button type="button" id="btn1" onClick={handleClick}>
                        참여하기
                      </button>
                      <button type="button" id="btn2" onClick={groupReview}>
                        평가하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="info">
                <div id="info2">그룹 소개 : {group.groupContent} </div>
                <br />
                <div className="group-container">
                  {members.map((item, index) => (
                    <div key={item.memberNo}>
                      <div className="photo">
                        <img
                          className="profileimg2"
                          src={`/upload/${item.profile.split("\\").pop()}`}
                          alt="Profile"
                        />
                      </div>
                      <div id="nickname">{item.nickname}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button type="button" id="firebutton" onClick={fireClick}>
                  그룹 탈퇴
                </button>
              </div>
            </div>
            <div>
              <ReviewPage className="ReviewPage" groupNo={groupNo} />
            </div>
          </div>

          <br />
          <br />
          <div>
            <div id="schedule">스케쥴</div>
            <div className="horizonline"></div>
            <ScheduleMain className="scheduleMain" groupNo={groupNo} />
          </div>
          <div>
            <div id="comments">Comments</div>
            <div className="horizonline"></div>
            <GroupComment className="GroupComment" groupNo={groupNo} />
          </div>
        </div>
      </div>

      {/* Bootstrap Modal 요소 */}
      <div
        ref={modalRef}
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> 스터디그룹 참여하기</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={modalClose}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text">
                스터디그룹 : {group.groupName}
                <br />
                그룹에 참여하시겠습니까?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={joinStudyGroup}
              >
                참여하기
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={modalClose}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </GroupPageTest>
  );
};

export default GroupPage;
