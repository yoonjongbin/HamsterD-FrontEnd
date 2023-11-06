import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewMemberList, viewStudyGroup } from "../api/studygroup";
import { useSelector } from "react-redux";
import academy1 from "../resource/222.JPG";
import academy2 from "../resource/22222.JPG";
import academy3 from "../resource/ㅁㄴㅇ.JPG";
import academy4 from "../resource/설겜아.JPG";
const Test2 = styled.div`
  /* 로고영역 */
  #logo {
    width: 300px;
    min-width: 300px;
    margin-left: 100px;
    display: flex;
    justify-content: center;
  }
  ////
  /* 로고 이미지 */
  #logo img {
    width: 250px;
    left: 29px;
    top: -10px;
  } //
  .section {
    border: 4px solid rgba(0, 90, 153, 72);
    color: rgba(0, 90, 153, 72);
    border-radius: 20px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );

    height: 700px;

    margin-top: 3px;
    padding: 30px;
    color: rgba(0, 90, 153, 72);
    font-weight: bold;
  }

  /*사이드바 */
  #section3 {
    width: 0px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    margin: 30px 100px 0 50px;
    height: 1000px;
  }

  .myimg {
    width: 100%;
    height: 300px;
    margin-top: 30px;
    display: flex;
    align-self: center;
  }

  .myimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .myinfo {
    width: 100%;
    height: 100%;
    margin-top: -40px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .myinfo div {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    margin-top: 100px;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-page {
    width: 600px;
    margin-top: -140px;
  }
  .btn {
    color: rgba(0, 90, 153, 72);
  }
  .main-page {
  }
  width: 600px;
  margin-top: -10px;
  .banner {
    width: 350px;
    height: 110px;
    &:hover {
      color: red;
      opacity: 0.5;
      transition: color 0.5s;
    }
  }
`;

const Sidebar = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  // console.log(user.studyGroup);

  const navigate = useNavigate();

  const handleStudyGroupClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/grouppage");
  };

  const myStudyGroup = () => {
    // if (user.studyGroup !== null) {
    //   const idex = user.studyGroup.groupNo;
    //   const result1 = viewMemberList(idex);
    //   const result2 = viewStudyGroup(idex);
    //   navigate("/grouppage", {
    //     state: {
    //       groupno: idex,
    //       members: result1,
    //       group: result2,
    //     },
    //   });
    // } else {
    //   navigate("/studygroup");
    // }
    navigate("/studygroup");
  };

  const handleContactImageClick1 = () => {
    window.open("http://www.iei.or.kr/", "_blank"); // kh 학원 이동
  };

  const handleContactImageClick2 = () => {
    window.open("https://www.sist.co.kr/", "_blank"); // 쌍용학원 이동
  };

  const handleContactImageClick3 = () => {
    window.open("https://megaitacademy.com/", "_blank"); // 메가스터디 이동
  };

  const handleContactImageClick4 = () => {
    window.open("https://www.sgaedu.co.kr/", "_blank"); // SGA 게임아카데미 이동
  };

  return (
    <Test2>
      <div className="main-page">
        <div className="main-section">
          <div className="section" id="section3">
            <div className="myinfo">
              <div className="mystudy">
                <img
                  className="banner"
                  src={academy3}
                  onClick={handleContactImageClick1}
                ></img>
              </div>
              <div className="myweight">
                <img
                  className="banner"
                  src={academy2}
                  onClick={handleContactImageClick2}
                ></img>
              </div>
              <div className="mycalender">
                <img
                  className="banner"
                  src={academy1}
                  onClick={handleContactImageClick3}
                ></img>
              </div>
              <div className="mypost">
                <img
                  className="banner"
                  src={academy4}
                  onClick={handleContactImageClick4}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Test2>
  );
};

export default Sidebar;
