/* eslint-disable */

import { useState} from "react";
import "./App.css";

function App() {
  const [equation, setEquation] = useState({ expression: "", result: "" });
  const [preview, setPreview] = useState({
    previousPreviewType: "",
    currentPreviewContent: 0,
  });

  return (
    <div className="app">
      <div className="calculater">
        <Equation equation={equation} />
        <Preview preview={preview} />
        <Input
          setEquation={setEquation}
          equation={equation}
          setPreview={setPreview}
          preview={preview}
        />
      </div>
    </div>
  );
}

function Input({ setEquation, equation, setPreview, preview }) {
  const buttons = [
    { name: "clear", type: "clear", content: "AC" },
    { name: "division", type: "operation", content: "/" },
    { name: "multiplication", type: "operation", content: "⋅" },
    { name: "seven", type: "number", content: "7" },
    { name: "eight", type: "number", content: "8" },
    { name: "nine", type: "number", content: "9" },
    { name: "minus", type: "operation", content: "-" },
    { name: "four", type: "number", content: "4" },
    { name: "five", type: "number", content: "5" },
    { name: "six", type: "number", content: "6" },
    { name: "plus", type: "operation", content: "+" },
    { name: "one", type: "number", content: "1" },
    { name: "two", type: "number", content: "2" },
    { name: "three", type: "number", content: "3" },
    { name: "equal", type: "equal", content: "=" },
    { name: "zero", type: "zero", content: "0" },
    { name: "dot", type: "dot", content: "." },
  ];

  return (
    <div className="input">
      {buttons.map(({ name, type, content }) => {
        switch (type) {
          case "clear":
            return <ClearButton key={name} setEquation={setEquation} setPreview={setPreview} />;
          case "operation":
            return (
              <OperationButton
                key={name}
                name={name}
                content={content}
                setEquation={setEquation}
                equation={equation}
                setPreview={setPreview}
                preview={preview}
                type = {type}
              />
            );
          case "equal":
            return (
              <EqualButton
                key={name}
                setEquation={setEquation}
                equation={equation}
                setPreview={setPreview}
                preview = {preview}
                type = {type}
                content = {content}
              />
            );
          case "dot":
            return (
              <DotButton
                key={name}
                setEquation={setEquation}
                equation={equation}
                setPreview={setPreview}
                preview = {preview}
                type = {type}
                name = {name}
                content = {content}
              />
            );
          default:
            return (
              <NumberButton
                key={name}
                content={content}
                setEquation={setEquation}
                equation={equation}
                setPreview={setPreview}
                preview= {preview}
                name ={name}
                type = {type}
              />
            );
        }
      })}
    </div>
  );
}





function ClearButton({setEquation, setPreview}){

  const handleClick = () => {
    setEquation({ expression: "", result: "" });
    setPreview({ previousPreviewType: "", currentPreviewContent: 0 });
    
  }

  return (
    <div id="clear" className="clear" onClick={handleClick}>
      AC
    </div>
  )  

}

