import "../../styles/scss/blocks/_auth.scss";

interface Props {
  onLogin: () => void;
  onClose: () => void;
}

const RegistrationSuccess = ({ onLogin, onClose }: Props) => {
  return (
    <div className="auth">
      <div className="auth__modal">
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
        <img
          className="auth__logo"
          src="/images/logo-black.png"
          alt="Логотип VK Маруся"
          width={157}
          height={35}
        />
        <p className="auth__title">Регистрация завершена</p>
        <p className="auth__text">
          Используйте вашу электронную почту для входа
        </p>
        <button
          type="button"
          className="btn btn--no-margin"
          onClick={onLogin}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
