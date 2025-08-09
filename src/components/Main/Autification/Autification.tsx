import style from "./autification.module.scss";
import allstyle from "../allstyle.module.scss";
import image from "./img/mainimg.svg";
import lock from "./img/lock.svg";
import fb from "./img/fb.svg";
import google from "./img/google.svg";
import yandex from "./img/ya.svg";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAutificationProps {
  redirectBack?: string;
}

interface IAuthRes {
  message: string;
  accessToken: string;
  expire: string;
}

const Autification: React.FC<IAutificationProps> = () => {
  const { isAuth, setIsAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWrong, setUsernameWrong] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
	  }
	  console.log(isAuth)
  }, [isAuth, navigate]);

  const handleGetLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            login: username,
            password: password,
          }),
        }
      );

		const data: IAuthRes = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenExpire", data.expire);
        setIsAuth(true);
        navigate("/");
      } else {
        throw new Error(data.message || "Ошибка при входе");
      }
    } catch (error) {
		console.error("Ошибка аутентификации:", error);
		
      setUsernameWrong(true);
      setPasswordWrong(true);
	  }
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameWrong(false);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setUsernameWrong(false);
  };

  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.auth}>
          <h2 className={`${allstyle.title} ${style.authtitle}`}>
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h2>
          <div className={style.blockform}>
            <form onSubmit={handleGetLogin} className={style.authform}>
              <div className={style.formdecor}>
                <img src={lock} alt="замок" />
              </div>
              <div className={style.links}>
                <a href="#" className={style.authlink}>
                  Войти
                </a>
                <a href="#" className={style.reglink}>
                  Зарегистрироваться
                </a>
              </div>
              <label htmlFor="username" className={style.authlabel}>
                Логин или номер телефона:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className={style.authinput}
                onChange={handleChangeUsername}
                required
                style={{ borderColor: usernameWrong ? "#FF5959" : "" }}
              />
              <div
                className={style.wrong}
                style={{ display: usernameWrong ? "block" : "none" }}
              >
                Введите корректные данные
              </div>
              <label htmlFor="password" className={style.authlabel}>
                Пароль:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                autoComplete="current-password"
                required
                style={{ borderColor: passwordWrong ? "#FF5959" : "" }}
                className={style.authinput}
              />
              <div
                className={style.wrong}
                style={{ display: passwordWrong ? "block" : "none" }}
              >
                Неправильный пароль
              </div>
              <button
                type="submit"
                disabled={!username || !password}
                className={`${allstyle.button} ${style.authbutton}`}
				style={{opacity: !username || !password ? "0.5" : "1"}}
              >
                Войти
              </button>
              <a href="#" className={style.passwordrestore}>
                Восстановить пароль
              </a>
              <div className={style.social}>
                <div className={style.socialtext}>Войти через:</div>
                <div className={style.socialitems}>
                  <button className={style.socialitem}>
                    <img src={google} alt="Google" />
                  </button>
                  <button className={style.socialitem}>
                    <img src={fb} alt="Facebook" />
                  </button>
                  <button className={style.socialitem}>
                    <img src={yandex} alt="Яндекс" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className={style.authimage}>
            <img src={image} alt="два человечка несут большой ключ" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Autification;
