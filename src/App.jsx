
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {

  const [equation, setEquation] = useState({expression:"",result:""})

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
          <InputCell name="minus" type="operation" content="−" setEquation = {setEquation} equation ={equation} />
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
  let expression= equation.expression
  let result = equation.result
  const equalRegex = /(.+)?=(.+)/;
  const minusRegex = /−/g;
  const multiplicationRegex = /⋅/g;

  const handleClick = () => {
      if (content === "AC"){
        expression=""
        setEquation({...equation, expression})
      }
      else if (type === "operation"){
         if (equalRegex.test(expression)){
          expression = result + content;
          result = ""
          setEquation({ expression, result});

        }
        else{
      expression += content
      
      const regex1 = new RegExp(`\\${content}+`, "g")
      const regex2 = new RegExp(`(?![/⋅]−)[⋅\\+\\−/]\\${content}`, "g");
      const regex3 = new RegExp(`^\\d+\\.\\${content}`);
      const regex4 = new RegExp(`[⋅\\+\\−/]\\d+\\.\\${content}`, "g");
      //const regex5 = /×/;
      expression = expression.replace(regex1,`${content}`);
      expression = expression.replace(regex2,`${content}`);
      expression = expression.replace(regex3,`0${content}`);
      expression = expression.replace(regex4,`${content}`);
      //equation = equation.replace(regex5,"⋅");

      setEquation({...equation, expression})
        }
      }

      else if(type === "dot") {
        if (equalRegex.test(expression)){
          expression = 0 + content;
          result = ""
          setEquation({ expression, result});
        }
        else{
        expression += content;
        const dotRegex1 = new RegExp(`\\${content}+`, "g")
        const dotRegex2 = new RegExp(`^\\${content}|(?<=[+⋅/−])\\.` ,"g")
        const dotRegex3 = new RegExp(`(?<=\\d+\\.\\d+)\\.`);
        expression = expression.replace(dotRegex1,`${content}`);
        expression = expression.replace(dotRegex2,`0${content}`);
        expression = expression.replace(dotRegex3,"");
        setEquation({...equation, expression})
        }

      }
      else if(type === "equal"){
      
        //const equalRegex = /⋅/g;
        const equalRegex1 = /^[/⋅].+/;
        const equalRegex2 = /(?<=.+)[\.\+\/⋅\*\−]$/;
        const equalRegex3 = /^(\+)/;
        
        //equation = equation.replace(equalRegex,"");
        debugger;
        equationToEvaluate = expression.replace(multiplicationRegex,"*")
        equationToEvaluate = equationToEvaluate.replace(minusRegex,"-")

        if (expression === "⋅" || expression === "/" || expression === "+"  || expression === "−"){
          expression = content + "NAN" 
          setEquation({...equation, expression})
        }

        else if (equalRegex.test(expression)){
          setEquation({...equation, expression});

        }
        else if(equalRegex1.test(expression)){
          if(equalRegex3.test(expression)){
            expression = expression.replace(equalRegex3, "")
          }
          setEquation({...equation, expression})

        }
        else if (equalRegex2.test(expression)){
          if(equalRegex3.test(expression)){
            expression = expression.replace(equalRegex3, "")
          }

          expression = expression.replace(equalRegex2,"");
          equationToEvaluate = equationToEvaluate.replace(equalRegex2,"");
          result = eval(equationToEvaluate).toString()
          result = result.replace("-","−")
          expression += content + result
          setEquation({expression, result})

      }

      else{
        debugger;
        if(equalRegex3.test(expression)){
          expression = expression.replace(equalRegex3, "")
        }
        result = eval(equationToEvaluate).toString()
        result = result.replace("-","−")
        expression += content + result
        setEquation({expression, result})


      }

      }

      else{
        
        if (equalRegex.test(expression)){
          expression = content;
          result = ""
          setEquation({ expression, result});
        }
          else{
            
            const zeroRegex = /(?<!\d\.?)0(?=\d)/g;
            expression += content;
            expression = expression.replace(zeroRegex, "")
            setEquation({...equation, expression})
            }


        
        
          }

      }
  

  return(

  <div id={name} className={type} onClick={handleClick}>{name === "multiplication" ? "×" :content}</div>

  )

  

}

function Equation({equation}){

  return(
    <div id="result" className="result">{equation.expression}</div>
  )
}


export default App