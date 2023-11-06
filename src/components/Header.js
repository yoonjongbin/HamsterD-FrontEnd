import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import logo from "../resource/로고 투명.png";
import { Link, useNavigate } from "react-router-dom";
import ModalSub from "../components/ModalSub";
import { userLogout } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { userSave } from "../store/userSlice";

const Test = styled.div`
  .header-section {
    display: flex;
    width: 100%;
    height: 120px;
    margin-left: 60px;
  }
  ////
  .header {
    display: flex;
    align-items: center;
    margin-top: 70px;
    width: 100vw;
    min-width: 1100px;
    max-width: 1500px;
    flex-direction: row;
    justify-content: space-around;
    font-weight: bold;
    margin-right: 100px;
    font: 700 20px/25px "Roboto", sans-serif;
  }

  #logo {
    width: 400px;
    min-width: 370px;
    margin-left: 40px;
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }

  #logo img {
    width: 300px;
    height: 67px;
    margin-left: -90px;
    border-radius: 40px;
  }

  .menu a {
    text-decoration: none;
    color: rgba(0, 90, 153, 72);
    font-family: fantasy;
  }

  .menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .submenu {
    font-size: 1rem;
    visibility: hidden;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 150px;
    margin-top: 20px;
    z-index: 2;
  }

  .header:hover .submenu {
    visibility: inherit;
    justify-content: space-around;
  }

  /* .logout {
    margin-top: -150px;
    margin-left: 200px;
  } */

  #logout {
    align-self: self-start;
    .btn {
      width: 195px;
    }
  }

  /* 사이드바 CSS */
`;

const Sub = styled.div``;

const Header = () => {
  const save = JSON.parse(localStorage.getItem("user")); // 로컬스토리지에 user정보 호출
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutVisible, setVisible] = useState(true);

  // const home = () => {
  //   // 로고 //클릭시 메인페이지 이동
  //   navigate("/");
  // };

  const logout = () => {
    console.log("logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
    navigate("/");
  };

  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user);

  useEffect(() => {
    if (Object.keys(user).length === 0 && save !== null) {
      // store에 키값(식별자)이 없으면서 로컬 스토리지에 유저정보가 존재하면 저장
      dispatch(userSave(save));
      setVisible(true); // 로그아웃 버튼 보이기
    } else if (Object.keys(user).length === 0 && save === null) {
      setVisible(false); // 로그아웃 버튼 안보이게
      navigate("/");
    }
  }, [user]);

  return (
    <Test>
      <Sub>
        <div>
          <ModalSub user={user} />
        </div>
      </Sub>

      <div className="header-section">
        <div id="logo">
          <img
            className="logoimg"
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="realheader">
          <div className="header">
            <div className="menu" id="mypage">
              <div className="submenu1">
                <Link to="/mypage">마이 페이지</Link>
              </div>
              <div className="submenu">
                <Link to="/update">개인정보수정</Link>
              </div>
            </div>
            <div className="menu" id="board">
              <div className="submenu1">
                <Link to="/boardList">게시판</Link>
              </div>
              <div className="submenu">
                <a href="#">랭킹</a>
                <a href="#">스터디그룹 조회</a>
                <a href="creategroup">스터디 만들기</a>
              </div>
            </div>
            <div className="menu" id="studygroup">
              <div className="submenu1">
                <Link to="/studygroup">스터디그룹</Link>
              </div>
              <div className="submenu">
                <Link to="/groupreview">{""}</Link>
              </div>
            </div>
            {/* <div className="menu" id="social">
              <div className="submenu1">
                <Link onClick={logout}>로그아웃</Link>
                <div className="submenu">
                  <Link to="/groupreview">{""}</Link>
                </div>
              </div>
            </div> */}

            <div id="logout">
              {logoutVisible && (
                <button className="btn btn-danger" onClick={logout}>
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Test>
  );
};

export default Header;
