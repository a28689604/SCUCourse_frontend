import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./Auth.module.css";
import Button from "../../shared/components/FormElements/Button";

const SetPasssword = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler] = useForm({
    password: {
      value: "",
      isValid: false,
    },
    passwordConfirm: {
      value: "",
      isValid: false,
    },
  });

  const setPasswordToken = useParams().setPasswordToken;

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await sendRequset(
        `https://scucourse.herokuapp.com/api/v1/users/setPassword/${setPasswordToken}`,
        "PATCH",
        JSON.stringify({
          password: formState.inputs.password.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
        }),
        {
          "Content-Type": "application/json",
          credentials: "include",
        }
      );
      auth.login(res.data.user._id, res.token);
      if (res.status === "success") {
        history.replace("/");
      }
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.authLayout}>
        {isLoading && <Loading overlay />}
        <Card>
          <h2>設定密碼</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            <Input
              id="password"
              element="input"
              type="password"
              label="密碼"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="請輸入至少8個字元"
              onInput={inputHandler}
            />
            <Input
              id="passwordConfirm"
              element="input"
              type="password"
              label="確認密碼"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="請輸入至少8個字元"
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              註冊
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SetPasssword;