function OperationButton({ name, content, type, setEquation, equation, preview,  setPreview }) {


  
  let previewContent = name === "multiplication" ? "x" : content;
  let {expression, result} = equation;
  let {previousPreviewType, currentPreviewContent} = preview
  const equalRegex = /(.+)?=(.+)/;
  const equalityStatementExists = equalRegex.test(expression);
 
  
  const handleClick = () => {
     
    

    if (equalityStatementExists) {
      expression = result + content;
      result = "";
      previousPreviewType = type;
      currentPreviewContent = previewContent;
      setPreview({ previousPreviewType, currentPreviewContent });
      setEquation({ expression, result });
    } else {
      expression += content;
      currentPreviewContent = "";
      currentPreviewContent += previewContent;
      previousPreviewType = type;
      // // .....> /
      const regex1 = new RegExp(`\\${content}+`, "g");
      // -[⋅+/-] ...> -
      const regex6 = new RegExp(`(?<![⋅\\+\\-/])-\\${content}`, "g");
      // /+ ....> + (/- or ⋅- or -[/-⋅+] are not taken) 99./ ....> 99/
      const regex2 = new RegExp(
        `(?![/⋅]-|-[⋅\\+\\-/])[⋅\\+/\\.]\\${content}`,
        "g"
      );
      //  /-⋅ ...> ⋅ but [/.] not at the beginning. This regex
      //handles situations when you need to add an operator after
      // /- or ⋅-
      const regex5 = new RegExp(`(?!^[/⋅].*)[/⋅]-(?!-)\\${content}`, "g");

      expression = expression.replace(regex1, `${content}`);
      expression = expression.replace(regex6, `${content}`);
      expression = expression.replace(regex2, `${content}`);
      expression = expression.replace(regex5, `${content}`);
      setPreview({ previousPreviewType, currentPreviewContent });
      setEquation({ ...equation, expression });
    }


  }
  return (
    <div id={name} className="operation" onClick={handleClick}>
      {name === "multiplication" ? "×" : content}
    </div>
  );
}



function EqualButton({ setEquation, equation, setPreview,type, preview, content }) {
  
  let {expression, result} = equation;
  let {previousPreviewType, currentPreviewContent} = preview
  const equalRegex = /(.+)?=(.+)/;
  const minusRegex = /-/g;
  const multiplicationRegex = /⋅/g;
  const equalityStatementExists = equalRegex.test(expression);
  let equationToEvaluate;
  
  
  const handleClick = () => {

    
      // Stop giving results when the expression starts
      // with  / or ⋅
      const equalRegex1 = /^[/⋅].+/;
      // Clear operations and dots when they are at the end
      // and preceeded by a character
      const equalRegex2 = /(?<=.+)[\.\+\/⋅\*\-]$/;
      // Check if the expression starts with a + sign
      const equalRegex3 = /^(\+)/;
      // Check if the expression ends with this format: [/⋅]-
      // and is preceeded by a number NAN or infinity
      const equalRegex4 = /(\d+(?:\.\d+)?|NAN|INFINITY)[\/⋅\*]-$/;

      const expressionStartsWithDivisionOrMultiplication =
        equalRegex1.test(expression);
      const expressionEndsWithANOperation = equalRegex2.test(expression);
      const expressionStartsWithAPositiveSign = equalRegex3.test(expression);
      equationToEvaluate = expression.replace(multiplicationRegex, "*");
      equationToEvaluate = equationToEvaluate.replace(minusRegex, "-");
      equationToEvaluate = equationToEvaluate.replace("INFINITY", "Infinity");
      equationToEvaluate = equationToEvaluate.replace("NAN", "NaN");

      if (
        expression === "⋅" ||
        expression === "/" ||
        expression === "+" ||
        expression === "-" ||
        expression === ""
      ) {
        expression += content + "NAN";
        result = "NAN";
        currentPreviewContent = result;
        previousPreviewType = type;
        equationToEvaluate = expression.replace("NAN", "NaN");
        setPreview({ previousPreviewType, currentPreviewContent });
        setEquation({ expression, result });
      } else if (equalityStatementExists) {
        setEquation({ ...equation, expression });
      } else if (expressionStartsWithDivisionOrMultiplication) {
        setEquation({ ...equation, expression });
      } else if (equalRegex4.test(expression)) {
        expression = expression.replace(equalRegex4, "$1");
        equationToEvaluate = equationToEvaluate.replace(equalRegex4, "$1");
        result = Number(eval(equationToEvaluate).toFixed(9)).toString();
        expression += content + result;
        currentPreviewContent = result;
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
        setEquation({ expression, result });
      } else if (expressionEndsWithANOperation) {
        if (expressionStartsWithAPositiveSign) {
          expression = expression.replace(equalRegex3, "");
        }

        expression = expression.replace(equalRegex2, "");
        equationToEvaluate = equationToEvaluate.replace(equalRegex2, "");
        result = Number(eval(equationToEvaluate).toFixed(9)).toString();
        expression += content + result;
        currentPreviewContent = result;
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
        setEquation({ expression, result });
      } else {
        if (expressionStartsWithAPositiveSign) {
          expression = expression.replace(equalRegex3, "");
        }
        result = Number(eval(equationToEvaluate).toFixed(9)).toString();
        expression += content + result;
        currentPreviewContent = result;
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
        setEquation({ expression, result });
      }
    


  }
  return (
    <div id="equal" className="equal" onClick={handleClick}>
      =
    </div>
  );
}



