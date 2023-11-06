import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGroupReviewList } from "../../api/studygroup";

const ReviewPage = (props) => {
  const [review, setReview] = useState([]);
  const [groupNo, setGroupNo] = useState(props.groupNo);

  // 그룹별 댓글 목록 받아와서 뿌리기
  const reviewOfGroup = async () => {
    const result = await getGroupReviewList(groupNo);
    console.log(result.data);
    setReview(result.data);
  };

  useEffect(() => {
    reviewOfGroup();
  }, [groupNo]);

  return (
    <>
      {/* {console.log(review.length)} */}
      {/* {review.length === 0 ? (
        <div>리뷰가 아직 없어요! 리뷰를 등록해주실래요??</div>
      ) : ( */}
      <div>
        <h5 style={{ textAlign: "center", fontWeight: "bold" }}>리뷰 목록</h5>
        <br />
        <table style={{ textAlign: "center" }}>
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>평점</td>
              <td>리뷰</td>
              <td>닉네임</td>
            </tr>
          </thead>
          <tbody>
            {review.map((item, index) => (
              <tr key={item.groupRevNo} id={item.groupRevNo} className="review">
                <td style={{ width: "100px" }}>별 {item.groupScore}개</td>
                <td style={{ width: "300px" }}>{item.review}</td>
                <td style={{ width: "200px" }}>{item.member.nickname} 님</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* )} */}
    </>
  );
};

export default ReviewPage;
