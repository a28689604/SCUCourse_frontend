import { useEffect, useState } from "react";

import CommentItem from "../CommentItem";
import CommentRating from "../CommentRating";
import CommentContent from "../CommentContent";
import Input from "../../FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";
import Modal from "../../UIElements/Modal";

const DUMMY_PERSONAL_COMMENT = {
  id: "p1",
  courseName: { value: "vanilla", label: "Vanilla" },
  recommend: true,
  difficulty: { value: 3, label: 3 },
  content:
    "基本上很看出席，因為他課堂上也是會有些作業，出席的人才會知道，然後每節都有分組或個人作業，如果沒有疫情要跑去桃銘參觀，怕麻煩或對美術沒興趣的人不要來",
};

const UpdateComment = (props) => {
  const [thumb, setThumb] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const data = DUMMY_PERSONAL_COMMENT;

  useEffect(() => {
    setFormData(
      {
        difficulty: {
          value: data.difficulty,
          isValid: true,
        },
        courseName: {
          value: data.courseName,
          isValid: true,
        },
        comment: {
          value: data.content,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, data]);

  console.log(formState.inputs);

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const changeThumbHandler = () => {
    setThumb((prevState) => !prevState);
  };

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    console.log("thumb", thumb, formState.inputs);
  };

  const commentUpdateHandler = (event) => {
    event.preventDefault();
    console.log("thumb", thumb, formState.inputs);
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

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
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
      <form onClick={disableAddCommentHandler} onSubmit={commentUpdateHandler}>
        <CommentItem type="teacher" newComment={true}>
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
    </>
  );
};

export default UpdateComment;
