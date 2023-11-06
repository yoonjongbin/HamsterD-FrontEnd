import React, { useState } from "react";

const DaumPostCode = ({ handleAddressComplete }) => {
  const [address, setAddress] = useState("");

  const loadAPI = () => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 주소 데이터를 부모 컴포넌트로 전달
          if (handleAddressComplete) {
            handleAddressComplete(data);
          }
          // 주소를 상태로 저장
          setAddress(data.address);
        },
      }).open();
    };

    document.body.appendChild(script);
  };

  return (
    <span>
      <button
        style={{ width: "100px", height: "35px", marginLeft: "5px" }}
        onClick={loadAPI}
      >
        검색
      </button>
    </span>
  );
};

export default DaumPostCode;
