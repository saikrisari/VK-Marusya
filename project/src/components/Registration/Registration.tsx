import { useState } from "react";
import { registerUser } from "../../api/UserApi";
import "../../styles/scss/blocks/_auth.scss";
import "../../styles/scss/blocks/_btn.scss";

interface Props {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
  onClose: () => void;
}

const Registration = ({ onSwitchToLogin, onSuccess, onClose }: Props) => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors = {
      email: !form.email,
      name: !form.name,
      surname: !form.surname,
      password: !form.password,
      confirmPassword: form.password !== form.confirmPassword,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await registerUser({
      email: form.email,
      password: form.password,
      name: form.name,
      surname: form.surname,
    });

    onSuccess();
  };

  return (
    <div className="auth">
      <div className="auth__modal">
        <img
            className="auth__logo"
            src="/images/logo-black.png"
            alt="Логотип VK Маруся"
            width={157}
            height={35}
          />
        <button className="auth__button" onClick={onClose}>
          <svg
            className="auth__button-icon"
            aria-hidden="true"
            width={24}
            height={24}
          >
            <use xlinkHref="/images/sprite.svg#size-large"></use>
          </svg>
        </button>
        <h2 className="auth__title">Регистрация</h2>
        <div className="auth__wrapper">
          <div
            className={`custom__input ${
              errors.email ? "custom__input--error" : ""
            }`}
          >
            <svg
              className="custom__input-icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#mail"></use>
            </svg>
            <input
              className="custom__input-field"
              type="text"
              placeholder="Электронная почта"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div
            className={`custom__input ${
              errors.name ? "custom__input--error" : ""
            }`}
          >
            <svg
              className="custom__input-icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#filled-false"></use>
            </svg>
            <input
              className="custom__input-field"
              type="text"
              placeholder="Имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div
            className={`custom__input ${
              errors.surname ? "custom__input--error" : ""
            }`}
          >
            <svg
              className="custom__input-icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#filled-false"></use>
            </svg>
            <input
              className="custom__input-field"
              type="text"
              placeholder="Фамилия"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
            />
          </div>

          <div
            className={`custom__input ${
              errors.password ? "custom__input--error" : ""
            }`}
          >
            <svg
              className="custom__input-icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#key"></use>
            </svg>
            <input
              className="custom__input-field"
              type="password"
              placeholder="Пароль"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div
            className={`custom__input ${
              errors.confirmPassword ? "custom__input--error" : ""
            }`}
          >
            <svg
              className="custom__input-icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#key"></use>
            </svg>
            <input
              className="custom__input-field"
              type="password"
              placeholder="Подтвердите пароль"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>

        <button type="button" className="btn btn--auth" onClick={handleSubmit}>
          Создать аккаунт
        </button>
        <button
          type="button"
          className="btn__white"
          onClick={onSwitchToLogin}
        >
          У меня есть пароль
        </button>
      </div>
    </div>
  );
};

export default Registration;
