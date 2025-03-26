
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {

  const [equation, setEquation] = useState(0)

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
      equation += content
      setEquation(equation)
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