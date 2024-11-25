import FieldContainer from "./_components/FieldContainer";
import FormContainer from "./_components/FormContainer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "사용자 이름은 최소 3자 이상이어야 합니다." }),
    email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(6, { message: "비밀번호 확인이 필요합니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호와 확인 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type RegisterBodyType = z.infer<typeof RegisterFormSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = (data: RegisterBodyType) => {
    console.log("회원가입 데이터:", data);
  };
  return (
    <main>
      <FormContainer onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldContainer
          label="사용자 이름"
          {...register("username")}
          error={errors.username?.message}
        />

        <FieldContainer
          label="이메일"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <FieldContainer
          label="비밀번호"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <FieldContainer
          label="비밀번호 확인"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </FormContainer>
    </main>
  );
};

export default RegisterPage;
