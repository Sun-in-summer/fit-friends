function SignInScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <img className="background-logo__logo" width="750" height="284" aria-hidden="true" srcSet='img/sprite/logo-big.svg'>

          </img>
          <img className="background-logo__icon" width="343" height="343" aria-hidden="true" srcSet='img/sprite/icon-logotype.svg'>
          </img>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email"/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input type="password" name="password"/>
                        </span>
                      </label>
                    </div>
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default SignInScreen;
