import { useContext, useEffect, useState } from "react";

import CommentItem from "../CommentItem";
import CommentRating from "../CommentRating";
import CommentContent from "../CommentContent";
import Input from "../../FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";

import Modal from "../../UIElements/Modal";
import Loading from "../../UIElements/Loading";
import ErrorModal from "../../UIElements/ErrorModal";

const UpdateComment = (props) => {
  const [thumb, setThumb] = useState(true);
  const [userDataIsLoading, setuserDataIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    setThumb((prevState) => !prevState);
  };

  const commentUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await sendRequset(
        `http://127.0.0.1:5000/api/v1/reviews/${data._id}`,
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
      console.log(res);
    } catch (err) {}
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETE!");
  };

  const confirmSuccessHandler = () => {
    setShowSuccessModal(false);
    // history.go(0);
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
            <button onClick={confirmSuccessHandler}>確定</button>
          </>
        }
      >
        <p>已成功更新評論</p>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="刪除評論"
        footer={
          <>
            <button onClick={cancelDeleteHandler}>取消</button>
            <button onClick={confirmDeleteHandler}>刪除</button>
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
                errorText="請輸入評論"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(5)]}
                initialValue={formState.inputs.comment.value}
                initialValid={formState.inputs.comment.isValid}
              />
            </CommentContent>
            <div>
              <button onClick={showDeleteWarningHandler}>刪除</button>
              <button type="submit" disabled={!formState.isValid}>
                提交
              </button>
            </div>
          </CommentItem>
        </form>
      )}
    </>
  );
};

export default UpdateComment;
