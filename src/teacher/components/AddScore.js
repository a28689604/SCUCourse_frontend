import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import classes from "./AddScore.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";

const AddScore = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notLogedinModal, setNotLogedinModal] = useState(false);
  const history = useHistory();

  const { token } = useContext(AuthContext);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      zero: {
        value: "",
        isValid: false,
      },
      fifty: {
        value: "",
        isValid: false,
      },
      sixty: {
        value: "",
        isValid: false,
      },
      sixtyFive: {
        value: "",
        isValid: false,
      },
      seventy: {
        value: "",
        isValid: false,
      },
      seventyFive: {
        value: "",
        isValid: false,
      },
      eighty: {
        value: "",
        isValid: false,
      },
      eightyFive: {
        value: "",
        isValid: false,
      },
      ninety: {
        value: "",
        isValid: false,
      },
      ninetyFive: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    if (!token) setNotLogedinModal(true);
  }, [token]);
  // useEffect(()=>{},)
  const confirmLoginHandler = () => {
    setNotLogedinModal(false);
    history.push("/auth");
  };

  const scoreSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // const res = await sendRequset(
      //   `${process.env.REACT_APP_BACKEND_URL}/courses/${formState.inputs.courseName.value.value}/reviews`,
      //   "POST",
      //   JSON.stringify({
      //     review: formState.inputs.comment.value,
      //     difficulty: formState.inputs.difficulty.value.value,
      //     // recommend: thumb,
      //   }),
      //   {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + token,
      //   }
      // );
      console.log(formState.inputs);
      // if (res.status === "success") {
      //   setShowSuccessModal(true);
      // }
    } catch (err) {}
  };
  const confirmSuccessHandler = () => {
    setShowSuccessModal(false);
    history.go(0);
  };
  console.log(props.course);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        成功上傳分數
      </Modal>
      <Modal
        style={{ width: "15rem" }}
        show={notLogedinModal}
        onCancel={confirmLoginHandler}
        footer={
          <>
            <Button onClick={confirmLoginHandler} variant="contained">
              確定
            </Button>
          </>
        }
      >
        <h3 className={classes.text}>請先登入</h3>
      </Modal>
      <Backdrop onClick={props.onCancel} />
      <form className={classes.form} onSubmit={scoreSubmitHandler}>
        <div className={classes.courseInfo}>
          <h3>{`${props.course["syear"]}學年 第${props.course["smester"]}學期`}</h3>
          <h4>{props.course["courseName"].trim()}</h4>
        </div>

        <Input
          id="zero"
          type="number"
          element="input"
          label="0~49"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="fifty"
          type="number"
          element="input"
          label="50~59"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="sixty"
          type="number"
          element="input"
          label="60~64"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="sixtyFive"
          type="number"
          element="input"
          label="65~69"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="seventy"
          type="number"
          element="input"
          label="70~74"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="seventyFive"
          type="number"
          element="input"
          label="75~79"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="eighty"
          type="number"
          element="input"
          label="80~84"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="eightyFive"
          type="number"
          element="input"
          label="85~89"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="ninety"
          type="number"
          element="input"
          label="90~94"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Input
          id="ninetyFive"
          type="number"
          element="input"
          label="95~100"
          errorText="請輸入數字"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(1)]}
          LabelStyle="addClassInput"
        />
        <Button type="submit" disabled={!formState.isValid}>
          上傳
        </Button>
      </form>
    </>
  );
};

export default AddScore;
