import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
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

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || props.defaultValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const selectHandler = event => {
    dispatch({
      type: "SELECT",
      val: event,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const renderElement = () => {
    if (props.element === "input") {
      return (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className={classes[props.styles]}
        />
      );
    }

    if (props.element === "textarea") {
      return (
        <textarea
          id={props.id}
          rows={props.rows || 5}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className={`${props.className}`}
        />
      );
    }

    return (
      <Select
        id={props.id}
        options={props.options}
        onChange={selectHandler}
        onBlur={touchHandler}
        placeholder={props.placeholder}
        styles={props.styles}
        defaultValue={props.defaultValue}
      />
    );
  };

  const element = renderElement();

  return (
    <>
      {props.onlyElement && (
        <>
          {element}
          {!inputState.isValid && inputState.isTouched && (
            <p className={classes.errorText}>{props.errorText}</p>
          )}
        </>
      )}
      {!props.onlyElement && (
        <div
          className={`${classes["form-control"]} ${!inputState.isValid && inputState.isTouched && classes["form-control--invalid"]} ${
            classes[props.LabelStyle]
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

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  initialValue: PropTypes.string,
  initialValid: PropTypes.bool,
  onlyElement: PropTypes.bool,
  errorText: PropTypes.string,
  styles: PropTypes.object,
  className: PropTypes.string,
  rows: PropTypes.number,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  LabelStyle: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
