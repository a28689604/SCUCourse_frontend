import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../FormElements/Button";
import DownVote from "../Icons/DownVote";
import UpVote from "../Icons/UpVote";
import ErrorModal from "../UIElements/ErrorModal";
import Modal from "../UIElements/Modal";

import classes from "./CommentOption.module.css";

const CommentOption = (props) => {
  const [upVoted, setUpVoted] = useState();
  const [downVoted, setDownVoted] = useState();
  const [ups, setUps] = useState();
  const [downs, setDowns] = useState();
  const [notLogedinModal, setNotLogedinModal] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const history = useHistory();

  const { token } = auth;
  const { userVotes, id, upVotes, downVotes } = props;

  useEffect(() => {
    if (userVotes !== undefined && userVotes === true) {
      setUpVoted(true);
    } else if (userVotes !== undefined && userVotes === false) {
      setDownVoted(true);
    }
    setUps(upVotes);
    setDowns(downVotes);
  }, [userVotes, setUps, setDowns, upVotes, downVotes]);

  // IMPORTANT too cumbersome, need refactor
  const upVotedHandler = () => {
    if (!auth.token) {
      return setNotLogedinModal(true);
    }
    if (upVoted === true) {
      setUpVoted(false);
      setUps((prev) => prev - 1);
    } else if ((upVoted === false && downVoted === true) || (upVoted === undefined && downVoted === true)) {
      setUpVoted(true);
      setUps((prev) => prev + 1);
      setDownVoted(undefined);
      setDowns((prev) => prev - 1);
    } else if ((upVoted === false && downVoted === undefined) || (upVoted === undefined && downVoted === false)) {
      setUpVoted(true);
      setUps((prev) => prev + 1);
      setDownVoted(undefined);
    } else if (upVoted === undefined && downVoted === undefined) {
      setUpVoted(true);
      setUps((prev) => prev + 1);
    }
    setIsChanged(true);
  };

  const downVotedHandler = () => {
    if (!auth.token) {
      return setNotLogedinModal(true);
    }

    if (downVoted === true) {
      setDownVoted(false);
      setDowns((prev) => prev - 1);
    } else if ((downVoted === false && upVoted === true) || (downVoted === undefined && upVoted === true)) {
      setDownVoted(true);
      setDowns((prev) => prev + 1);
      setUpVoted(undefined);
      setUps((prev) => prev - 1);
    } else if ((downVoted === false && upVoted === undefined) || (downVoted === undefined && upVoted === false)) {
      setDownVoted(true);
      setDowns((prev) => prev + 1);
      setUpVoted(undefined);
    } else if (downVoted === undefined && upVoted === undefined) {
      setDownVoted(true);
      setDowns((prev) => prev + 1);
    }
    setIsChanged(true);
  };

  useEffect(() => {
    const fetchUpVote = async () => {
      if (upVoted !== undefined && isChanged === true) {
        try {
          await sendRequset(`${process.env.REACT_APP_BACKEND_URL}/reviews/${id}/upvote/${upVoted}`, "PATCH", null, {
            Authorization: "Bearer " + token,
          });
        } catch (err) {}
      }
    };
    fetchUpVote();
  }, [sendRequset, id, upVoted, token, isChanged]);

  useEffect(() => {
    const fetchUpVote = async () => {
      if (downVoted !== undefined && isChanged === true) {
        try {
          await sendRequset(`${process.env.REACT_APP_BACKEND_URL}/reviews/${id}/downvote/${downVoted}`, "PATCH", null, {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          });
        } catch (err) {}
      }
    };
    fetchUpVote();
  }, [sendRequset, id, downVoted, token, isChanged]);

  const confirmLoginHandler = () => {
    setNotLogedinModal(false);
    history.push("/auth");
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={notLogedinModal}
        onCancel={confirmLoginHandler}
        header=""
        footer={
          <>
            <Button onClick={confirmLoginHandler}>確定</Button>
          </>
        }
      >
        請先登入
      </Modal>
      <div className={classes.optionLayout}>
        <div className={classes.votes}>
          <div className={`${classes.upVote} ${upVoted === true ? classes["upVoteSvg-voted"] : ""}`}>
            <UpVote onClick={upVotedHandler} />
            <h2>{ups}</h2>
          </div>
          <div className={`${classes.downVote} ${downVoted === true ? classes["downVoteSvg-voted"] : ""}`}>
            <DownVote onClick={downVotedHandler} />
            <h2>{downs}</h2>
          </div>
        </div>
        <div className={classes.createAt}>
          <p>{props.createAt}</p>
        </div>
      </div>
    </>
  );
};

export default CommentOption;
