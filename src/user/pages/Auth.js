import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./Auth.module.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const history = useHistory();

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
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
            credentials: "include",
          }
        );
        auth.login(res.data.user._id, res.token);
        if (res.status === "success") {
          history.goBack();
        }
      } catch (err) {}
    } else {
      try {
        const res = await sendRequset(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
          }),
          { "Content-Type": "application/json" }
        );
        if (res === 202) {
          setShowConfirmModal(true);
        }
        if (res.status === "success") {
          setShowSuccessModal(true);
        }
      } catch (err) {}
    }
  };

  const cancelSendHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmSendHandler = async () => {
    try {
      setShowConfirmModal(false);
      const res = await sendRequset(
        `${process.env.REACT_APP_BACKEND_URL}/users/reSendEmail`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        { "Content-Type": "application/json" }
      );
      if (res.status === "success") {
        setShowSuccessModal(true);
      }
    } catch (err) {}
  };

  const confirmSuccessHandler = () => {
    history.goBack();
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelSendHandler}
        header="信箱已註冊"
        footer={
          <>
            <Button onClick={cancelSendHandler}>取消</Button>
            <Button onClick={confirmSendHandler} danger>
              確定
            </Button>
          </>
        }
      >
        <p>此信箱已被註冊但未被啟用，是否重新發送確認信?</p>
      </Modal>
      <Modal
        show={showSuccessModal}
        onCancel={confirmSuccessHandler}
        header="成功"
        footer={
          <>
            <Button onClick={confirmSuccessHandler}>確定</Button>
          </>
        }
      >
        <p>成功發送確認信!</p>
      </Modal>
      <div className={classes.authLayout}>
        {isLoading && <Loading overlay />}
        <Card>
          <h2>登入</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            <Input
              id="email"
              element="input"
              type="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="請輸入有效的email，僅允許使用東吳校內信箱"
              onInput={inputHandler}
            />
            {isLoginMode && (
              <Input
                id="password"
                element="input"
                type="password"
                label="密碼"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="請輸入至少8個字元"
                onInput={inputHandler}
              />
            )}
            <div className={classes.buttons}>
              <div className={classes.login}>
                <Button type="submit" disabled={!formState.isValid}>
                  {isLoginMode ? "登入" : "註冊"}
                </Button>
              </div>
              <div className={classes.switch}>
                <Button type="button" onClick={switchModeHandler}>
                  {isLoginMode ? "沒有帳號? 現在註冊" : "已有帳號? 現在登入"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Auth;
