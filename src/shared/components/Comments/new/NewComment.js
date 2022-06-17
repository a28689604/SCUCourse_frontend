import { useContext, useEffect, useState } from "react";
import Add from "../../Icons/Add";
import Card from "../../UIElements/Card";

import CommentItem from "../CommentItem";
import CommentRating from "../CommentRating";
import CommentContent from "../CommentContent";
import Input from "../../FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";

import classes from "./NewComment.module.css";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import Loading from "../../UIElements/Loading";
import ErrorModal from "../../UIElements/ErrorModal";
import Modal from "../../UIElements/Modal";
import { useHistory } from "react-router-dom";

const difficultyStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "3rem",
    height: "3rem",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const NewComment = (props) => {
  const [addComment, setAddComment] = useState(false);
  const [thumb, setThumb] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notLogedinModal, setNotLogedinModal] = useState(false);

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      difficulty: {
        value: "",
        isValid: false,
      },
      courseName: {
        value: "",
        isValid: false,
      },
      comment: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //IMPORTANT GET SOME FETCH VALUE

  const addCommentHandler = () => {
    if (!auth.token) {
      setNotLogedinModal(true);
    }
    setAddComment(true);
  };

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const changeThumbHandler = () => {
    setThumb((prevState) => !prevState);
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await sendRequset(
        `http://127.0.0.1:5000/api/v1/courses/${formState.inputs.courseName.value.value}/reviews`,
        "POST",
        JSON.stringify({
          review: formState.inputs.comment.value,
          difficulty: formState.inputs.difficulty.value.value,
          recommend: thumb,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (res.status === "success") {
        setShowSuccessModal(true);
      }
    } catch (err) {}
    // console.log("thumb", thumb, formState.inputs);
  };

  const confirmSuccessHandler = () => {
    setShowSuccessModal(false);
    // history.go(0);
  };
  const confirmLoginHandler = () => {
    setNotLogedinModal(false);
    history.push("/auth");
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showSuccessModal}
        onCancel={confirmSuccessHandler}
        header="成功"
        footer={
          <>
            <button onClick={confirmSuccessHandler}>確定</button>
          </>
        }
      >
        成功發表評論!
      </Modal>
      <Modal
        show={notLogedinModal}
        onCancel={confirmLoginHandler}
        header=""
        footer={
          <>
            <button onClick={confirmLoginHandler}>確定</button>
          </>
        }
      >
        請先登入
      </Modal>
      {!addComment && (
        <Card className={classes["new-comment"]} onClick={addCommentHandler}>
          <div className={classes.paragraph}>留下你的評論</div>
          <Add />
        </Card>
      )}
      {addComment && isLoading && <Loading />}
      {addComment && !isLoading && (
        <form
          onClick={disableAddCommentHandler}
          onSubmit={commentSubmitHandler}
        >
          <CommentItem type="personal" newComment={true}>
            <CommentRating
              personalRating
              newComment={true}
              thumb={thumb}
              thumbOnClick={changeThumbHandler}
            >
              <Input
                onlyElement
                id="difficulty"
                element="select"
                errorText="請選擇一個難易度"
                options={props.difficultyData}
                onInput={inputHandler}
                placeholder={null}
                styles={difficultyStyles}
              />
            </CommentRating>
            <CommentContent newComment={true}>
              <Input
                onlyElement
                id="courseName"
                element="select"
                errorText="請選擇一項課程"
                placeholder={"選擇一項課程..."}
                options={props.courseNameData}
                onInput={inputHandler}
              />
              <Input
                onlyElement
                id="comment"
                element="textarea"
                errorText="請輸入評論"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(5)]}
              />
            </CommentContent>
            <button type="submit" disabled={!formState.isValid} />
          </CommentItem>
        </form>
      )}
    </>
  );
};

export default NewComment;
