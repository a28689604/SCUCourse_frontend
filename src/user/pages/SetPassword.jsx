import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import classes from "./Auth.module.css";

const SetPassword = () => {
  const auth = useContext(AuthContext);
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

  useEffect(() => {
    //設定網頁title
    document.title = "設定密碼";
  });

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await sendRequset(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/setPassword/${setPasswordToken}`,
        "PATCH",
        JSON.stringify({
          password: formState.inputs.password.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
        }),
        {
          "Content-Type": "application/json",
          credentials: "include",
        },
      );
      auth.login(res.data.user._id, res.token);
      if (res.status === "success") {
        history.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
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

export default SetPassword;
