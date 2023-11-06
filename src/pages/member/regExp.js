export const regExpId = (id) => {
  // 아이디의 정규식 패턴 (예: 영문 대소문자 및 숫자로 이루어진 3-16자)
  const idPattern = /^[a-zA-Z0-9_-]{3,16}$/;

  //   console.log(idPattern.test(id));

  return idPattern.test(id);
};

export const regExpPw = (password) => {
  // 아이디의 정규식 패턴 (8글자에서 20글자 사이의 비밀번호)
  const pwPattern =
    /^(?![@#$%^&+=!])(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@#$%^&+=!]{8,20}$/;

  //   console.log(idPattern.test(id));

  return pwPattern.test(password);
};

export const ConfirmPw = (password, confirmPw) => {
  if (password === confirmPw) {
    return true;
  }

  return false;
};
