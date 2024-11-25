import FieldContainer from "./_components/FieldContainer";
import FormContainer from "./_components/FormContainer";

const RegisterPage = () => {
  return (
    <main>
      <FormContainer onSubmit={() => {}}>
        <FieldContainer
          type="email"
          label="이메일"
          value={"id"}
          placeholder="이메일을 입력해주세요"
        />
        <FieldContainer
          type="text"
          label="이름"
          value={"id"}
          placeholder="이름을 입력해주세요"
        />
        <FieldContainer
          type="password"
          label="비밀번호"
          value={"id"}
          placeholder="비밀번호를 입력해주세요"
        />
      </FormContainer>
    </main>
  );
};

export default RegisterPage;
