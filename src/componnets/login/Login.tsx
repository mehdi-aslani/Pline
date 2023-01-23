import "./Login.css";
import "../../App.css";
import Avatar from "../../images/user.png";
import PlineTools, { TypeMessage } from "../services/PlineTools";
import React, { useCallback, useState } from 'react';
import Captcha from 'react-captcha-code';
interface LoginProps {
  LoginAction: Function;
}

function Login(props: LoginProps) {

  const handleChange = useCallback((captcha: any) => {
    setCapth({ ...captcha, image: captcha })
  }, []);

  const [state] = useState({
    username: "",
    password: "",
    RememberMe: false,
  });
  const [captcha, setCapth] = useState({
    input: "",
    image: ""
  });

  const Login = (e: any) => {
    e.preventDefault();
    if (captcha.image === captcha.input) {
      PlineTools.postRequest("/users/login", state).then((result) => {
        if (result.data.hasError === false) {
          // PlineTools.dialogMessage("Login Successfully");
          props.LoginAction(result.data);
        } else {
          result.data.messages.forEach((v: string) => {
            PlineTools.dialogMessage(v, "Error", TypeMessage.ERROR);
          });
        }
      });
    } else {

      PlineTools.dialogMessage('Wrong Captcha ,Try Again...', 'Captcha Error')
    }
  };

  return (
    <>
      <div className="login my-center">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src={Avatar}
            alt="Avatar"
          />
          <p id="profile-name" className="profile-name-card"></p>
          <form onSubmit={Login} className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <div className="form__group field">
              <input type="input" className="form__field"
                defaultValue={state.username}
                autoComplete="off"
                onChange={(e) => {
                  state.username = e.target.value;
                }}
                placeholder="userName" name="name" id='name' required />
              <label htmlFor="name" className="form__label">UserName</label>
            </div>
            <br />
            {/* password */}
            <div className="form__group field">
              <input style={{ width: "280px", textAlign: "left" }} className="form__field"
                autoComplete="off"
                type="password"
                defaultValue={state.password}
                onChange={(e) => {
                  state.password = e.target.value;
                }}
                placeholder="Password" name="password" id='password' required />
              <label htmlFor="password" className="form__label">Password</label>
            </div>
            <div className="form__group field">
              <Captcha height={60} bgColor="#133913" width={280} fontSize={30} charNum={6} onChange={handleChange} />
            </div>
            <div className="form__group field">
              <input autoCapitalize="false" className="form__field"
                name="captcha" id='captcha' placeholder="Captcha" required
                onChange={(e) => {
                  setCapth({ ...captcha, input: e.target.value });
                }} />
              <label className="form__label">Captcha</label>
            </div>
            {/* Remember */}

            <button className="btn btn-login " type="submit">
              Login
            </button>
          </form>
          {/* <a href="#" className="forgot-password">
            Forgot the password?
          </a> */}
        </div>
      </div>
    </>
  );
}

export default Login;
