import style from "./autification.module.scss";
import allstyle from "../allstyle.module.scss";
import image from "./img/mainimg.svg";
import lock from "./img/lock.svg";
import fb from "./img/fb.svg";
import google from "./img/google.svg";
import yandex from "./img/ya.svg";

export default function Autification() {
  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.auth}>
          <h2 className={`${allstyle.title} ${style.authtitle}`}>
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h2>
          <div className={style.blockform}>
            <form action="" className={style.authform}>
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
              <label htmlFor="login" className={style.authlabel}>
                Логин или номер телефона:
              </label>
              <input type="text" id="login" className={style.authinput} />
              <label htmlFor="password" className={style.authlabel}>
                Пароль:
              </label>
              <input
                type="password"
                id="password"
                className={style.authinput}
              />
              <button className={`${allstyle.button} ${style.authbutton}`}>
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
}
