import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteLogo from "../../assets/Logo_White.svg";
import LogoBox from "../../components/LogoBox";
import InputBox from "../../components/InputBox";
import SignupBtn from "../../components/SignupBtn";
import LoginBtn from "../../components/LoginBtn";
import { TokenReq } from "../../apis/axiosInstance"; 

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  background-color: #000;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0rem 0.95rem;
`;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    verificationCode: "",
    emailToken: "",
    emailBtnText: "인증코드 전송",
    veriBtnText: "인증코드 확인",
    agreeBtnText1: "동의합니다",
    agreeBtnText2: "동의합니다",
    isEmailClicked: false,
    isVeriClicked: false,
    agreeBtnText1Clicked: false,
    agreeBtnText2Clicked: false,
    isActive: false,
    isPasswordVisible: false,
    isPasswordCheckVisible: false,
    step: 1,
  });

  const nextStep = () => {
    setFormData((prev) => ({
      ...prev,
      step: prev.step + 1
    }));
  };

  const prevStep = () => {
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const onEBtnClick = async () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    try {
      const response = await TokenReq.post("/email-auth/send-code", {
        email: formData.email, 
      });
  
      console.log("인증코드 전송 응답:", response.data);
      alert("인증코드가 전송되었습니다.");
  
      setFormData((prev) => ({
        ...prev,
        isEmailClicked: true,
        emailBtnText: "인증코드 재전송",
      }));
    } catch (error) {
      console.error("인증코드 전송 오류:", error);
      alert("인증코드 전송 중 오류가 발생했습니다.");
    }
  };

  const onVBtnClick = async () => {
    if (!formData.email || !formData.verificationCode) {
      alert("이메일과 인증코드를 입력해주세요.");
      return;
    }
  
    try {
      const response = await TokenReq.post("/email-auth/verify-code", {
        email: formData.email, 
        code: formData.verificationCode, 
      });
  
      console.log("인증코드 확인 응답:", response.data);
      alert("인증코드가 확인되었습니다.");
  
      setFormData((prev) => ({
        ...prev,
        isVeriClicked: true,
        veriBtnText: "확인되었습니다",
        emailToken: response.data.result.emailToken,
        email: response.data.result.email,
      }));
    } catch (error) {
      console.error("인증코드 확인 오류:", error);
      alert("인증코드 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
  
    const signupData = {
      nickname: formData.nickname,
      password: formData.password,
      email: formData.email,
      emailToken: formData.emailToken
    };

    console.log("회원가입 요청 데이터:", signupData);
  
    try {
      const response = await TokenReq.post("/users/signup", signupData);

      console.log("회원가입 응답 데이터:", response.data);
      
      if (response.data.success) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login"); 
      } else {
        alert(response.data.message || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 API 요청 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const isButtonEnabled = formData.veriBtnText === "확인되었습니다";
  const isPasswordMatch = formData.password === formData.passwordCheck;
  const isPasswordValid = isPasswordMatch && formData.password.trim() !== "" && formData.passwordCheck.trim() !== "";
  const isNicknameValid = formData.nickname.trim() !== "";
  const isAgreeAllChecked = formData.agreeBtnText1Clicked && formData.agreeBtnText2Clicked;

  return (
    <Wrapper>
      <Container>
        {formData.step === 1 && (
          <>
            <LogoBox 
              showIcon={true} 
              logoSrc={WhiteLogo}
              logoText="사용할 이메일을 등록해주세요"
              miniText=" "
            />
            <InputBox
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              isIBtnActive={true}
              BtnText={formData.emailBtnText}
              isClicked={formData.isEmailClicked}
              onBtnClick={onEBtnClick}
            />
            <InputBox
              placeholder="인증코드"
              value={formData.verificationCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, verificationCode: e.target.value }))}
              isIBtnActive={true}
              BtnText={formData.veriBtnText}
              isClicked={formData.isVeriClicked}
              onBtnClick={onVBtnClick}
            />
            <SignupBtn
              text="비밀번호 등록"
              isActive={isButtonEnabled}
              onClick={() => {
                if (isButtonEnabled) {
                  nextStep(); 
                }
              }}
              showIcon={true}
            />
          </>
        )}
        {formData.step === 2 && (
          <>
            <LogoBox 
              showIcon={true} 
              logoSrc={WhiteLogo}
              logoText="사용할 비밀번호를 등록해주세요"
              miniText="영문,숫자 포함 8-15자"
            />
            <InputBox
              type={formData.isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              isIcon={true} 
              iconType={formData.isPasswordVisible ? "eye" : "eye-off"} 
              onIconClick={() =>
                setFormData((prev) => ({ ...prev, isPasswordVisible: !prev.isPasswordVisible }))
              }
            />
            <InputBox
              type={formData.isPasswordCheckVisible ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={formData.passwordCheck}
              onChange={(e) => setFormData((prev) => ({ ...prev, passwordCheck: e.target.value }))}
              isIcon={true} 
              iconType={formData.isPasswordCheckVisible ? "eye" : "eye-off"} 
              onIconClick={() =>
                setFormData((prev) => ({ ...prev, isPasswordCheckVisible: !prev.isPasswordCheckVisible }))
              }
            />
            {!isPasswordMatch && formData.passwordCheck.trim() !== "" && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>비밀번호가 일치하지 않습니다.</p>
            )}
            <SignupBtn
              text="닉네임 등록"
              isActive={isPasswordValid}
              onClick={() => {
                if (isPasswordValid) {
                  nextStep();
                }
              }}
              showIcon={true}
            />
          </>
        )}
        {formData.step === 3 && (
          <>
            <LogoBox 
              showIcon={true} 
              logoSrc={WhiteLogo}
              logoText="사용할 닉네임을 등록해주세요"
              miniText="한글,영문,숫자 최대 15자"
            />
            <InputBox
              type={"text"}
              placeholder="낙네임 입력"
              value={formData.nickname}
              onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
            />
            <SignupBtn
              text="이용약관 및 개인정보처리방침 확인"
              isActive={isNicknameValid}
              onClick={() => {
                if (isNicknameValid) {
                  nextStep();
                }
              }}
              showIcon={true}
            />
          </>
        )}
        {formData.step === 4 && (
          <>
            <LogoBox 
              showIcon={true} 
              logoSrc={WhiteLogo}
              logoText={"서비스 이용약관 및\n개인정보 처리방침을 확인해주세요"}
            />
            <InputBox
              value={"1.서비스이용약관"}
              isIBtnActive={true}
              isReadOnly={true}
              BtnText={formData.agreeBtnText1}
              isClicked={formData.agreeBtnText1Clicked}
              onBtnClick={() => setFormData((prev) => ({ ...prev, agreeBtnText1Clicked: true }))}
            />
            <InputBox
              value={"2.개인정보처리방침"}
              isIBtnActive={true}
              isReadOnly={true}
              BtnText={formData.agreeBtnText2}
              isClicked={formData.agreeBtnText2Clicked}
              onBtnClick={() => setFormData((prev) => ({ ...prev, agreeBtnText2Clicked: true }))}
            />
            <SignupBtn
              text="회원가입 완료"
              isActive={isAgreeAllChecked}
              onClick={() => {
                if (isAgreeAllChecked) {
                  handleSignUp();
                  nextStep();
                }
              }}
              showIcon={true}
            />
          </>
        )}
        {formData.step === 5 && (
          <>
            <LogoBox 
              showIcon={true} 
              logoSrc={WhiteLogo}
              logoText="회원가입이 완료되었습니다"
              miniText=" "
            />
            <LoginBtn
              text="로그인으로 이동"
              onClick={() => navigate("/login")} 
              isActive={false}
            />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default SignUp;
