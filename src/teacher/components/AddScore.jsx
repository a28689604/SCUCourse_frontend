import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import classes from "./AddScore.module.css";

const AddScore = props => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notLoggedInModal, setNotLoggedInModal] = useState(false);
  const history = useHistory();

  const { token, userId } = useContext(AuthContext);
  const { error, sendRequset, clearError } = useHttpClient();

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
    if (!token) setNotLoggedInModal(true);
  }, [token]);

  const confirmLoginHandler = () => {
    setNotLoggedInModal(false);
    history.push("/auth");
  };

  const scoreSubmitHandler = async event => {
    event.preventDefault();

    try {
      const res = await sendRequset(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${props.course.id}`,
        "PATCH",
        JSON.stringify({
          zero: formState.inputs.zero.value,
          fifty: formState.inputs.fifty.value,
          sixty: formState.inputs.sixty.value,
          sixtyFive: formState.inputs.sixtyFive.value,
          seventy: formState.inputs.seventy.value,
          seventyFive: formState.inputs.seventyFive.value,
          eighty: formState.inputs.eighty.value,
          eightyFive: formState.inputs.eightyFive.value,
          ninety: formState.inputs.ninety.value,
          ninetyFive: formState.inputs.ninetyFive.value,
          scoreAverage: formState.inputs.scoreAverage.value,
          finalStudentNumber: formState.inputs.finalStudentNumber.value,
          scoreUploadBy: userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      if (res.status === "success") {
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const confirmSuccessHandler = () => {
    setShowSuccessModal(false);
    history.go(0);
  };
  return (
    <>
      <Backdrop onClick={props.onCancel} />
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
        show={notLoggedInModal}
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

      {!notLoggedInModal && !showSuccessModal && (
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
          <Input
            id="scoreAverage"
            type="number"
            element="input"
            label="平均分數"
            errorText="請輸入數字"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(2)]}
            LabelStyle="addClassInput"
          />
          <Input
            id="finalStudentNumber"
            type="number"
            element="input"
            label="修課人數"
            errorText="請輸入數字"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            LabelStyle="addClassInput"
          />
          <Button type="submit" disabled={!formState.isValid}>
            上傳
          </Button>
        </form>
      )}
    </>
  );
};

export default AddScore;
