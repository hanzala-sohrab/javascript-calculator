import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const operators = ["+", "-", "*", "/"];

  const onClear = event => {
    event.preventDefault();
    setDisplay("0");
    setExpression("");
  }

  const onButtonClick = value => {

  }

  return (
    <div className="App">
      <div className="container">
        <div id="expression">{expression}</div>
        <div id="display">{display}</div>
        <button className="clr" id="clear" onClick={onClear}>AC</button>
        <button className="int" id="zero" onClick={() => onButtonClick(0)}>0</button>
        <button className="int" id="one" onClick={() => onButtonClick(1)}>1</button>
        <button className="int" id="two" onClick={() => onButtonClick(2)}>2</button>
        <button className="int" id="three" onClick={() => onButtonClick(3)}>3</button>
        <button className="int" id="four" onClick={() => onButtonClick(4)}>4</button>
        <button className="int" id="five" onClick={() => onButtonClick(5)}>5</button>
        <button className="int" id="six" onClick={() => onButtonClick(6)}>6</button>
        <button className="int" id="seven" onClick={() => onButtonClick(7)}>7</button>
        <button className="int" id="eight" onClick={() => onButtonClick(8)}>8</button>
        <button className="int" id="nine" onClick={() => onButtonClick(9)}>9</button>
        <button className="add" id="add" onClick={() => onButtonClick('+')}>+</button>
        <button className="sub" id="subtract" onClick={() => onButtonClick('-')}>-</button>
        <button className="mul" id="multiply" onClick={() => onButtonClick('*')}>x</button>
        <button className="div" id="divide" onClick={() => onButtonClick('/')}>/</button>
        <button className="dec" id="decimal" onClick={() => onButtonClick('.')}>.</button>
        <button className="eql" id="equals">=</button>
      </div>
    </div>
  );
}

export default App;
