import React, { useState } from "react";
import "./Login.css";
import "../../App.css";
import Avatar from "../../images/user.png";
import PlineTools, { TypeMessage } from "../services/PlineTools";

interface LoginProps {
  LoginAction: Function;
}

function Login(props: LoginProps) {

  const [state] = useState({
    username: "",
    password: "",
    RememberMe: false,
  });

  const Login = (e: any) => {
    e.preventDefault();
    PlineTools.postRequest("/users/login", state).then((result) => {
      if (result.data.hasError == false) {
        // PlineTools.dialogMessage("Login Successfully");
        props.LoginAction(result.data);
      } else {
        result.data.messages.forEach((v: string) => {
          PlineTools.dialogMessage(v, "Error", TypeMessage.ERROR);
        });
      }
    });
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
              <input type="input" className="form__field"
                autoComplete="off"
                defaultValue={state.password}
                onChange={(e) => {
                  state.password = e.target.value;
                }}
                placeholder="Password" name="password" id='password' required />
              <label htmlFor="password" className="form__label">Password</label>
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
