import styled from "styled-components";
import { putMember } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../../api/member";

const UpdateStyle = styled.div`
  .mainsection {
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(0, 90, 153, 72);
  }
  .section {
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 80px;
    margin-left: 200px;
    width: 500px;
    height: 1000px;
  }
  .profileimg {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    //프로필 이미지 (오리)//
  }

  .photo-line {
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 50px; //프로필-테두리 위쪽 공간//
  }
`;

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [next, setNext] = useState([]);

  const [password, setPw] = useState([]);
  const [nickName, setNick] = useState([]);

  const user = useSelector((state) => {
    return state.user;
  });

  const update = (e) => {
    e.preventDefault();

    // 새로운 FormData 생성
    const formData2 = new FormData();

    // 필드 추가

    formData2.set("password", password);
    formData2.set("nickname", nickName);
    formData2.set("profile", file);

    // 식별자 넣기(id)
    formData2.set("id", user.id);

    // 수정된 데이터 넘기기
    dispatch(putMember(formData2));

    navigate("/");
  };

  const handleImageClick = (e) => {
    const fileInput = e.target.previousElementSibling; // img태그 앞에 있는 형제 요소 선택(input 태그)
    if (fileInput) {
      fileInput.click(); // input 요소 클릭
    }
  };

  const handleFileChange = (e) => {
    setNext(e.target.nextElementSibling); // input 태그의 뒤에 있는 요소 선택(img 태그)
    setFile(e.target.files[0]); // file 변수에 입력된 파일 저장
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      alert("로그인을 먼저 해주세요!!");
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        next.src = e.target.result; // 읽은 파일의 64코드를 img태그의 src속성에 대입
      };
      reader.readAsDataURL(file); // 파일 읽기 시도
    }
  }, [file]);

  return (
    <UpdateStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="update" onSubmit={update}>
            <div className="photo-line">
              <div className="photo">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {user && user.profile && (
                  <img
                    className="profileimg"
                    src={`/upload/${user.profile.split("\\").pop()}`}
                    alt="Profile"
                    onClick={handleImageClick}
                  />
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                변경 할 비밀번호
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password2"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="password"
                  required
                  onChange={(e) => {
                    setPw(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="nickName" className="form-label">
                변경 할 닉네임
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="nickName"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="nickname"
                  required
                  onChange={(e) => {
                    setNick(e.target.value);
                  }}
                />
              </div>
            </div>

            <br></br>
            <button type="submit" id="updatebtn" className="btn btn-primary">
              개인정보 수정
            </button>
          </form>
        </div>
      </div>
    </UpdateStyle>
  );
};

export default Update;
//
