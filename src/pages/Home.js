import styled from "styled-components";

const HomeTest = styled.div`
  /* 전체 페이지 설정 */
  .main-page {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--grey-blue-60, #6b7a99);
  } //
  /* 하단 메인페이지 */
  .main-section {
    display: flex;
    width: 100%;
    height: 900px;
  }
  //
  .section {
    border: 1px solid var(--grey-blue-95, #edeff2);
    border-radius: 20px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    height: 700px;
    margin-top: 30px;
    padding: 30px;
  }

  /* 메인페이지(컨텐츠 부분) */
  #section2 {
    width: 100vw;
    min-width: 900px;
    max-width: 1500px;
    margin-right: 50px;
  }

  .searchsection {
    width: 100%;
    background: var(--white, #ffffff);
    border-radius: 30px;
    height: 50px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 5px 5px 0px rgba(29, 38, 56, 0.03)
    );
  }

  #section2-search {
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
  }

  #section2-search input {
    height: 90%;
    width: 95%;
    border: 0 solid black;
    outline: none;
  }

  #section2-search button {
    background-color: white;
    border: 0 solid black;
  }

  /* 인기글 */
  .news-section {
    height: 85%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }

  .news1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  .news-top {
    background: var(--white, #ffffff);
    border-radius: 10px;
    border-style: solid;
    border-color: var(--grey-blue-97, #f5f6f7);
    border-width: 2px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
  }

  .news1-content1 {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .news1-content2 {
    display: flex;
    border-top-style: solid;
    border-top-color: var(--grey-blue-97, #f5f6f7);
    border-top-width: 2px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    height: 50px;
    width: 300px;
  }

  .like {
    border-right-style: solid;
    border-right-color: var(--grey-blue-97, #f5f6f7);
    border-right-width: 2px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
  }

  #like-count,
  #comment-count {
    width: 50px;
  }

  .news1-content2 div {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .like img,
  .comment img {
    width: 15px;
    height: 15px;
  }

  /* 최신글 */
  .news2 {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .news2 div {
    border-bottom: 1px solid var(--grey-blue-97, #f5f6f7);
    height: 40px;
  }
`;

const Home = () => {
  return (
    <HomeTest>
      <div className="section" id="section2">
        <div className="news-section" id="news">
          <div className="news1">
            <div className="news-top" id="news-top2">
              <div className="news1-content1">인기글1</div>
              <div className="news1-content2">
                <div className="like">
                  <img src="resources/like.png" />
                  <div id="like-count">55</div>
                </div>
                <div className="comment">
                  <img src="resources/comment.png" />
                  <div id="comment-count">37</div>
                </div>
              </div>
            </div>
            <div className="news-top" id="news-top2">
              <div className="news1-content1">인기글2</div>
              <div className="news1-content2">
                <div className="like">
                  <img src="resources/like.png" />
                  <div id="like-count">38</div>
                </div>
                <div className="comment">
                  <img src="resources/comment.png" />
                  <div id="comment-count">17</div>
                </div>
              </div>
            </div>
            <div className="news-top" id="news-top2">
              <div className="news1-content1">인기글3</div>
              <div className="news1-content2">
                <div className="like">
                  <img src="resources/like.png" />
                  <div id="like-count">19</div>
                </div>
                <div className="comment">
                  <img src="resources/comment.png" />
                  <div id="comment-count">11</div>
                </div>
              </div>
            </div>
          </div>

          <div className="news2">
            <div>최신글1</div>
            <div>최신글2</div>
            <div>최신글3</div>
            <div>최신글4</div>
            <div>최신글5</div>
          </div>
        </div>
      </div>
    </HomeTest>
  );
};
export default Home;
