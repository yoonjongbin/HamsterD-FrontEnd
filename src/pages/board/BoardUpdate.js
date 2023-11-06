import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useState, useMemo } from "react";
import { updateBoard } from "../../api/boardFile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";

const BoardUpdateStyle = styled.div`
  /* 스타일 내용 입력 */
  .form-label {
    font-size: 18px;
  }

  .btnn {
    display: flex;
    justify-content: flex-end;
  }

  .form-check {
    display: flex;
    justify-content: flex-end;
  }

  .BoardUpdateForm {
    width: 1000px;
  }

  .headName {
    font-size: 30px;
    margin-bottom: 20px;
  }

  .titleInput {
    width: 1000px;
  }
`;
//이미지 업로드 시 quill에 추가
Quill.register("modules/imageUploader", ImageUploader);
//이미지 사이즈 크기 조정 quill에 추가
Quill.register("modules/imageResize", ImageResize);
//
const BoardUpdate = ({ postNo, initialTitle, initialDesc }) => {
  const [title, setTitle] = useState(initialTitle);
  console.log("기존 타이틀 " + initialTitle);
  console.log("수정 타이틀 " + title);

  const [desc, setDesc] = useState(initialDesc);
  console.log("기존 내용 " + initialTitle);
  console.log("수정 내용 " + desc);

  const [securityCheck, setSecurityCheck] = useState("n");

  const formData = new FormData();
  const navigate = useNavigate();

  // const user = useSelector((state) => {
  //   return state.user;
  // });

  const user = JSON.parse(localStorage.getItem("user"));

  const cancelClick = () => {
    navigate("/boardList");
  };

  // const token = localStorage.getItem("token");

  const onClick = async () => {
    formData.append("postNo", postNo);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("id", user.id);
    formData.append("securityCheck", securityCheck);
    // formData.append("token", token);
    console.log("클릭 후 postNo : " + postNo);
    console.log("클릭 후 title : " + title);
    console.log("클릭 후 desc : " + desc);
    console.log("클릭 후 user.memberNo : " + user.id);
    if (formData != null) {
      await updateBoard(formData);
      navigate("/boardList");
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
    "imageBlot",
  ];
  const [img, setImg] = useState([]);
  const images = [];

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    //게시물에서 이미지 여러개 담을때 필요함
    ["images"],
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
      },
      clipboard: {
        matchVisual: false,
      },

      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            fetch(
              "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
              {
                method: "POST",
                body: formData,
              }
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(file);
                images.push(file);
                console.log(images);
                setImg(images);
                // setImages([...images, file]);
                console.log(result);
                resolve(result.data.url);
              })
              .catch((error) => {
                reject("Upload 실패");
                console.error("Error : ", error);
              });
          });
        },
      },
      imageResize: {
        displaySize: true,
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  return (
    <BoardUpdateStyle>
      <div className="head1">
        <div className="head2">
          <div className="BoardUpdateForm">
            <div className="headName">게시물 수정</div>
            {/* <select className="form-select" aria-label="Default select example">
            <option selected>게시물 목록</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> */}

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              {/* input값에 onChange 넣지 않으면 콘솔창에 오류발생 */}
              <label hidden value={postNo} />
              <input
                className="titleInput"
                type="text"
                value={title}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="formCheck">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="y"
                  // checked={securityCheck === "y"}
                  onChange={(e) => {
                    {
                      console.log(e.target.value);
                      setSecurityCheck(e.target.value);
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  익명
                </label>
              </div>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                공개
              </label>
              </div> */}
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <ReactQuill
                contentEditable={true}
                onChange={(e) => {
                  setDesc(e);
                }}
                value={desc}
                modules={modules}
                formats={formats}
                theme="snow"
              />
            </div>
            {/* <div className="button1">
            <button
              type="button"
              className="btn btn-outline-warning"
              id="button1"
            >
              임시저장하기
            </button>
          </div> */}

            <div className="btnn">
              <div>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={onClick}
                  id="button2"
                >
                  수정하기
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  id="button2"
                  onClick={cancelClick}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoardUpdateStyle>
  );
};

export default BoardUpdate;
