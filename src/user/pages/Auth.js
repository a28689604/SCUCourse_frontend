import { useContext, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./Auth.module.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData({ ...formState.inputs, password: undefined }, true);
    }

    setIsLoginMode((prevState) => !prevState);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const res = await sendRequset(
          "http://127.0.0.1:5000/api/v1/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(res.data.user);
        auth.login(res.data.user._id);
      } catch (err) {}
    } else {
      try {
        sendRequset(
          "http://127.0.0.1:5000/api/v1/users/signup",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login();
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.authLayout}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Card>
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            <Input
              id="email"
              element="input"
              type="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="請輸入有效的email"
              onInput={inputHandler}
            />
            {isLoginMode && (
              <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="請輸入至少5個字元"
                onInput={inputHandler}
              />
            )}

            <button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          <button onClick={switchModeHandler}>
            切換至{isLoginMode ? "註冊" : "登入"}
          </button>
        </Card>
      </div>
    </>
  );
};

export default Auth;
