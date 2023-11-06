import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";
import logo from "../resource/로고 투명.png";

const customStyles = {
  overlay: {
    backgroundColor: "rgb(0, 0, 0, 0.6)", // 모달이 열릴 때 뒷 배경의 색상과 투명도
  },
  content: {
    top: "50%", // 모달을 수직 가운데로 위치
    left: "50%", // 모달을 수평 가운데로 위치
    transform: "translate(-50%, -50%)", // 모달을 수직, 수평으로 가운데 정렬
    backgroundColor: "rgb(255, 255, 255, 1)", // 모달의 배경 색상
    borderRadius: "10%",
    width: "500px",
    height: "500px",
  },
}; //

const StyleTest = styled.div`
  .mainModal {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 400px;
    font-family: "EliceDx";
  }
  .set {
    width: 200px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    background-color: rgb(233, 233, 233);
  }

  .set {
    width: 200px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    background-color: rgb(233, 233, 233);
  }

  #loginbtn {
    margin-left: 60px;
  }

  #signUpbtn {
    margin-left: 50px;
  }

  .setControll {
  }

  .closebtn {
    position: relative;
    margin-left: 400px;
    margin-top: -40px;
  }

  .logoimg {
    width: 200px;
    margin: 20px 0px 20px 0px;
  }
`;

function ModalSub(props) {
  const [id, setId] = useState([]);
  const [password, setPw] = useState([]);

  const [isOpen, setIsOpen] = useState(true); // Modal 표시여부

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // user가 없으면 modal 열기
    setIsOpen(Object.keys(props.user).length === 0);
  }, [props.user]);

  useEffect(() => {
    // modal 상태에 따라 body 고정여부
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const closeTab = () => {
    // modal 내리기
    setIsOpen(false);
  }; //

  const signUp = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/signup");
    setIsOpen(false);
  };

  const login = (e) => {
    // 로그인 버튼 클릭시 로그인
    e.preventDefault();

    // 로그인 시도
    dispatch(asyncLogin({ id, password }));
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="modal"
      ariaHideApp={false}
    >
      <StyleTest>
        <div className="mainModal">
          <br></br>
          <div className="closebtn">
            <button
              onClick={closeTab}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <img className="logoimg" src={logo} alt="Logo" />

          <br></br>
          <form className="innerModal" onSubmit={login}>
            <div className="setControll">
              <input
                className="set"
                type="text"
                placeholder="  아이디를 입력하세요.."
                name="id"
                required
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></input>
              <br></br> <br></br>
              <input
                className="set"
                type="password"
                placeholder="  비밀번호를 입력하세요.."
                name="password"
                required
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              ></input>
              <br></br>
              <br></br>
              <button type="submit" id="loginbtn" className="btn btn-primary">
                로그인
              </button>
              <br></br> <br></br>
              <br></br>
              <br></br>
              <h4>아직 비회원이세요?</h4>
              <br></br>
              <button
                type="button"
                id="signUpbtn"
                className="btn btn-danger"
                onClick={signUp}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </StyleTest>
    </Modal>
  );
}

export default ModalSub;
