
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
          <InputCell name="multiplication" type="operation" content="⋅" setEquation = {setEquation} equation ={equation} />
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

  let equationToEvaluate;

  const handleClick = () => {
      if (content === "AC"){
        setEquation("")
      }
      else if (type === "operation"){
      equation += content
      
      const regex1 = new RegExp(`\\${content}+`, "g")
      const regex2 = new RegExp(`(?![/⋅]-)[⋅\\+\\-/]\\${content}`, "g");
      const regex3 = new RegExp(`^\\d+\\.\\${content}`);
      const regex4 = new RegExp(`[⋅\\+\\-/]\\d+\\.\\${content}`, "g");
      //const regex5 = /×/;
      equation = equation.replace(regex1,`${content}`);
      equation = equation.replace(regex2,`${content}`);
      equation = equation.replace(regex3,`0${content}`);
      equation = equation.replace(regex4,`${content}`);
      //equation = equation.replace(regex5,"⋅");

      setEquation(equation)
      }

      else if(type === "dot") {
        equation += content;
        const dotRegex1 = new RegExp(`\\${content}+`, "g")
        const dotRegex2 = new RegExp(`^\\${content}|(?<=[+⋅/-])\\.` ,"g")
        const dotRegex3 = new RegExp(`(?<=\\d+\\.\\d+)\\.`);
        equation = equation.replace(dotRegex1,`${content}`);
        equation = equation.replace(dotRegex2,`0${content}`);
        equation = equation.replace(dotRegex3,"");
        setEquation(equation)

      }
      else if(type === "equal"){
        debugger;
        //const equalRegex = /⋅/g;
        const equalRegex1 = /^[/⋅].+/;
        const equalRegex2 = /(?<=.+)[\.\+\/⋅\*\-]$/;
        const equalRegex3 = /^(\+)/;
        //equation = equation.replace(equalRegex,"");
        equationToEvaluate = equation.replace("⋅","*")

        if (equation === "⋅" || equation === "/"){
          equation += content + "NAN"
          setEquation(equation)
        }
        else if(equalRegex1.test(equation)){
          if(equalRegex3.test(equation)){
            equation = equation.replace(equalRegex3, "")
          }
          setEquation(equation)

        }
        else if (equalRegex2.test(equation)){
          if(equalRegex3.test(equation)){
            equation = equation.replace(equalRegex3, "")
          }

          equation = equation.replace(equalRegex2,"");
          equationToEvaluate = equationToEvaluate.replace(equalRegex2,"");
          equation += content + eval(equationToEvaluate)
          setEquation(equation)

      }

      else{
        if(equalRegex3.test(equation)){
          equation = equation.replace(equalRegex3, "")
        }
        equation += content + eval(equationToEvaluate)
        setEquation(equation)


      }

      }

      else{
        equation += content;
        setEquation(equation)

      }
  }

  return(

  <div id={name} className={type} onClick={handleClick}>{name === "multiplication" ? "×" :content}</div>

  )

  

}

function Equation({equation}){

  return(
    <div id="result" className="result">{equation}</div>
  )
}


export default App