import './App.css'
import {useState} from "react";
import PropTypes from "prop-types";


function InputField({onChange}) {
    return (
        <div><input onChange={onChange}/></div>
    );
}
InputField.propTypes = {
    onChange: PropTypes.func.isRequired,
}

function Button({operationName, onClick}) {
    return (
        <>
            <button onClick={onClick}>{operationName}</button>
        </>
    );
}
Button.propTypes = {
    operationName: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

function ResultField({input1, input2, operator}) {
    if (input1 === "" || input2 === "") {
        return (
            <div>
                <h3></h3>
            </div>
        );
    }
    let value;

    switch (operator) {
        case "+": {
            value = Number(input1) + Number(input2);
            break;
        }
        case "-": {
            value = Number(input1) - Number(input2);
            break;
        }
        case "*": {
            value = Number(input1) * Number(input2);
            break;
        }
        case "/": {
            value = Number(input1) / Number(input2);
            break;
        }
        case "": {
            value = input1 + input2 + ", obviously";
            break;
        }
        default: {
            throw new Error("Invalid operator");
        }
    }
    return (
        <div>
            <h3>{input1}{operator}{input2}={value}</h3>
        </div>
    );

}

ResultField.propTypes = {
    input1: PropTypes.string,
    input2: PropTypes.string,
    operator: PropTypes.string,
}

function CalculatorApp() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [operator, setOperator] = useState("");

    function handleInput1Change(e) {
        setInput1(e.target.value);
    }

    function handleInput2Change(e) {
        setInput2(e.target.value);
    }

    function handleOperatorChange(op) {
        setOperator(op);
    }

    return (
        <div>
            <InputField onChange={handleInput1Change}/>
            <InputField onChange={handleInput2Change}/>
            <Button operationName="Addition" onClick={() => handleOperatorChange("+")}/>
            <Button operationName="Subtraction" onClick={() => handleOperatorChange("-")}/>
            <Button operationName="Multiplication" onClick={() => handleOperatorChange("*")}/>
            <Button operationName="Division" onClick={() => handleOperatorChange("/")}/>
            <ResultField input1={input1} input2={input2} operator={operator}/>
        </div>
    );
}

export default function App() {
    return (
        <>
            <h1>Calculator</h1>
            <CalculatorApp/>
        </>
    );
}