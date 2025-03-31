import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signup, getCode } from "../util/api";
import { Check } from "lucide-react";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const [authPassed, setAuthPassed] = useState(false);
  const [timer, setTimer] = useState(180);
  const [code, setCode] = useState("");
  const [receivedCode, setReceivedCode] = useState("");

  const email = watch("email");

  useEffect(() => {
    let interval;
    if (codeSent && timer > 0 && !authPassed) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [codeSent, timer, authPassed]);

  const handleSendCode = async () => {
    if (!email) {
      alert("이메일을 먼저 입력해주세요.");
      return;
    }
    try {
      const response = await getCode(email);
      const received = response.data.data.code;
      setReceivedCode(received);
      setCodeSent(true);
      setTimer(180);
      alert("인증 코드가 전송되었습니다.");
    } catch (error) {
      alert("인증 코드 전송 실패");
    }
  };

  const handleVerifyCode = () => {
    if (code === receivedCode) {
      setAuthPassed(true);
      alert("이메일 인증 성공!");
    } else {
      alert("인증 코드가 올바르지 않습니다.");
    }
  };

  const handleSignup = async (data) => {
    try {
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
    <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
      {/* 이메일 인증 */}
      <div className="space-y-2">
        <label>이메일</label>
        <input
          type="email"
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
          placeholder="example@email.com"
          className="border p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={handleSendCode}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          인증 코드 전송
        </button>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {codeSent && (
          <>
            {!authPassed && (
              <p className="text-sm text-gray-600">
                남은 시간: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="인증 코드 입력"
                className="border p-2 rounded w-full"
                disabled={authPassed}
              />
              {authPassed && <Check className="text-green-500" />}
            </div>
            {!authPassed && (
              <button
                type="button"
                onClick={handleVerifyCode}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                인증 확인
              </button>
            )}
          </>
        )}
      </div>

      {/* 이메일 인증 완료 후 회원가입 폼 노출 */}
      {authPassed && (
        <>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                minLength: { value: 8, message: "8자 이상 입력해주세요." },
              })}
              placeholder="비밀번호"
              className="border p-2 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수입니다.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호 확인"
              className="border p-2 rounded w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label>이름</label>
            <input
              {...register("name", {
                required: "이름은 필수입니다.",
                minLength: { value: 2, message: "2자 이상 입력해주세요." },
              })}
              placeholder="이름"
              className="border p-2 rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>생년월일</label>
            <input
              type="date"
              {...register("birth", { required: "생년월일은 필수입니다." })}
              className="border p-2 rounded w-full"
            />
            {errors.birth && (
              <p className="text-red-500 text-sm">{errors.birth.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#034AA6] hover:bg-[#2A5CBF] text-white font-bold py-2 rounded"
          >
            회원가입
          </button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
