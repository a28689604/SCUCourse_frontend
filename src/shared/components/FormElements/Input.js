import React, { useReducer, useEffect } from "react";
import Select from "react-select";

import { validate } from "../../util/validators";
import classes from "./Input.module.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "SELECT":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const selectHandler = (event) => {
    dispatch({
      type: "SELECT",
      val: event.value,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`${props.className}`}
      />
    ) : props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`${props.className}`}
      />
    ) : (
      <Select
        id={props.id}
        options={props.options}
        onChange={selectHandler}
        onBlur={touchHandler}
        // value={inputState.value}
        className={`${props.className}`}
      />
    );

  return (
    <>
      {props.onlyElement && (
        <>
          {element}
          {!inputState.isValid && inputState.isTouched && (
            <p>{props.errorText}</p>
          )}
        </>
      )}
      {!props.onlyElement && (
        <div
          className={`${classes["form-control"]} ${
            !inputState.isValid &&
            inputState.isTouched &&
            classes["form-control--invalid"]
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          {element}
          {!inputState.isValid && inputState.isTouched && (
            <p>{props.errorText}</p>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
