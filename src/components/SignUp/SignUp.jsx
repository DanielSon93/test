import React, { useRef, useState } from "react";
import styled from "styled-components";
import Address from "./common/Address";

const Form = styled.form`
  position: relative;
  margin-top: 100px;
  width: 500px;
  border-radius: 1rem;
  padding: 1rem 2rem;
  border: 1px solid black;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const EmailInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmailSiteName = styled.div`
  font-weight: bold;
`;

const EmailInput = styled(Input)`
  width: 75%;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
`;

const InputFile = styled.input`
  width: 50%;
  display: none;
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 20px;
`;

const InputAddr = styled(Input)`
  width: 60%;
`;

const AddrButton = styled.button`
  width: 100px;
  background-color: transparent;
  padding: 0.3rem;
  margin-left: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const RadioButton = styled.input`
  margin-left: 0.3rem;
  box-sizing: content-box;
`;

const Submit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: black;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Error = styled.div`
  font-size: 0.8rem;
  color: red;
`;

export default function SignUp() {
  const [form, setForm] = useState(initForm);
  const [formValid, setFormValid] = useState(initFormValid);
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const profileImageRef = useRef(null);

  // 유저 프로필 이미지 업로드
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setForm((prev) => ({ ...prev, profileImage: "/assets/image/avatar.png" }));
    } else {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
    }
  };

  // 이메일, 비밀번호, 비밀번호 확인, 전화번호, 성별 입력값 저장
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 우편번호 모달 열림/닫힘
  const handleAddrModal = () => setIsAddrModalOpen((prev) => !prev);

  // 우편번호 데이터
  const handleAddr = (address) => setForm((prev) => ({ ...prev, address }));

  // 이메일 유효성 검사
  const handleEmailValid = (e) => {
    const regex = /^[a-z0-9]+$/;
    const isValid = regex.test(form.email);
    setFormValid((prev) => ({ ...prev, isEmailTouched: true, isEmailValid: isValid }));
  };

  // 비밀번호 유효성 검사
  const handlePasswordValid = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const isValid = regex.test(form.password);
    setFormValid((prev) => ({ ...prev, isPasswordTouched: true, isPasswordValid: isValid }));
  };

  // 비밀번호 확인 유효성 검사
  const handlePasswordCheckValid = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const isValid = form.password === form.passwordCheck && regex.test(form.passwordCheck);
    setFormValid((prev) => ({
      ...prev,
      isPasswordCheckTouched: true,
      isPasswordCheckValid: isValid,
    }));
  };

  // 전화번호 확인 유효성 검사
  const handlePhoneNumberValid = () => {
    const regex = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    const isValid = regex.test(form.phoneNumber);
    setFormValid((prev) => ({
      ...prev,
      isPhoneNumberTouched: true,
      isPhoneNumberValid: isValid,
    }));
  };

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formValid).every((e) => e === true);

    if (isFormValid && form.address !== "") {
      // 제출 성공
      setForm(initForm);
      setFormValid(initFormValid);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <ProfileImage
          src={form.profileImage}
          alt="avatar"
          onClick={() => profileImageRef.current.click()}
        />
        <InputFile
          type="file"
          ref={profileImageRef}
          accept="image/*"
          onChange={handleProfileImage}
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="email">이메일</Label>
        <EmailInputWrapper>
          <EmailInput
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={form.email}
            onChange={handleInput}
            onBlur={handleEmailValid}
          />
          <EmailSiteName>@naver.com</EmailSiteName>
        </EmailInputWrapper>
        {!formValid.isEmailValid && formValid.isEmailTouched && (
          <Error>유효한 이메일이 아닙니다.</Error>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleInput}
          onBlur={handlePasswordValid}
        />
        {!formValid.isPasswordValid && formValid.isPasswordTouched && (
          <Error>유효한 비밀번호가 아닙니다.</Error>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="passwordCheck">비밀번호 확인</Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          autoComplete="off"
          value={form.passwordCheck}
          onChange={handleInput}
          onBlur={handlePasswordCheckValid}
        />
        {!formValid.isPasswordCheckValid && formValid.isPasswordCheckTouched && (
          <Error>유효한 비밀번호가 아닙니다.</Error>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          autoComplete="off"
          value={form.phoneNumber}
          onChange={handleInput}
          onBlur={handlePhoneNumberValid}
        />
        {!formValid.isPhoneNumberValid && formValid.isPhoneNumberTouched && (
          <Error>유효한 전화번호가 아닙니다.</Error>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label>성별</Label>
        <Gender>
          <Label>
            남자
            <RadioButton
              type="radio"
              name="gender"
              value="mail"
              checked={form.gender === "mail"}
              onChange={handleInput}
            />
          </Label>
          <Label>
            여자
            <RadioButton
              type="radio"
              name="gender"
              value="femail"
              checked={form.gender === "femail"}
              onChange={handleInput}
            />
          </Label>
        </Gender>
      </InputWrapper>

      <InputWrapper>
        <Label>주소</Label>
        <div>
          <InputAddr type="text" name="address" value={form.address} readOnly />
          <AddrButton type="button" onClick={handleAddrModal}>
            우편번호 찾기
          </AddrButton>
        </div>
        {isAddrModalOpen && <Address handleAddrModal={handleAddrModal} handleAddr={handleAddr} />}
      </InputWrapper>
      <Submit>
        <SubmitButton>회원가입</SubmitButton>
      </Submit>
    </Form>
  );
}

const initForm = {
  profileImage: "/assets/image/avatar.png",
  email: "",
  password: "",
  passwordCheck: "",
  phoneNumber: "",
  address: "",
  gender: "mail",
};

const initFormValid = {
  isEmailTouched: false,
  isPasswordTouched: false,
  isPasswordCheckTouched: false,
  isPhoneNumberTouched: false,
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordCheckValid: false,
  isPhoneNumberValid: false,
};

// 전체 로직 정리 및 reducer 또는 custom hook으로 관리
