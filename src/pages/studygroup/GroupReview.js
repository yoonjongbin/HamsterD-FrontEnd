import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addGroupReview } from "../../api/studygroup";

const GroupReviewStyle = styled.div`
  .mainsection {
    border: 1px solid rgba(0, 90, 153, 72);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(0, 90, 153, 72);
    //
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
  } //
  #description {
    height: 100px;
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
  .groupinfo {
    font-size: 13px;
    padding: 20px;
    width: 100%;
    background: var(--white, #ffffff);
    border-radius: 30px;
    height: 200px;
    margin-left: 30px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 5px 5px 0px rgba(29, 38, 56, 0.03)
    );
  }

  #group {
    width: 100px;
    height: 100px;
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
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
  #grouppoint {
    margin-left: 40px;
  }
  .horizonline {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(163, 157, 139);
    line-height: 0.3em;
    margin: 20px 0 10px;
    opacity: 30%;
  }
  .eva2 {
    display: flex;
    justify-content: space-around;
  }
`;

const GroupReview = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const location = useLocation();

  const number = Number(location.state.data);
  const members = location.state.members;
  const group = location.state.group;
  const manager = location.state.manager;

  const [point, setPoint] = useState("1");
  const [comment, setcomment] = useState([]);

  const onClick = async (e) => {
    e.preventDefault();

    console.log("===================");
    const formData = new FormData();
    formData.append("groupScore", point);
    formData.append("review", comment);
    formData.append("member", user.memberNo);
    formData.append("studyGroup", group.groupNo);
    console.log(formData);

    await addGroupReview(formData); // 비동기 작업 완료 대기

    navigate("/studygroup"); // 파일 업로드가 완료되면 페이지 이동
  };

  return (
    <GroupReviewStyle>
      <div className="mainsection">
        <div className="section">
          <div>
            <div className="profile-container">
              <div id="profile">
                <img
                  className="profileimg"
                  src={`/upload/${manager.profile.split("\\").pop()}`}
                  alt="Profile"
                />
              </div>
              <div>
                <div id="grouptext">{manager.nickname}님의 스터디그룹</div>
                <div id="academyname">{manager.academyName}</div>
              </div>
            </div>
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
                  <div id="groupname">그룹명 : {group.groupName} </div>
                  <div>그룹 소개 : {group.groupContent} </div>
                </div>
              </div>

              <div className="horizonline"></div>
              <div className="group-container">
                {members.map((item, index) => (
                  <div key={item.memberNo}>
                    <div>
                      <img
                        className="profileimg2"
                        src={`/upload/${item.profile.split("\\").pop()}`}
                        alt="Profile"
                      />
                    </div>
                    <div>{item.nickname}</div>
                  </div>
                ))}
                <div>외 {members.length}명 참여 중</div>
                <div id="grouppoint">그룹 점수 ex 4.7점</div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div>
            <form className="createreview" method="POST" onSubmit={onClick}>
              <div className="eva">
                <label className="form-label">별점</label>
                <div className="eva2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starRating"
                      id="flexRadioDefault1"
                      value="1"
                      onChange={(e) => setPoint(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      1점
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starRating"
                      id="flexRadioDefault2"
                      value="2"
                      onChange={(e) => setPoint(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      2점
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starRating"
                      id="flexRadioDefault3"
                      value="3"
                      onChange={(e) => setPoint(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      3점
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starRating"
                      id="flexRadioDefault4"
                      value="4"
                      onChange={(e) => setPoint(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault4"
                    >
                      4점
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starRating"
                      id="flexRadioDefault5"
                      value="5"
                      onChange={(e) => setPoint(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault5"
                    >
                      5점
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="review">
                <label htmlFor="review" className="form-label">
                  스터디그룹 평가
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  required
                  name="name"
                  onChange={(e) => setcomment(e.target.value)}
                />
                <span className="form-text">
                  스터디그룹에 대한 평가를 적어주세요
                </span>
              </div>
              <br />
              <input
                type="submit"
                id="signupbtn"
                className="btn btn-primary"
                value="평가 완료"
              />
            </form>
          </div>
        </div>
      </div>
    </GroupReviewStyle>
  );
};

export default GroupReview;
