import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../../util/validators";
import Button from "../../FormElements/Button";
import Input from "../../FormElements/Input";
import ErrorModal from "../../UIElements/ErrorModal";
import Loading from "../../UIElements/Loading";
import Modal from "../../UIElements/Modal";
import CommentContent from "../CommentContent";
import CommentItem from "../CommentItem";
import CommentRating from "../CommentRating";
import classes from "./UpdateComment.module.css";

const UpdateComment = props => {
  const [thumb, setThumb] = useState(true);
  const [userDataIsLoading, setuserDataIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);

  const history = useHistory();

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
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

  const data = props.userComment;

  useEffect(() => {
    setFormData(
      {
        difficulty: {
          value: { value: data.difficulty, label: data.difficulty },
          isValid: true,
        },
        courseName: {
          value: {
            value: data.course.id,
            label: `${data.course.syear}學年 第${data.course.smester}學期 ${data.course.department} ${data.course.courseName}`,
          },
          isValid: true,
        },
        comment: {
          value: data.review,
          isValid: true,
        },
      },
      true
    );
    setThumb(data.recommend);
    setuserDataIsLoading(false);
  }, [setFormData, data]);

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const changeThumbHandler = () => {
    setThumb(prevState => !prevState);
  };

  const commentUpdateHandler = async event => {
    event.preventDefault();
    try {
      const res = await sendRequset(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${data._id}`,
        "PATCH",
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
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    console.log("DELETE!");
    try {
      const res = await sendRequset(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${data._id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      if (res === 204) {
        setShowConfirmModal(false);
        setShowSuccessDeleteModal(true);
      }
    } catch (err) {}
  };

  const confirmSuccessHandler = () => {
    setShowSuccessModal(false);
    // history.go(0);
  };
  const confirmSuccessDeleteHandler = () => {
    setShowSuccessDeleteModal(false);
    history.go(0);
  };
  if (userDataIsLoading) {
    return <Loading />;
  }

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
        <p>已成功更新評論</p>
      </Modal>
      <Modal
        show={showSuccessDeleteModal}
        onCancel={confirmSuccessDeleteHandler}
        header="成功"
        footer={
          <>
            <Button onClick={confirmSuccessDeleteHandler}>確定</Button>
          </>
        }
      >
        <p>已成功刪除評論</p>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="刪除評論"
        footer={
          <>
            <Button onClick={cancelDeleteHandler}>取消</Button>
            <Button onClick={confirmDeleteHandler} danger>
              刪除
            </Button>
          </>
        }
      >
        <p>確定刪除評論?</p>
      </Modal>
      {isLoading && <Loading />}
      {!isLoading && !userDataIsLoading && (
        <form
          onClick={disableAddCommentHandler}
          onSubmit={commentUpdateHandler}
        >
          <CommentItem type="personal" newComment={true}>
            <CommentRating
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
                defaultValue={formState.inputs.difficulty.value}
                initialValid={formState.inputs.difficulty.isValid}
              />
            </CommentRating>
            <CommentContent newComment={true}>
              <Input
                onlyElement
                id="courseName"
                element="select"
                errorText="請選擇一項課程"
                options={props.courseNameData}
                onInput={inputHandler}
                defaultValue={formState.inputs.courseName.value}
                initialValid={formState.inputs.courseName.isValid}
              />
              <Input
                onlyElement
                id="comment"
                element="textarea"
                errorText="請輸入至少5個字"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(5)]}
                initialValue={formState.inputs.comment.value}
                initialValid={formState.inputs.comment.isValid}
              />
            </CommentContent>
            <div className={classes.button}>
              <Button type="submit" disabled={!formState.isValid}>
                提交
              </Button>
              <Button type="button" danger onClick={showDeleteWarningHandler}>
                刪除
              </Button>
            </div>
          </CommentItem>
        </form>
      )}
    </>
  );
};

export default UpdateComment;
