import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signup } from "../util/api";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const handleSignup = async (data) => {
    try {
      // const submitBirth = new Date(data.birth).getTime();

      const res = await signup(
        data.name,
        data.email,
        data.password,
        data.birth
      );
      if (res.status === 201) {
        alert("회원가입 성공!");
        nav("/");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("이미 존재하는 사용자입니다.");
        nav("/");
      } else {
        alert("회원가입 실패!");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      {/*이메일 입력*/}
      <div>
        <label>이메일</label>
        <input
          type="email"
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
          placeholder="example@email.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      {/*비밀번호 입력 */}
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다.",
            },
          })}
          placeholder="비밀번호 8자 이상"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      {/*비밀번호 확인 입력*/}
      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "비밀번호 확인은 필수입니다.",
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          placeholder="비밀번호 확인"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      {/*이름 입력 */}
      <div>
        <label>이름</label>
        <input
          {...register("name", {
            required: "이름은 필수입니다.",
            minLength: {
              value: 2,
              message: "이름은 2자 이상입니다.",
            },
          })}
          placeholder="ex)홍길동"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      {/*생년월일 입력 */}
      <label>생년월일</label>
      <input
        type="date"
        {...register("birth", {
          required: "생년월일 입력은 필수입니다.",
        })}
      />
      {errors.birth && <p>{errors.birth.message}</p>}
      <br />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
