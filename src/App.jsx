
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {

  const [equation, setEquation] = useState("")

  return(
      <div className="app">
       <div className="calculater">
        <Equation equation = {equation} />
        <Input setEquation = {setEquation} equation = {equation} />        

       </div>

      </div>

  )
  

}


function Input({setEquation, equation}){

return (
  <div className="input">
          
          <InputCell name="clear" type="clear" content="AC" setEquation = {setEquation} equation ={equation} />
          <InputCell name="division" type="operation" content="/" setEquation = {setEquation} equation ={equation} />
          <InputCell name="multiplication" type="operation" content="×" setEquation = {setEquation} equation ={equation} />
          <InputCell name="seven" type="number" content="7" setEquation = {setEquation} equation ={equation} />
          <InputCell name="eight" type="number" content="8" setEquation = {setEquation} equation ={equation} />
          <InputCell name="nine" type="number" content="9" setEquation = {setEquation} equation ={equation} />
          <InputCell name="minus" type="operation" content="-" setEquation = {setEquation} equation ={equation} />
          <InputCell name="four" type="number" content="4" setEquation = {setEquation} equation ={equation} />
          <InputCell name="five" type="number" content="5" setEquation = {setEquation} equation ={equation} />
          <InputCell name="six" type="number" content="6" setEquation = {setEquation} equation ={equation} />
          <InputCell name="plus" type="operation" content="+" setEquation = {setEquation} equation ={equation} />
          <InputCell name="one" type="number" content="1" setEquation = {setEquation} equation ={equation} />
          <InputCell name="two" type="number" content="2" setEquation = {setEquation} equation ={equation} />
          <InputCell name="three" type="number" content="3" setEquation = {setEquation} equation ={equation} />
          <InputCell name="equal" type="equal" content="=" setEquation = {setEquation} equation ={equation} />
          <InputCell name="zero" type="zero" content="0" setEquation = {setEquation} equation ={equation} />
          <InputCell name="dot" type="dot" content="." setEquation = {setEquation} equation ={equation} />
          

        </div>
)


}


function InputCell({name, type, content, setEquation, equation}){

  const handleClick = () => {
      if (content === "AC"){
        setEquation("")
      }
      else if (type === "operation"){
      equation += content
      // const regex1 = /\/+/g;
      // const regex2 = new RegExp(`[×+-\\/]${content}`, "g");
      // const regex3 = new RegExp(`^\\d+\\.\\${content}`);
      // const regex4 = new RegExp(`[×+-\\${content}]\\d+\\.\\/`, "g");
      // const regex2 = /[×+-]\//g;
      // const regex3 = /^\d+\.\//;
      // const regex4 = /[×+-\/]\d+\.\//g;
      const regex1 = new RegExp(`\\${content}+`, "g")
      const regex2 = new RegExp(`(?![/×]-)[×\\+\\-/]\\${content}`, "g");
      const regex3 = new RegExp(`^\\d+\\.\\${content}`);
      const regex4 = new RegExp(`[×\\+\\-/]\\d+\\.\\${content}`, "g");
      equation = equation.replace(regex1,`${content}`);
      equation = equation.replace(regex2,`${content}`);
      equation = equation.replace(regex3,`0${content}`);
      equation = equation.replace(regex4,`${content}`);

      setEquation(equation)
      }

      else if(type === "dot") {
        equation += content;
        const dotRegex1 = new RegExp(`\\${content}+`, "g")
        //const dotRegex2 = new RegExp(`^\\${content} | (?<=[\\+×/-])\\${content}`, "g")
        const dotRegex2 = new RegExp(`^\\${content}|(?<=[+×/-])\\.` ,"g")
        const dotRegex3 = new RegExp(`(?<=\\d+\\.\\d+)\\.`);
        equation = equation.replace(dotRegex1,`${content}`);
        equation = equation.replace(dotRegex2,`0${content}`);
        equation = equation.replace(dotRegex3,"");
        setEquation(equation)

      }

      else{
        equation += content;
        setEquation(equation)

      }
  }

  return(

  <div id={name} className={type} onClick={handleClick}>{content}</div>

  )

  

}

function Equation({equation}){

  return(
    <div id="result" className="result">{equation}</div>
  )
}


export default App