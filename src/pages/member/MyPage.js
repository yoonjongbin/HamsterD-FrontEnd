import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delMember } from "../../store/userSlice";

const MypageTest = styled.div`
  .maincontain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(0, 90, 153, 72);
    padding: 50px;
    padding-top: 80px;
    // 메인콘테이너//
  }

  h1 {
    width: 100%;
    text-align: center;
    font-weight: bold;
    padding-left: 30px;
  }

  .photo-line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-top: 50px; //프로필-테두리 위쪽 공간//
  }

  .profileimg {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    //프로필 이미지
  }

  .nickname {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px; //닉네임 위쪽 공간//
    padding-bottom: 20px; //닉네임 아래 공간//
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px; //닉네임 위쪽 공간//
    padding-bottom: 20px; //닉네임 아래 공간//
  }

  .nickname-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 닉네임 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    margin-top: 20px;
    color: rgba(0, 90, 153, 72);
    //닉네임 테두리
  }

  .myId {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .myId-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .name {
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .name-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .phone {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .phone-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .email {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .email-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .gender {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .gender-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .address {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .address-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: auto;
    color: rgba(0, 90, 153, 72);
    //아이디 색
  }

  .schedule-btn {
    padding: 20px;
  }

  #btn1 {
    height: 40px;
    width: 150px;
    background-color: purple;
    border: 0px;
    font-weight: bold;
    padding-right: 10px;
    color: white;
  }

  #btn2 {
    height: 40px;
    width: 150px;
    background-color: orange;
    border: 0px;
    font-weight: bold;
    color: white;
  }

  .manage {
    width: 250px;
    display: flex;
    justify-content: space-around;
  }
`;

const MyPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      alert("로그인을 먼저 해주세요!!");
      navigate("/");
    }
  }, [user]);

  const navigate = useNavigate();

  const handleStudyClick = () => {
    // 내 스터디 클릭시 내 스터디그룹' 경로로 이동
    navigate("/studygroup");
  };

  const handleScheduleClick = () => {
    // 내 스터디 클릭시 내 스터디그룹' 경로로 이동
    navigate("/schedule");
  };

  const handleUpdateClick = () => {
    // 개인정보수정 버튼 클릭 시 '/update' 경로로 이동
    navigate("/update");
  };

  const deleteMember = () => {
    // alert (true, false)

    if (window.confirm("정말로 삭제하시겠습니까??")) {
      // 확인 버튼을 눌렀을때(true)
      console.log("삭제가 눌림");
      dispatch(delMember(user.memberNo));
      navigate("/");
    } else {
      // 취소 버튼을 눌렀을때(false)
      console.log("취소가 눌림");
    }
  };

  return (
    <MypageTest>
      <div className="maincontain">
        <h1>마이페이지</h1>
        {/* 프로필사진 */}
        <div className="photo-line">
          {user && user.profile && (
            <div className="photo">
              <img
                className="profileimg"
                src={`/upload/${user.profile.split("\\").pop()}`}
                alt="profile"
              />
            </div>
          )}
        </div>

        {/* 닉네임+ 수정부분 */}
        <div className="nickname">
          <div className="nickname-font">닉네임 : {user.nickname}</div>
          <div className="nickname-btn"></div>
        </div>

        {/* 아이디+ 수정부분 */}
        <div className="myId">
          <div className="myId-font">아이디 : {user.id}</div>
        </div>

        {/* 이름 */}
        <div className="name">
          <div className="name-font">이름 : {user.name}</div>
        </div>

        {/* 전화번호 */}
        <div className="phone">
          <div className="phone-font">전화번호 : {user.phone}</div>
        </div>

        {/* 이메일 */}
        <div className="email">
          <div className="email-font">이메일 : {user.email}</div>
        </div>

        {/* 성별 */}
        <div className="gender">
          <div className="gender-font">
            성별 : {user.gender === "man" ? "남자" : "여자"}
          </div>
        </div>

        {/* 주소 */}
        <div className="address">
          <div className="address-font">주소 : {user.address}</div>
        </div>

        <div className="schedule-btn">
          <button type="button" id="btn1" onClick={handleStudyClick}>
            나의 스터디 그룹
          </button>
        </div>

        <div className="manage - member">
          <button
            type="button"
            id="update-btn"
            className="btn btn-danger"
            onClick={handleUpdateClick}
          >
            개인정보 수정
          </button>

          <button
            type="button"
            id="update-btn"
            className="btn btn-danger"
            onClick={deleteMember}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </MypageTest>
  );
};

export default MyPage;
