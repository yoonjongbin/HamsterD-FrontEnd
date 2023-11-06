import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faMinus,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import React, { useState } from "react";
import {
  addSchedule,
  deleteSchedule,
  updateSchedule,
} from "../../api/schedule";
import { viewMemberList, viewStudyGroup } from "../../api/studygroup";
import { useNavigate, useLocation } from "react-router-dom";

// css
const ScheduleStyle = styled.div`
  .scheduleBody {
    /* border: 1px solid lightgray; */
    width: 1000px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }//
  .scheduleContent {
    width: 600px;
    height: 600px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .registerSchedule {
    /* border: 1px solid lightcoral; */
    width: 500px;
    height: 500px;
  }
  .add {
    width: 100%;
    height: 50px;
    /* border: 1px solid lightcoral; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #date {
    width: 150px;
    height: 20px;
    margin-top: 13px;
    margin-right: 15px;
    /* border: 1px solid lightsalmon; */
  }

  #date:hover {
    cursor: pointer;
  }

  .fa-plus {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }

  .fa-plus:hover {
    cursor: pointer;
  }

  .fa-minus {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }

  .fa-minus:hover {
    cursor: pointer;
  }

  .fa-xmark {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }
  .fa-xmark:hover {
    cursor: pointer;
  }

  .fa-arrow-up {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }

  .fa-arrow-up:hover {
    cursor: pointer;
  }

  #exampleFormControlTextarea1 {
    height: 200px;
  }

  .fc .fc-toolbar-title {
    color: black;
  }

  /* // type이 date인 input의 placeholder를 커스텀하기 위한 선택자
  // 기본적으로 type date인 input은 placeholder가 먹히지 않기 때문이다!
  input[type="date"]::before {
    content: attr(
      placeholder
    ); // input 태그의 placeholder라는 속성값을 가져와서 content로 사용한다. 보통은 placeholder보다는 data-placeholder라는 커스텀 속성을 만들어서 사용하시는 것 같다.
    width: 100%;
    height: 100%;
  }

  // input에 어떠한 유효값이 입력된 상태인지 확인하는 선택자
  // 날짜를 선택하면 유효값이 입력된다.
  // 이 속성을 활용하고자 한다면 반드시 태그에 required 속성을 달아줘야한다.
  input[type="date"]:valid::before {
    display: none; // 유효값이 입력된 경우 before에 있는 것을 사라지게 한다. 즉, placeholder를 사라지게 한다.
  } */
`;

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 유저의 id 받아옴(작성자 정보 비교 위해서)
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const [schedule, setSchedule] = useState(location.state.schedule);
  const groupNo = location.state.groupNo;
  const scheduleNo = location.state.scheduleNo;

  const [title, setTitle] = useState(schedule.scheduleTitle);
  const [content, setContent] = useState(schedule.scheduleContent);
  const [date, setDate] = useState(schedule.scheduleDate);

  // console.log("groupNo" + groupNo);
  // console.log("scheduleNo : " + scheduleNo);
  // 스터디그룹, 스케줄넘버(임의 지정 - scheduleMain에서 eventClick 이벤트 실행 시 groupNo, scheduleNo 넘겨받아야 함)

  // 수정 버튼
  const updateEvent = async () => {
    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("scheduleNo", location.state.scheduleNo);
    formData.append("token", token);

    await updateSchedule(formData); // 비동기 작업 완료 대기
    navigate("/grouppage", {
      state: {
        data: groupNo,
        members: result1,
        group: result2,
      },
    });
  };

  // 삭제버튼 클릭 시
  const deleteEvent = async () => {
    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);

    if (scheduleNo) {
      try {
        await deleteSchedule(scheduleNo); // 비동기 작업 완료 대기
        navigate("/grouppage", {
          state: {
            data: groupNo,
            members: result1,
            group: result2,
          },
        });
      } catch (error) {
        console.error("오류 발생 : " + error);
      }
    }
  };

  // 닫기 버튼 클릭 시 grouppage 메인으로 돌아감
  const close = async () => {
    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);

    navigate("/grouppage", {
      state: {
        data: groupNo,
        members: result1,
        group: result2,
      },
    });
  };

  return (
    <>
      {id === schedule.member.id ? (
        <form className="registerSchedule" method="POST">
          <div className="add">
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                placeholder={schedule.scheduleDate}
                onChange={(e) => setDate(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <FontAwesomeIcon icon={faArrowUp} onClick={updateEvent} />
            <FontAwesomeIcon icon={faMinus} onClick={deleteEvent} />
            <FontAwesomeIcon icon={faXmark} onClick={close} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              제목
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={title}
              placeholder={schedule.scheduleTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={content}
              placeholder={schedule.scheduleContent}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </form>
      ) : (
        <form className="registerSchedule" method="POST">
          <div className="add">
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                placeholder={schedule.scheduleDate}
                onChange={(e) => setDate(e.target.value)}
                required
                aria-required="true"
                readOnly
              />
            </div>
            <FontAwesomeIcon icon={faXmark} onClick={close} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              제목
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={title}
              placeholder={schedule.scheduleTitle}
              onChange={(e) => setTitle(e.target.value)}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={content}
              placeholder={schedule.scheduleContent}
              onChange={(e) => setContent(e.target.value)}
              readOnly
            ></textarea>
          </div>
        </form>
      )}
    </>
  );
};

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const groupNo = location.state.groupNo;

  const token = localStorage.getItem("token");

  // 추가 버튼
  const plus = async () => {
    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    // 멤버 정보 담기 위해 token 같이 담아서 전송
    formData.append("token", token);

    await addSchedule(formData); // 비동기 작업 완료 대기
    navigate("/grouppage", {
      state: {
        data: groupNo,
        members: result1,
        group: result2,
      },
    });
  };

  // 닫기 버튼 클릭 시 grouppage 메인으로 돌아감
  const close = async () => {
    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);

    navigate("/grouppage", {
      state: {
        data: groupNo,
        members: result1,
        group: result2,
      },
    });
  };

  return (
    <form className="registerSchedule" method="POST">
      <div className="add">
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <FontAwesomeIcon icon={faPlus} onClick={plus} />
        <FontAwesomeIcon icon={faMinus} style={{ color: "lightgray" }} />
        <FontAwesomeIcon icon={faXmark} onClick={close} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          제목
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          내용
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </form>
  );
};

const Schedule = () => {
  const location = useLocation();

  const groupNo = location.state?.groupNo;
  const scheduleNo = location.state?.scheduleNo;

  // console.log("groupNo : " + groupNo);
  // console.log("scheduleNo : " + scheduleNo);

  const renderUpdateOrAdd = () => {
    if (groupNo && scheduleNo) {
      return <Update />;
    } else if (scheduleNo === 0) {
      return <Add />;
    }
  };

  return (
    <ScheduleStyle>
      <div className="scheduleBody">
        <div className="scheduleContent">{renderUpdateOrAdd()}</div>
      </div>
    </ScheduleStyle>
  );
};

export default Schedule;
