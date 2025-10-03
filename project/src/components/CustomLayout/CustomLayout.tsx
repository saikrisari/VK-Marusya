import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setModal } from "../../store/slices/modalSlice";
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import Search from "../Search/Search";
import "../../styles/scss/style.scss";

const CustomLayout = () => {
  const user = useAppSelector((state) => state.user);
  const modal = useAppSelector((state) => state.modal.modal);
  const dispatch = useAppDispatch();

  const [activeButton, setActiveButton] = useState<
    "home" | "genres" | "account" | null
  >("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAccountClick = () => {
    if (!user.isAuthenticated) {
      dispatch(setModal("auth"));
    } else {
      setActiveButton("account");
      navigate("/account");
    }
  };

  useEffect(() => {
    if (location.pathname === "/") setActiveButton("home");
    else if (location.pathname.startsWith("/genres")) setActiveButton("genres");
    else if (location.pathname.startsWith("/account"))
      setActiveButton("account");
    else setActiveButton(null);
  }, [location.pathname]);

  return (
    <div className="layout">
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="/images/logo-white.png"
            alt="Логотип VK Маруся"
            width={143}
            height={32}
          />
        </Link>
        <div className="header__block">
          <div className="header__wrapper">
            <Link
              to={"/"}
              className={`header__button header__button--main ${
                activeButton === "home" ? "header__button--active" : ""
              }`}
              onClick={() => {
                setActiveButton("home");
              }}
            >
              <span className="header__span">Главная</span>
            </Link>

            <Link
              to={"/genres"}
              className={`header__button ${
                activeButton === "genres" ? "header__button--active" : ""
              }`}
              onClick={() => {
                setActiveButton("genres");
              }}
            >
              <span className="header__span">Жанры</span>
              <svg className="header__icon" width={24} height={24}>
                <use xlinkHref="/images/sprite.svg#genres" />
              </svg>
            </Link>

            {!isMobile && <Search />}

            {isMobile && (
              <button
                className="header__button header__button--mobile-search"
                onClick={() => setSearchOpen(true)}
              >
                <svg className="header__icon" width={24} height={24}>
                  <use xlinkHref="/images/sprite.svg#search-filled" />
                </svg>
              </button>
            )}
          </div>

          <button
            className={`header__button ${
              activeButton === "account" ? "header__button--active" : ""
            }`}
            onClick={handleAccountClick}
          >
            <span className="header__span">
              {user.isAuthenticated ? user.name : "Войти"}
            </span>
            <svg className="header__icon" width={24} height={24}>
              <use xlinkHref="/images/sprite.svg#filled-false" />
            </svg>
          </button>
        </div>
      </div>
      {isMobile && searchOpen && (
        <Search isOpen onClose={() => setSearchOpen(false)} />
      )}

      <div className="content">
        <Outlet />
      </div>

      <div className="footer">
        <div className="footer__socials">
          <a href="#" className="footer__socials-item">
            <svg className="footer__socials-icon" width={36} height={36}>
              <use xlinkHref="/images/sprite.svg#vk" />
            </svg>
          </a>
          <a href="#" className="footer__socials-item">
            <svg className="footer__socials-icon" width={36} height={36}>
              <use xlinkHref="/images/sprite.svg#youtube" />
            </svg>
          </a>
          <a href="#" className="footer__socials-item">
            <svg className="footer__socials-icon" width={36} height={36}>
              <use xlinkHref="/images/sprite.svg#ok" />
            </svg>
          </a>
          <a href="https://t.me/saikrisari" className="footer__socials-item">
            <svg className="footer__socials-icon" width={36} height={36}>
              <use xlinkHref="/images/sprite.svg#telegram" />
            </svg>
          </a>
        </div>
      </div>

      {modal === "auth" && (
        <Auth
          onSwitchToRegistration={() => dispatch(setModal("register"))}
          onClose={() => dispatch(setModal(null))}
        />
      )}
      {modal === "register" && (
        <Registration
          onSwitchToLogin={() => dispatch(setModal("auth"))}
          onSuccess={() => dispatch(setModal("success"))}
          onClose={() => dispatch(setModal(null))}
        />
      )}
      {modal === "success" && (
        <RegistrationSuccess
          onLogin={() => dispatch(setModal("auth"))}
          onClose={() => dispatch(setModal(null))}
        />
      )}
    </div>
  );
};

export default CustomLayout;
