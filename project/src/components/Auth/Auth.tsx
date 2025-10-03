import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../store/slices/userSlice";
import { loginRequest, fetchProfile } from "../../api/UserApi";
import { setModal } from "../../store/slices/modalSlice";
import "../../styles/scss/blocks/_auth.scss";
import "../../styles/scss/blocks/_btn.scss";

interface Props {
  onSwitchToRegistration: () => void;
  onClose: () => void;
}

const Auth = ({ onSwitchToRegistration, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const validate = () => {
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const success = await loginRequest(email, password);
    if (!success) return;

    try {
      const user = await fetchProfile();
      dispatch(loginUser(user));
      onClose();
    } catch {
      dispatch(setModal("auth"));
    }
  };

  return (
    <div className="auth">
      <div className="auth__content">
        <div className="auth__modal">
          <img
            className="auth__logo"
            src="/images/logo-black.png"
            alt="Логотип VK Маруся"
            width={157}
            height={35}
          />
          <div className="auth__wrapper">
            <div
              className={`custom__input ${
                errors.email ? "custom__input--error" : ""
              }`}
            >
              <svg className="custom__input-icon" width={24} height={24}>
                <use xlinkHref="/images/sprite.svg#mail" />
              </svg>
              <input
                className="custom__input-field"
                type="email"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={`custom__input ${
                errors.password ? "custom__input--error" : ""
              }`}
            >
              <svg className="custom__input-icon" width={24} height={24}>
                <use xlinkHref="/images/sprite.svg#key" />
              </svg>
              <input
                className="custom__input-field"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn--auth" onClick={handleLogin}>
            Войти
          </button>
          <button className="btn__white" onClick={onSwitchToRegistration}>
            Регистрация
          </button>
        </div>
        <button className="auth__button" onClick={onClose}>
          <svg className="auth__button-icon" width={24} height={24}>
            <use xlinkHref="/images/sprite.svg#size-large" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Auth;