function DotButton({ setEquation, equation, setPreview,name, type, preview, content }) {

  let previewContent = name === "multiplication" ? "x" : content;
  let {expression, result} = equation;
  let {previousPreviewType, currentPreviewContent} = preview
  const equalRegex = /(.+)?=(.+)/;
  const equalityStatementExists = equalRegex.test(expression);
  

  const handleClick = () => {

    if (equalityStatementExists) {
      expression = 0 + content;
      result = "";
      currentPreviewContent = expression;
      previousPreviewType = type;
      setPreview({ previousPreviewType, currentPreviewContent });
      setEquation({ expression, result });
    } else {
      expression += content;
      const dotRegex1 = new RegExp(`\\${content}+`, "g");
      const dotRegex2 = new RegExp(`^\\${content}|(?<=[+⋅/-])\\.`, "g");
      const dotRegex3 = new RegExp(`(?<=\\d+\\.\\d+)\\.`);
      expression = expression.replace(dotRegex1, `${content}`);
      expression = expression.replace(dotRegex2, `0${content}`);
      expression = expression.replace(dotRegex3, "");
      if (
        previousPreviewType === "number" ||
        previousPreviewType === "zero"
      ) {
        currentPreviewContent += previewContent;
        currentPreviewContent = currentPreviewContent.replace(dotRegex3, "");
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
      }

      if (previousPreviewType === "operation" || previousPreviewType === "") {
        currentPreviewContent = 0 + previewContent;
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
      }
      
      setEquation({ ...equation, expression });
    }

  }
  return (
    <div id="dot" className="dot" onClick={handleClick}>
      .
    </div>
  );
}



function NumberButton({ content, setEquation, equation,name ,preview, setPreview, type }) {
  
  let previewContent = name === "multiplication" ? "x" : content;
  let {expression, result} = equation;
  let {previousPreviewType, currentPreviewContent} = preview
  const equalRegex = /(.+)?=(.+)/;
  const equalityStatementExists = equalRegex.test(expression);
 


  const handleClick = () => {

    if (equalityStatementExists) {
      expression = content;
      result = "";
      currentPreviewContent = previewContent;
      previousPreviewType = type;
      setPreview({ previousPreviewType, currentPreviewContent });
      setEquation({ expression, result });
    } else {
      // search for left zeros
      const zeroRegex = /(?<!\d\.?)0(?=\d)/g;
      expression += content;
      if (previousPreviewType === "operation") {
        currentPreviewContent = previewContent;
        previousPreviewType = type;
        setPreview({ previousPreviewType, currentPreviewContent });
      } else {
        currentPreviewContent += previewContent;
        previousPreviewType = type;
        currentPreviewContent = currentPreviewContent.replace(zeroRegex, "");
        setPreview({ previousPreviewType, currentPreviewContent });
      }
      expression = expression.replace(zeroRegex, "");

      setEquation({ ...equation, expression });
    }


  }
  return (
    <div id = {name} className={`${name === "zero" ? "zero" : "number"}`} onClick={handleClick}>
      {content}
    </div>
  );
}


function Equation({ equation }) {
  return (
    <div id="result" className="result ds-digital">
      {equation.expression}
    </div>
  );
}

function Preview({ preview }) {
  return (
    <div id="preview" className="preview ds-digital">
      {preview.currentPreviewContent}
    </div>
  );
}

export default App;
