import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import classes from "./Auth.module.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const history = useHistory();

  useEffect(() => {
    // 設定網頁標題
    document.title = isLoginMode ? "登入 - SCU Course" : "註冊 - SCU Course";
  }, [isLoginMode]);

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

    setIsLoginMode(prevState => !prevState);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const res = await sendRequset(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
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
      } catch (err) {
        console.error("Login error:", err);
      }
    } else {
      try {
        const res = await sendRequset(
          `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
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
      } catch (err) {
        console.error("Signup error:", err);
      }
    }
  };

  const cancelSendHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmSendHandler = async () => {
    try {
      setShowConfirmModal(false);
      const res = await sendRequset(
        `${import.meta.env.VITE_BACKEND_URL}/users/reSendEmail`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        { "Content-Type": "application/json" }
      );
      if (res.status === "success") {
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Resend email error:", err);
    }
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
          <div className={classes.modalFooter}>
            <Button onClick={cancelSendHandler} inverse>
              取消
            </Button>
            <Button onClick={confirmSendHandler} danger>
              重新發送
            </Button>
          </div>
        }
      >
        <div className={classes.modalContent}>
          <div className={classes.modalIcon}>⚠️</div>
          <p>此信箱已被註冊但未被啟用，是否重新發送確認信？</p>
        </div>
      </Modal>
      <Modal
        show={showSuccessModal}
        onCancel={confirmSuccessHandler}
        header="註冊成功"
        footer={
          <div className={classes.modalFooter}>
            <Button onClick={confirmSuccessHandler}>確定</Button>
          </div>
        }
      >
        <div className={classes.modalContent}>
          <div className={classes.modalIcon}>✅</div>
          <p>成功發送確認信！請在30分鐘內進行驗證。</p>
        </div>
      </Modal>

      <div className={classes.authLayout}>
        <div className={classes.background}>
          <div className={classes.backgroundShape1}></div>
          <div className={classes.backgroundShape2}></div>
          <div className={classes.backgroundShape3}></div>
        </div>

        {isLoading && <Loading overlay />}

        <div className={classes.authContainer}>
          <div className={classes.authHeader}>
            <div className={classes.logo}>
              <div className={classes.logoIcon}>🎓</div>
              <h1 className={classes.logoText}>SCU Course</h1>
            </div>
            <p className={classes.subtitle}>
              {isLoginMode ? "歡迎回來！請登入您的帳戶" : "建立新帳戶開始使用"}
            </p>
          </div>

          <Card className={classes.authCard}>
            <div className={classes.cardHeader}>
              <h2 className={classes.title}>{isLoginMode ? "登入" : "註冊"}</h2>
              <div className={classes.modeIndicator}>
                <div
                  className={`${classes.indicator} ${isLoginMode ? classes.active : ""}`}
                >
                  登入
                </div>
                <div
                  className={`${classes.indicator} ${!isLoginMode ? classes.active : ""}`}
                >
                  註冊
                </div>
              </div>
            </div>

            <form onSubmit={authSubmitHandler} className={classes.authForm}>
              <div className={classes.inputGroup}>
                <Input
                  id="email"
                  element="input"
                  type="email"
                  label="電子郵件"
                  placeholder="請輸入您的東吳校內信箱"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="請輸入有效的email，僅允許使用東吳校內信箱"
                  onInput={inputHandler}
                />
              </div>

              {isLoginMode && (
                <div className={classes.inputGroup}>
                  <Input
                    id="password"
                    element="input"
                    type="password"
                    label="密碼"
                    placeholder="請輸入您的密碼"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="請輸入至少8個字元"
                    onInput={inputHandler}
                  />
                </div>
              )}

              <div className={classes.formActions}>
                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  size="large"
                  className={classes.primaryButton}
                >
                  {isLoginMode ? "登入" : "註冊"}
                </Button>

                <div className={classes.divider}>
                  <span>或</span>
                </div>

                <Button
                  type="button"
                  onClick={switchModeHandler}
                  inverse
                  size="large"
                  className={classes.secondaryButton}
                >
                  {isLoginMode ? "建立新帳戶" : "已有帳戶？登入"}
                </Button>
              </div>
            </form>

            <div className={classes.authFooter}>
              <p className={classes.footerText}>
                使用 SCU Course 即表示您同意我們的
                <button type="button" className={classes.link}>
                  服務條款
                </button>
                和
                <button type="button" className={classes.link}>
                  隱私政策
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
