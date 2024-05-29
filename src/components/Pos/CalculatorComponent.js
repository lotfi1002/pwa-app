import React from 'react';

const CalculatorComponent = () => {

    return (
<div
className="numeric-keypad-box"
style={{
  padding: "0px",
  margin: "0px",
  display: "block",
  position: "absolute",
  bottom: "5px",
  right: "20px",
  zIndex: 999,
}}
>
<div
  className="number-box"
  style={{
    margin: "0px",
    padding: "12px 10px 10px",
    border: "1px solid transparent",
    borderRadius: "4px",
    width: "212px",
    height: "190px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
  }}
>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    1
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    2
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    3
  </button>
  <button
    className="btn num-btn num-btn-clear"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      backgroundColor: "rgb(252, 81, 133)",
      color: "white",
      borderRadius: "0px",
    }}
  >
    C
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    4
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    5
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    6
  </button>
  <button
    className="btn num-btn num-btn-back"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      paddingLeft: "0px",
      paddingRight: "0px",
      backgroundColor: "rgb(68, 206, 246)",
      color: "white",
      borderRadius: "0px",
    }}
  >
    X
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    7
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    8
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    9
  </button>
  <button
    className="btn num-btn num-btn-delete"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      paddingLeft: "0px",
      paddingRight: "0px",
      backgroundColor: "rgb(27, 209, 165)",
      color: "white",
      borderRadius: "0px",
    }}
  >
    DEL
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    .
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  >
    0
  </button>
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  />
  <button
    className="btn num-btn"
    style={{
      padding: "0px",
      margin: "0px",
      outline: "0px",
      borderColor: "transparent",
      width: "38px",
      height: "38px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "3px",
      marginRight: "3px",
      marginBottom: "4px",
      borderRadius: "0px",
    }}
  />
</div>
</div>
);

}

export default CalculatorComponent ;