import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [isNew, setIsNew] = useState(true);
  const [canAddDot, setCanAddDot] = useState(true);
  const [canAddOperator, setCanAddOperator] = useState(true);
  const [expression, setExpression] = useState("");

  const operators = ["+", "-", "*", "/"];

  const onClear = event => {
    event.preventDefault();
    setDisplay("0");
    setExpression("");
    setIsNew(true);
    setCanAddDot(true);
    setCanAddOperator(true);
  }

  const evaluate = (expr) => {
    if (expr.endsWith("+") || expr.endsWith("-") || expr.endsWith("*") || expr.endsWith("/")) {
      expr = expr.slice(0, -1);
    }
    expr += ';';
    const numStack = [];
    const opStack = [];
    let num = "";
    for (let i = 0; i < expr.length; i++) {
      if (!isNaN(expr[i]) || expr[i] === ".") {
        num = num + '' + expr[i];
      } else if (expr[i] !== ";") {
        numStack.push(parseFloat(num));
        num = "";
        const thisOp = expr[i];
        while (opStack.length > 0) {
          const lastOp = opStack[opStack.length - 1];
          if (thisOp === "-") {
            opStack.pop();
            if (lastOp === "+") {
              numStack.push(numStack.pop() + numStack.pop());
            } else if (lastOp === "-") {
              numStack.push(-numStack.pop() + numStack.pop());
            } else if (lastOp === "*") {
              numStack.push(numStack.pop() * numStack.pop());
            } else if (lastOp === "/") {
              numStack.push((1 / numStack.pop()) * numStack.pop());
            }
          } else if (thisOp === "+") {
            opStack.pop();
            if (lastOp === "+") {
              numStack.push(numStack.pop() + numStack.pop());
            } else if (lastOp === "-") {
              numStack.push(-numStack.pop() + numStack.pop());
            } else if (lastOp === "*") {
              numStack.push(numStack.pop() * numStack.pop());
            } else if (lastOp === "/") {
              numStack.push((1 / numStack.pop()) * numStack.pop());
            }
          } else if (thisOp === "*") {
            if (lastOp === "/") {
              opStack.pop();
              numStack.push((1 / numStack.pop()) * numStack.pop());
            } else if (lastOp === '*') {
              opStack.pop();
              numStack.push(numStack.pop() * numStack.pop());
            } else {
              break;
            }
            
          } else if (thisOp === "/") {
            if (lastOp === "/") {
              opStack.pop();
              numStack.push((1 / numStack.pop()) * numStack.pop());
            } else if (lastOp === '*') {
              opStack.pop();
              numStack.push(numStack.pop() * numStack.pop());
            } else {
              break;
            }
            
          }
        }
        if (operators.includes(thisOp) && expr[i + 1] === "-") {
          num = '-';
          ++i;
        }
        opStack.push(thisOp);
      } else {
        numStack.push(parseFloat(num));
      }
    }

    while (opStack.length > 0) {
      const op = opStack.pop();
      if (op === "+") {
        numStack.push(numStack.pop() + numStack.pop());
      } else if (op === "-") {
        numStack.push(-numStack.pop() + numStack.pop());
      } else if (op === "*") {
        numStack.push(numStack.pop() * numStack.pop());
      } else if (op === "/") {
        numStack.push((1 / numStack.pop()) * numStack.pop());
      }
    }

    return numStack.pop();
  }

  const onButtonClick = value => {
    if (!isNaN(value)) {
      setExpression(prevExpression => {
        if (isNew) {
          if (value !== 0) {
            setIsNew(false);
            const lastChar = prevExpression[prevExpression.length - 1];
            if (lastChar !== '0') {
              prevExpression = prevExpression + '' + value;
            } else {
              prevExpression = value;
            }
          } else {
            prevExpression = '0';
          }
        } else {
          prevExpression = prevExpression + '' + value;
        }
        return prevExpression;
      });
      // setCanAddDot(true);
      setCanAddOperator(true);
      setDisplay(prevDisplay => {
        const firstChar = prevDisplay[0];
        if (firstChar !== '0' && !operators.includes(firstChar)) {
          prevDisplay = prevDisplay + '' + value;
        } else {
          prevDisplay = value;
        }
        return prevDisplay;
      });
    } else if (value === '.' && canAddDot) {
      setCanAddDot(false);
      setCanAddOperator(true);
      setExpression(prevExpression => {
        if (isNew) {
          prevExpression = '0';
          setIsNew(false);
        }
        const lastChar = prevExpression[prevExpression.length - 1];
        if (operators.includes(lastChar)) {
          prevExpression = prevExpression + '0';
        }
        prevExpression = prevExpression + '.';
        return prevExpression;
      });
      setDisplay(prevDisplay => prevDisplay + '' + value);
    } else if (operators.includes(value)) {
      setCanAddOperator(false);
      setCanAddDot(true);
      setExpression(prevExpression => {
        if (isNew) {
          prevExpression = prevExpression + '0';
        }
        const lastChar = prevExpression[prevExpression.length - 1];
        if (lastChar === '.') {
          prevExpression = prevExpression + '0';
        } else if (value === '-' || !operators.includes(lastChar)) {
          prevExpression = prevExpression + value;
        }
        if (lastChar === '-') {
          prevExpression = prevExpression.slice(0, -2) + value;
        }
        return prevExpression;
      });
      setDisplay(value);
    } else if (value === '=') {
      value = evaluate(expression);
      setDisplay(prevDisplay => {
        setExpression(value);
        return value;
      });

    }
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
        <button className="eql" id="equals" onClick={() => onButtonClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
