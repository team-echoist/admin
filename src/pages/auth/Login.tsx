import { FormEvent, useState } from "react";

import { AuthPaths } from "../../router/paths";
import FieldContainer from "./_components/FieldContainer";
import FormContainer from "./_components/FormContainer";
import type { LoginBodyType } from "../../api/auth/postLogin";
import postLogin from "../../api/auth/postLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginBody, setLoginBody] = useState<LoginBodyType>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await postLogin(loginBody);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <FormContainer
        onSubmit={handleSubmit}
        move={{
          label: "관리자 계정이 없으세요?",
          to: `/auth/${AuthPaths.REGISTER}`,
        }}
      >
        <FieldContainer
          label="이메일"
          value={loginBody.email}
          onChange={(e) => {
            setLoginBody((prev) => ({ ...prev, email: e.target.value }));
          }}
          placeholder="이메일을 입력해주세요"
        />
        <FieldContainer
          type="password"
          label="비밀번호"
          value={loginBody.password}
          onChange={(e) => {
            setLoginBody((prev) => ({ ...prev, password: e.target.value }));
          }}
          placeholder="비밀번호를 입력해주세요"
        />
      </FormContainer>
    </main>
  );
};

export default LoginPage;
